#!/usr/bin/env python3
"""
Update life dashboard with fresh Google Fit data
"""

import json
import re
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

DASHBOARD_PATH = Path.home() / "clawd/projects/life-dashboard/index.html"
GFIT_CMD = Path.home() / "clawd/tools/google-fit/gfit"

def get_fitness_data():
    """Fetch latest weight and body fat data"""
    try:
        # Get weight data
        result = subprocess.run(
            [str(GFIT_CMD), "weight", "--days", "60", "--json"],
            capture_output=True, text=True
        )
        weights = json.loads(result.stdout) if result.returncode == 0 else []
        
        # Get body fat data
        result = subprocess.run(
            [str(GFIT_CMD), "bodyfat", "--days", "60", "--json"],
            capture_output=True, text=True
        )
        bodyfat = json.loads(result.stdout) if result.returncode == 0 else []
        
        return weights, bodyfat
    except Exception as e:
        print(f"Error fetching data: {e}")
        return [], []

def dedupe_by_date(data, value_key):
    """Keep only the latest reading per date"""
    by_date = {}
    for item in data:
        date = item['date']
        if date not in by_date:
            by_date[date] = item
    return sorted(by_date.values(), key=lambda x: x['date'])

def update_dashboard():
    """Update the dashboard HTML with fresh data"""
    weights, bodyfat = get_fitness_data()
    
    if not weights:
        print("No weight data available")
        return False
    
    # Dedupe
    weights = dedupe_by_date(weights, 'lbs')
    bodyfat = dedupe_by_date(bodyfat, 'body_fat_pct')
    
    # Get latest values
    latest_weight = weights[-1]['lbs'] if weights else 0
    latest_date = weights[-1]['date'] if weights else "Unknown"
    latest_bf = bodyfat[-1]['body_fat_pct'] if bodyfat else 0
    
    # Calculate change (from first reading)
    weight_change = latest_weight - weights[0]['lbs'] if len(weights) > 1 else 0
    
    # Calculate lean mass
    lean_mass = latest_weight * (1 - latest_bf/100) if latest_bf else 0
    
    # Format date
    try:
        date_obj = datetime.strptime(latest_date, "%Y-%m-%d")
        formatted_date = date_obj.strftime("%b %d, %Y")
    except:
        formatted_date = latest_date
    
    # Read dashboard
    html = DASHBOARD_PATH.read_text()
    
    # Update values using regex
    html = re.sub(
        r'(<div class="stat-value" id="weight">)[^<]*(</div>)',
        f'\\g<1>{latest_weight:.1f}\\g<2>',
        html
    )
    html = re.sub(
        r'(<div class="stat-value" id="bodyfat">)[^<]*(</div>)',
        f'\\g<1>{latest_bf:.1f}%\\g<2>',
        html
    )
    
    # Weight change - set color class based on direction
    change_class = "positive" if weight_change < 0 else "negative" if weight_change > 0 else ""
    html = re.sub(
        r'(<div class="stat-value )[^"]*(" id="weight-change">)[^<]*(</div>)',
        f'\\g<1>{change_class}\\g<2>{weight_change:+.1f}\\g<3>',
        html
    )
    
    html = re.sub(
        r'(<div class="stat-value" id="lean-mass">)[^<]*(</div>)',
        f'\\g<1>{lean_mass:.1f}\\g<2>',
        html
    )
    html = re.sub(
        r'(<span id="last-weigh">)[^<]*(</span>)',
        f'\\g<1>{formatted_date}\\g<2>',
        html
    )
    
    # Update chart data
    chart_labels = [w['date'][5:].replace('-', '/') for w in weights]  # "01/13" format
    chart_values = [w['lbs'] for w in weights]
    
    html = re.sub(
        r'(labels: \[)[^\]]*(\])',
        f'\\g<1>"{"\", \"".join(chart_labels)}"\\g<2>',
        html
    )
    html = re.sub(
        r'(values: \[)[^\]]*(\])',
        f'\\g<1>{", ".join(str(v) for v in chart_values)}\\g<2>',
        html
    )
    
    # Write back
    DASHBOARD_PATH.write_text(html)
    
    print(f"Dashboard updated:")
    print(f"  Weight: {latest_weight:.1f} lbs")
    print(f"  Body Fat: {latest_bf:.1f}%")
    print(f"  Change: {weight_change:+.1f} lbs")
    print(f"  Lean Mass: {lean_mass:.1f} lbs")
    print(f"  Last weigh-in: {formatted_date}")
    
    return True

if __name__ == "__main__":
    update_dashboard()
