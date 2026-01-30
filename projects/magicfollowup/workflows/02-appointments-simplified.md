# 📁 02 - Misting Estimates (Simplified)

3 workflows instead of 8. Uses internal branching.

---

## Workflow 1: Misting Estimate - Booked

**Handles:** Confirmation → 24hr reminder → Day-of reminder

### Trigger
- **Type:** Appointment Created
- **Calendar:** Misting System Estimates

### Actions

**1. Add Tag:** `misting-estimate-scheduled`

**2. Send SMS** *(Confirmation)*
```
You're all set, {{contact.first_name}}! 🦟

Misting system estimate:
📅 {{appointment.date}}
⏰ {{appointment.start_time}}

Lee will walk your property and design a custom system. Reply C to confirm or R to reschedule!
```

**3. Send Email** *(Confirmation)*
- Subject: `Your Misting System Estimate is Confirmed`
```
Hi {{contact.first_name}},

Your misting system estimate is confirmed!

📅 {{appointment.date}}
⏰ {{appointment.start_time}}
📍 {{contact.address}}

Lee will visit to assess your property and provide a custom quote. Takes about 30 minutes, no obligation.

Questions? Reply to this email or call {{location.phone}}.

— Mosquito Joe Team
```

**4. Internal Notification → Lee**
```
🦟 Misting estimate booked
{{contact.first_name}} {{contact.last_name}}
📅 {{appointment.date}} @ {{appointment.start_time}}
📍 {{contact.address}}
📞 {{contact.phone}}
```

**5. Wait Until:** 24 hours before appointment

**6. Send SMS** *(24hr Reminder)*
```
Reminder: Your misting estimate is tomorrow at {{appointment.start_time}}. Lee will see you then! 🦟
```

**7. Wait Until:** 2 hours before appointment

**8. Send SMS** *(Day-of)*
```
Lee will be there around {{appointment.start_time}} for your misting estimate. See you soon!
```

---

## Workflow 2: Misting Estimate - Status Change

**Handles:** Completed, No Show, Cancelled, Rescheduled (all in one with branches)

### Trigger
- **Type:** Appointment Status Changed
- **Calendar:** Misting System Estimates

### Actions

**1. Branch by Appointment Status**

---

### Branch A: Completed/Showed

**A1. Add Tag:** `misting-estimate-completed`

**A2. Remove Tag:** `misting-estimate-scheduled`

**A3. Wait:** 2 hours

**A4. Send SMS**
```
Thanks for meeting with Lee today! Take your time with the quote — reply here if you have any questions. 🦟
```

**A5. Wait:** 2 days

**A6. If Tag `misting-sold` exists → End**

**A7. Send SMS**
```
Hey {{contact.first_name}}, any questions on that misting quote? Ready when you are!
```

**A8. Wait:** 5 days

**A9. If still no `misting-sold` tag:**

**A10. Send Email**
- Subject: `Your Misting System Quote`
```
Hi {{contact.first_name}},

Following up on your misting estimate. Quick recap:

✅ Automatic mosquito protection on a timer
✅ Custom-designed for your yard
✅ Year-round coverage, no scheduling needed
✅ Professional installation included

Questions? Just reply. Ready to move forward? Let us know and we'll schedule installation!

— Mosquito Joe Team
```

**A11. Create Task:** `Misting follow-up: {{contact.first_name}}` → Assign to Lee

---

### Branch B: No Show

**B1. Add Tag:** `misting-no-show`

**B2. Send SMS** *(immediate)*
```
Hi {{contact.first_name}}, Lee stopped by but couldn't connect. Want to reschedule? Reply with a time that works!
```

**B3. Wait:** 1 day

**B4. If no response:**

**B5. Send SMS**
```
Still interested in a misting estimate? Just reply and I'll get you back on the calendar.
```

**B6. Create Task:** `No show follow-up: {{contact.first_name}}` → Lee

---

### Branch C: Cancelled

**C1. Add Tag:** `misting-cancelled`

**C2. Remove Tag:** `misting-estimate-scheduled`

**C3. Wait:** 1 hour

**C4. Send SMS**
```
No problem, {{contact.first_name}}! When you're ready for that misting estimate, just reply and we'll reschedule. 🦟
```

**C5. Wait:** 5 days

**C6. If no new appointment:**

**C7. Send SMS**
```
Hey {{contact.first_name}}, still thinking about misting? Happy to answer questions — no pressure!
```

---

### Branch D: Rescheduled

**D1. Send SMS** *(immediate)*
```
Got it! Your misting estimate is now:
📅 {{appointment.date}}
⏰ {{appointment.start_time}}

Lee will see you then! 🦟
```

**D2. Remove Tags:** `misting-no-show`, `misting-cancelled`

---

## Workflow 3: Misting - Lee En Route (Optional)

**Simple manual trigger when Lee is heading out**

### Trigger
- **Type:** Tag Added
- **Tag:** `lee-en-route`

### Actions

**1. Send SMS**
```
Heads up! Lee is on his way, should arrive in 15-20 min. 🚗
```

**2. Wait:** 30 minutes

**3. Remove Tag:** `lee-en-route`

---

## Summary

| Workflow | What It Handles |
|----------|-----------------|
| **Misting Estimate - Booked** | Confirmation + 24hr + Day-of reminders |
| **Misting Estimate - Status Change** | Completed + No Show + Cancelled + Rescheduled |
| **Lee En Route** | Optional "on the way" text |

**3 workflows total** vs 8 before.

---

## Tags (Simplified)

| Tag | Meaning |
|-----|---------|
| `misting-estimate-scheduled` | Appointment on calendar |
| `misting-estimate-completed` | Estimate done, following up on quote |
| `misting-no-show` | Missed appointment |
| `misting-cancelled` | Cancelled |
| `misting-sold` | Purchased (add manually or via pipeline) |
| `lee-en-route` | Lee is on his way |
