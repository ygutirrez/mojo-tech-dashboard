#!/usr/bin/env python3
"""
Google Fit CLI - Quick & dirty weight data fetcher
"""

import os
import sys
import json
import argparse
from datetime import datetime, timedelta
from pathlib import Path

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# Config
CONFIG_DIR = Path.home() / ".config" / "google-fit"
TOKEN_FILE = CONFIG_DIR / "token.json"
CREDENTIALS_FILE = CONFIG_DIR / "credentials.json"

# Scopes for body data (weight)
SCOPES = [
    "https://www.googleapis.com/auth/fitness.body.read",
    "https://www.googleapis.com/auth/fitness.activity.read",
]

def ensure_config_dir():
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)

def get_credentials():
    """Get valid credentials, refreshing or re-authenticating as needed."""
    creds = None
    
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_FILE.exists():
                print(f"ERROR: No credentials file found at {CREDENTIALS_FILE}")
                print("\nTo set up:")
                print("1. Go to https://console.cloud.google.com/apis/credentials")
                print("2. Create OAuth 2.0 Client ID (Desktop app)")
                print("3. Download JSON and save to:", CREDENTIALS_FILE)
                print("4. Make sure Fitness API is enabled in your project")
                sys.exit(1)
            
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CREDENTIALS_FILE), SCOPES
            )
            creds = flow.run_local_server(port=8085)
        
        # Save credentials
        ensure_config_dir()
        with open(TOKEN_FILE, "w") as f:
            f.write(creds.to_json())
    
    return creds

def get_fitness_service():
    """Build and return the Fitness API service."""
    creds = get_credentials()
    return build("fitness", "v1", credentials=creds)

def list_data_sources(service):
    """List all data sources."""
    result = service.users().dataSources().list(userId="me").execute()
    sources = result.get("dataSource", [])
    
    if not sources:
        print("No data sources found.")
        return
    
    print(f"Found {len(sources)} data sources:\n")
    for src in sources:
        stream_id = src.get("dataStreamId", "unknown")
        data_type = src.get("dataType", {}).get("name", "unknown")
        device = src.get("device", {})
        device_name = device.get("manufacturer", "") + " " + device.get("model", "")
        app = src.get("application", {}).get("name", "")
        
        print(f"  Type: {data_type}")
        print(f"  Stream ID: {stream_id}")
        if device_name.strip():
            print(f"  Device: {device_name.strip()}")
        if app:
            print(f"  App: {app}")
        print()

def get_weight_data(service, days=30, output_json=False):
    """Fetch weight data for the last N days."""
    end_time = datetime.now()
    start_time = end_time - timedelta(days=days)
    
    # Convert to nanoseconds
    start_ns = int(start_time.timestamp() * 1e9)
    end_ns = int(end_time.timestamp() * 1e9)
    
    body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.weight",
        }],
        "bucketByTime": {"durationMillis": 86400000},  # 1 day buckets
        "startTimeMillis": int(start_time.timestamp() * 1000),
        "endTimeMillis": int(end_time.timestamp() * 1000),
    }
    
    result = service.users().dataset().aggregate(userId="me", body=body).execute()
    
    weights = []
    for bucket in result.get("bucket", []):
        for dataset in bucket.get("dataset", []):
            for point in dataset.get("point", []):
                for value in point.get("value", []):
                    if "fpVal" in value:
                        # Convert kg to lbs
                        kg = value["fpVal"]
                        lbs = kg * 2.20462
                        
                        # Get timestamp
                        ts_ns = int(point.get("startTimeNanos", 0))
                        ts = datetime.fromtimestamp(ts_ns / 1e9)
                        
                        weights.append({
                            "date": ts.strftime("%Y-%m-%d"),
                            "time": ts.strftime("%H:%M"),
                            "kg": round(kg, 2),
                            "lbs": round(lbs, 1),
                        })
    
    if output_json:
        print(json.dumps(weights, indent=2))
    else:
        if not weights:
            print(f"No weight data found in the last {days} days.")
            return
        
        print(f"Weight data (last {days} days):\n")
        print(f"{'Date':<12} {'Time':<8} {'Weight (lbs)':<12} {'Weight (kg)':<12}")
        print("-" * 44)
        for w in sorted(weights, key=lambda x: x["date"]):
            print(f"{w['date']:<12} {w['time']:<8} {w['lbs']:<12} {w['kg']:<12}")
        
        if len(weights) >= 2:
            first = weights[0]["lbs"]
            last = weights[-1]["lbs"]
            diff = last - first
            print(f"\nChange: {diff:+.1f} lbs ({first:.1f} → {last:.1f})")

def get_body_fat(service, days=30, output_json=False):
    """Fetch body fat percentage data."""
    end_time = datetime.now()
    start_time = end_time - timedelta(days=days)
    
    body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.body.fat.percentage",
        }],
        "bucketByTime": {"durationMillis": 86400000},
        "startTimeMillis": int(start_time.timestamp() * 1000),
        "endTimeMillis": int(end_time.timestamp() * 1000),
    }
    
    result = service.users().dataset().aggregate(userId="me", body=body).execute()
    
    data = []
    for bucket in result.get("bucket", []):
        for dataset in bucket.get("dataset", []):
            for point in dataset.get("point", []):
                for value in point.get("value", []):
                    if "fpVal" in value:
                        pct = value["fpVal"]
                        ts_ns = int(point.get("startTimeNanos", 0))
                        ts = datetime.fromtimestamp(ts_ns / 1e9)
                        
                        data.append({
                            "date": ts.strftime("%Y-%m-%d"),
                            "time": ts.strftime("%H:%M"),
                            "body_fat_pct": round(pct, 1),
                        })
    
    if output_json:
        print(json.dumps(data, indent=2))
    else:
        if not data:
            print(f"No body fat data found in the last {days} days.")
            return
        
        print(f"Body fat data (last {days} days):\n")
        for d in sorted(data, key=lambda x: x["date"]):
            print(f"{d['date']} {d['time']}  {d['body_fat_pct']}%")

def main():
    parser = argparse.ArgumentParser(description="Google Fit CLI")
    parser.add_argument("command", choices=["auth", "sources", "weight", "bodyfat", "all"],
                        help="Command to run")
    parser.add_argument("--days", type=int, default=30, help="Number of days to fetch")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    
    args = parser.parse_args()
    
    if args.command == "auth":
        ensure_config_dir()
        print(f"Config directory: {CONFIG_DIR}")
        print(f"Credentials file: {CREDENTIALS_FILE}")
        print(f"Token file: {TOKEN_FILE}")
        
        if CREDENTIALS_FILE.exists():
            print("\n✓ Credentials file found")
            # Try to auth
            creds = get_credentials()
            print("✓ Successfully authenticated!")
        else:
            print(f"\n✗ Credentials file not found")
            print("\nTo set up:")
            print("1. Go to https://console.cloud.google.com/apis/credentials")
            print("2. Create OAuth 2.0 Client ID (Desktop app)")
            print("3. Download JSON and save to:", CREDENTIALS_FILE)
            print("4. Make sure Fitness API is enabled in your project")
        return
    
    service = get_fitness_service()
    
    if args.command == "sources":
        list_data_sources(service)
    elif args.command == "weight":
        get_weight_data(service, args.days, args.json)
    elif args.command == "bodyfat":
        get_body_fat(service, args.days, args.json)
    elif args.command == "all":
        get_weight_data(service, args.days, args.json)
        print("\n" + "="*50 + "\n")
        get_body_fat(service, args.days, args.json)

if __name__ == "__main__":
    main()
