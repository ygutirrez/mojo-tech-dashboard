# 📁 02 - Misting System Estimate Appointments

Workflows for misting system sales appointments. Requires dedicated calendar for Lee.

---

## Calendar Setup Required

**Before building workflows:**

1. **Create Calendar:** "Misting System Estimates" (or use existing if applicable)
2. **Assign to Lee** — He needs:
   - Access to view/manage appointments
   - Sync with his personal calendar (Google/Outlook)
3. **Settings:**
   - Appointment duration: 30-60 min (estimate visit)
   - Buffer time: 15-30 min between appointments
   - Availability: Set Lee's working hours
4. **Booking widget** — Embed on website/landing page if taking online bookings

---

## Workflow 1: Estimate Booked - Confirmation

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - Confirmation`
**Status:** Active

### Trigger
- **Type:** Appointment Status Changed
- **Calendar:** Misting System Estimates
- **Status:** Booked/Confirmed

### Actions

**1. Add Tag**
- Tag: `misting-estimate-scheduled`

**2. Send SMS** *(immediate)*
```
You're all set, {{contact.first_name}}! 🦟

Your misting system estimate is scheduled:
📅 {{appointment.date}}
⏰ {{appointment.start_time}}
📍 {{contact.address}}

Lee will walk your property and design a custom system for your yard. Takes about 30 minutes.

Reply C to confirm or R if you need to reschedule!
```

**3. Send Email**
- Subject: `Your Misting System Estimate is Confirmed`
```
Hi {{contact.first_name}},

Great news — your misting system estimate is on the books!

APPOINTMENT DETAILS
━━━━━━━━━━━━━━━━━━
📅 Date: {{appointment.date}}
⏰ Time: {{appointment.start_time}}
📍 Address: {{contact.address}}

WHAT TO EXPECT
━━━━━━━━━━━━━━━━━━
Lee will visit your property to:
✅ Walk your yard and assess coverage needs
✅ Identify the best nozzle placement locations
✅ Design a custom misting system layout
✅ Provide a detailed quote

The whole process takes about 30 minutes. No pressure, no obligation — just an honest assessment of what it would take to make your yard mosquito-free 24/7.

ABOUT MISTING SYSTEMS
━━━━━━━━━━━━━━━━━━
Unlike traditional treatments that need to be reapplied, a misting system gives you automatic, year-round protection. Set it and forget it!

Need to reschedule? Just reply to this email or call us at {{location.phone}}.

See you soon!

The Mosquito Joe Team
```

**4. Internal Notification** *(to Lee)*
```
🦟 NEW MISTING ESTIMATE BOOKED

{{contact.first_name}} {{contact.last_name}}
📞 {{contact.phone}}
📧 {{contact.email}}
📍 {{contact.address}}

📅 {{appointment.date}} at {{appointment.start_time}}
```

---

## Workflow 2: Estimate Reminder - 24 Hours

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - 24hr Reminder`
**Status:** Active

### Trigger
- **Type:** Appointment Time
- **Calendar:** Misting System Estimates
- **When:** 24 hours before appointment

### Actions

**1. Send SMS**
```
Hey {{contact.first_name}}! Reminder: Your misting system estimate is tomorrow at {{appointment.start_time}}. 🦟

Lee will walk your property and put together a custom quote. See you then!
```

**2. Internal Notification** *(to Lee)*
```
📅 TOMORROW: Misting estimate

{{contact.first_name}} {{contact.last_name}}
📍 {{contact.address}}
⏰ {{appointment.start_time}}
📞 {{contact.phone}}
```

---

## Workflow 3: Estimate Reminder - Day Of

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - Day Of`
**Status:** Active

### Trigger
- **Type:** Appointment Time
- **Calendar:** Misting System Estimates
- **When:** 2 hours before appointment

### Actions

**1. Send SMS**
```
Good morning, {{contact.first_name}}! Lee will be there around {{appointment.start_time}} for your misting system estimate. See you soon! 🦟
```

---

## Workflow 4: Estimate - On The Way

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - En Route`
**Status:** Active

### Trigger
- **Type:** Tag Added
- **Tag:** `lee-en-route`
- *Lee adds this tag when leaving for appointment*

### Actions

**1. Send SMS**
```
Heads up, {{contact.first_name}}! Lee is on his way and should arrive in about 15-20 minutes. 🚗
```

---

## Workflow 5: Estimate - No Show

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - No Show`
**Status:** Active

### Trigger
- **Type:** Appointment Status Changed
- **Calendar:** Misting System Estimates
- **Status:** No Show

### Actions

**1. Add Tag**
- Tag: `misting-no-show`

**2. Send SMS** *(immediate)*
```
Hi {{contact.first_name}}, Lee stopped by for your misting system estimate but wasn't able to connect with you. Want to reschedule? Just reply with a day/time that works!
```

**3. Wait**
- Duration: 4 hours

**4. If/Else Condition**
- If: Response = No
- Then → Continue

**5. Send SMS**
```
Hey {{contact.first_name}}, just following up on the misting estimate. Still interested? I can get you rescheduled this week if that works better.
```

**6. Create Task**
- Title: `Follow up - Misting no show: {{contact.first_name}}`
- Due: Tomorrow 9 AM
- Assign to: Lee

**7. Wait**
- Duration: 3 days

**8. If/Else Condition**
- If: No reschedule
- Then → Add tag `misting-lead-cold`

---

## Workflow 6: Estimate - Cancelled

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - Cancelled`
**Status:** Active

