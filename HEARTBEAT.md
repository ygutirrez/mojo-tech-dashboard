# HEARTBEAT.md

## MoJoe Task Queue
- Check ClickUp "MoJoe Tasks" list (ID: 901710395957): `mcporter call clickup.get_tasks listId="901710395957"`
- If any tasks are in "to do" status:
  1. Update to "in progress": `mcporter call clickup.update_task_status taskId="<id>" status="in progress"`
  2. Work on it immediately
  3. Update to "complete" when done
  4. Ping Yoel with update
- Be proactive — start work without asking

## Calendar Check
- Check Yoel's calendar (ygutierrez@gmail.com) for events in the next 2 hours
- If something's coming up within 30 min, give a heads-up
- Track last check time in memory/heartbeat-state.json to avoid spamming

## Email Monitoring
- Check mojoeagent@gmail.com for forwarded emails (from personal Gmail + business Outlook)
- If something looks important, draft a reply
- Send draft to ygutierrez@gmail.com with subject: "Draft email for - [original subject]"
- Don't send replies directly, just drafts for Yoel to review
