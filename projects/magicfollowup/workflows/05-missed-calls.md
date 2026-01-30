# 📁 05 - Missed Calls (Simplified)

2 workflows — business hours vs after hours.

---

## Workflow 1: Missed Call - Business Hours

### Trigger
- **Type:** Call Status = Missed
- **Filter:** During business hours (e.g., 8am-6pm M-F)

### Actions

**1. Send SMS** *(immediate)*
```
Sorry we missed your call! How can we help? Reply here or we'll call you back shortly. 🦟
```

**2. Create Task**
- Title: `Return call: {{contact.first_name}} {{contact.last_name}}`
- Due: 15 minutes
- Assign to: Hollie

**3. Wait:** 30 minutes

**4. If/Else:** Outbound call made?
- Yes → End
- No → Continue

**5. Internal Alert**
```
⚠️ Missed call not returned (30 min)
{{contact.first_name}} {{contact.last_name}}
📞 {{contact.phone}}
```

---

## Workflow 2: Missed Call - After Hours

### Trigger
- **Type:** Call Status = Missed
- **Filter:** Outside business hours

### Actions

**1. Send SMS** *(immediate)*
```
Thanks for calling Mosquito Joe! We're closed right now but will call you back first thing tomorrow. Need something urgent? Reply here.
```

**2. Create Task**
- Title: `Return call (after hours): {{contact.first_name}}`
- Due: Tomorrow 9 AM
- Assign to: Hollie

**3. If/Else:** Voice AI enabled?
- Yes → Route to Voice AI
- No → End

---

## Summary

| Workflow Title | Trigger | Key Action |
|----------------|---------|------------|
| **Missed Call - Business Hours** | Missed call during hours | SMS + 15 min callback task |
| **Missed Call - After Hours** | Missed call outside hours | SMS + Next day task |

---

## Tags

| Tag | Meaning |
|-----|---------|
| `missed-call` | Had a missed call (optional tracking) |

---

## Notes

- **Business hours filter:** Set in workflow trigger conditions (8am-6pm or whatever Hollie's hours are)
- **Voice AI:** If you set up the voice AI for overflow, the after-hours workflow can route there instead
- Can combine into 1 workflow with time-based branching if preferred
