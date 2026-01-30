---
name: motion
description: Manage Motion AI calendar - tasks, projects, schedules, and recurring tasks. Use when the user asks to add tasks, check schedule, list projects, or manage their Motion calendar/task system.
---

# Motion

Motion is an AI-powered calendar and task management app. This skill provides API access.

## Setup

1. Get API key from Motion: Settings → API → Create API Key
2. Store in environment: `export MOTION_API_KEY="your-key"`
3. Or pass via `--api-key` flag

## CLI Usage

```bash
# Auth test
motion me

# Tasks
motion tasks                           # List tasks
motion tasks --status "In Progress"    # Filter by status
motion tasks --project "Project Name"  # Filter by project
motion task <id>                       # Get specific task
motion task create "Task name" --deadline "2024-01-30" --priority HIGH
motion task update <id> --status "Completed"
motion task delete <id>
motion task move <id> --workspace <workspace-id>

# Projects
motion projects                        # List all projects
motion project <id>                    # Get project details
motion project create "Project name" --workspace <id>

# Recurring Tasks
motion recurring                       # List recurring tasks
motion recurring create "Daily standup" --frequency DAILY_WEEKDAYS
motion recurring delete <id>

# Other
motion workspaces                      # List workspaces
motion schedules                       # List schedules
motion statuses                        # List available statuses
motion users                           # List workspace users
```

## Direct API (curl)

Base URL: `https://api.usemotion.com/v1`

```bash
# List tasks
curl -H "X-API-Key: $MOTION_API_KEY" https://api.usemotion.com/v1/tasks

# Create task
curl -X POST -H "X-API-Key: $MOTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"Task name","workspaceId":"ws_xxx","deadline":"2024-01-30","priority":"HIGH"}' \
  https://api.usemotion.com/v1/tasks

# Update task
curl -X PATCH -H "X-API-Key: $MOTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status":"Completed"}' \
  https://api.usemotion.com/v1/tasks/<task-id>

# Delete task
curl -X DELETE -H "X-API-Key: $MOTION_API_KEY" \
  https://api.usemotion.com/v1/tasks/<task-id>
```

## Key Concepts

- **Workspace**: Top-level container (personal or team)
- **Project**: Groups related tasks within a workspace
- **Status**: Task state (from statuses endpoint - varies by workspace)
- **Priority**: ASAP, HIGH, MEDIUM, LOW
- **Duration**: Task time estimate in minutes (AUTO for AI scheduling)
- **Deadline**: When task must be completed by

## Task Fields

| Field | Type | Notes |
|-------|------|-------|
| name | string | Required |
| workspaceId | string | Required for create |
| projectId | string | Optional |
| deadline | ISO date | When task is due |
| priority | enum | ASAP, HIGH, MEDIUM, LOW |
| duration | int/AUTO | Minutes or "AUTO" |
| status | string | From /statuses endpoint |
| description | string | Task details |
| labels | array | Label IDs |
| assigneeId | string | User ID to assign |

## Recurring Task Frequencies

- `DAILY` - Every day
- `DAILY_WEEKDAYS` - Mon-Fri
- `WEEKLY` - Once per week
- `BIWEEKLY` - Every 2 weeks
- `MONTHLY` - Once per month
- `QUARTERLY` - Every 3 months
- `YEARLY` - Once per year

## Rate Limits

- 12 requests/minute per API key
- Paginated responses use `cursor` parameter