### Trigger
- **Type:** Appointment Status Changed
- **Calendar:** Misting System Estimates
- **Status:** Cancelled

### Actions

**1. Add Tag**
- Tag: `misting-estimate-cancelled`

**2. Remove Tag**
- Tag: `misting-estimate-scheduled`

**3. Wait**
- Duration: 1 hour

**4. Send SMS**
```
Hi {{contact.first_name}}, no problem on the reschedule! When you're ready for that misting system estimate, just reply and we'll get you back on the calendar. 🦟
```

**5. Wait**
- Duration: 5 days

**6. If/Else Condition**
- If: No new appointment
- Then → Continue

**7. Send SMS**
```
Hey {{contact.first_name}}, still thinking about a misting system? Happy to answer any questions — just reply here. No pressure!
```

**8. Wait**
- Duration: 7 days

**9. If/Else Condition**
- If: Still no appointment
- Then → Add tag `misting-lead-cold`

---

## Workflow 7: Estimate - Rescheduled

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - Rescheduled`
**Status:** Active

### Trigger
- **Type:** Appointment Rescheduled
- **Calendar:** Misting System Estimates

### Actions

**1. Send SMS** *(immediate)*
```
Got it, {{contact.first_name}}! Your misting estimate is now:

📅 {{appointment.date}}
⏰ {{appointment.start_time}}

Lee will see you then! 🦟
```

**2. Remove Tags**
- `misting-no-show`
- `misting-estimate-cancelled`

---

## Workflow 8: Estimate Completed - Follow Up

**Folder:** 02 - Misting Estimates
**Workflow Name:** `Misting Estimate - Post Visit`
**Status:** Active

### Trigger
- **Type:** Appointment Status Changed
- **Calendar:** Misting System Estimates
- **Status:** Completed/Showed

### Actions

**1. Add Tag**
- Tag: `misting-estimate-completed`

**2. Wait**
- Duration: 2 hours

**3. Send SMS**
```
Thanks for meeting with Lee today, {{contact.first_name}}! 🦟

Take your time reviewing the quote. Any questions at all — just reply here or give us a call. We're happy to walk through everything again.
```

**4. Wait**
- Duration: 2 days

**5. If/Else Condition**
- If: Tag `misting-sold` = No (hasn't purchased)
- Then → Continue
- Else → End workflow

**6. Send SMS**
```
Hey {{contact.first_name}}, just checking in on that misting system quote. Any questions I can answer? Ready to pull the trigger whenever you are! 🦟
```

**7. Wait**
- Duration: 5 days

**8. If/Else Condition**
- If: Still no purchase
- Then → Continue
- Else → End workflow

**9. Send Email**
- Subject: `Your Misting System Quote`
```
Hi {{contact.first_name}},

Just wanted to follow up on the misting system estimate Lee put together for you.

A quick recap of what you'd be getting:
✅ Automatic mosquito protection — runs on a timer, no effort required
✅ Custom-designed for your property
✅ Year-round coverage (no more scheduling treatments)
✅ Professional installation included

If you have any questions about the quote, installation process, or anything else — just reply to this email. Happy to chat!

When you're ready to move forward, just let us know and we'll get you on the installation schedule.

Thanks,
The Mosquito Joe Team
```

**10. Create Task**
- Title: `Misting follow-up call: {{contact.first_name}}`
- Due: 2 days
- Assign to: Lee

---

## Quick Reference

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| Confirmation | Estimate booked | SMS + Email + Alert Lee |
| 24hr Reminder | -24 hours | Customer + Lee reminder |
| Day Of | -2 hours | Morning heads up |
| En Route | Manual tag | Lee on the way |
| No Show | Status = No Show | Follow-up sequence |
| Cancelled | Status = Cancelled | Re-engagement sequence |
| Rescheduled | Rescheduled | New time confirmation |
| Post Visit | Status = Completed | Quote follow-up sequence |

---

## Tags Used

| Tag | Meaning |
|-----|---------|
| `misting-estimate-scheduled` | Has estimate appointment |
| `misting-estimate-completed` | Estimate done, awaiting decision |
| `misting-estimate-cancelled` | Cancelled, being followed up |
| `misting-no-show` | Missed estimate appointment |
| `misting-lead-cold` | No response after follow-ups |
| `misting-sold` | Purchased system |
| `lee-en-route` | Lee dispatched (manual) |

---

## Calendar Setup Checklist

- [ ] Create "Misting System Estimates" calendar in GHL
- [ ] Set appointment duration (30-60 min recommended)
- [ ] Set buffer time between appointments (15-30 min)
- [ ] Configure Lee's availability/working hours
- [ ] Sync with Lee's personal calendar (Google Calendar or Outlook)
- [ ] Create booking page/widget if needed
- [ ] Test notification delivery to Lee
