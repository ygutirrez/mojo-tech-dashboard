# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Google Calendar

- **Yoel's calendar:** `ygutierrez@gmail.com` (full access via mojoeagent@gmail.com)

## Email Monitoring

- **Inbox:** `mojoeagent@gmail.com` receives forwards from Yoel's personal Gmail + business Outlook
- **Draft replies to:** `ygutierrez@gmail.com`
- **Subject format:** "Draft email for - [original subject]"

## Spotify

- **Auth:** Token stored at `~/.cache/spotify-player/user_client_token.json`
- **Devices seen:**
  - Kitchen (Speaker)
  - GUT-OFFICE (Computer)
  - Office Bose SoundTouch (needs to be woken up via Spotify app to appear)

## Google Fit
- **CLI:** `~/clawd/tools/google-fit/gfit`
- **Commands:** `weight [--days N]`, `bodyfat [--days N]`, `sources`, `auth`
- **Auth:** OAuth token at `~/.config/google-fit/token.json`
- **Data source:** Hume Body Pod via fittrackhealth.pro app
- **Dashboard script:** `~/clawd/tools/google-fit/update-dashboard.py`

## Zapier MCP Server

- **Status:** Connected and available
- **URL:** `https://mcp.zapier.com/api/v1/connect?token=...` (token stored in mcporter config)
- **Use for:** Apps we don't have direct integrations for, cross-app automations, quick experiments
- **Configured tools:** Google Drive, Motion, ClickUp, Google Sheets, Google Calendar
- **Cost:** Free tier = 100 tasks/mo, Paid starts $19.99/mo for 750 tasks
- **Note:** Prefer direct integrations (gog, mcporter, skills) for daily use — use Zapier for edge cases and new projects

## Examples

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
