# 📁 09 - Internal/Admin (Simplified)

3 workflows for internal ops — onboarding, anniversaries, cleanup.

---

## Workflow 1: New Customer Onboarding

**Handles:** Internal checklist when someone becomes a customer

### Trigger
- **Type:** First appointment completed
- **Or:** Tag Added: `customer-new`

### Actions

**1. Add Tag:** `customer-active`

**2. Remove Tags:** `lead-new`, `lead-cold`, etc.

**3. Update Pipeline:** Move to "Active Customer" stage

**4. Create Task**
- Title: `30-day check-in: {{contact.first_name}}`
- Due: 30 days
- Assign to: Hollie

**5. Internal Notification**
```
🎉 NEW CUSTOMER

{{contact.first_name}} {{contact.last_name}}
📞 {{contact.phone}}
📍 {{contact.address}}

First service completed!
```

---

## Workflow 2: Customer Anniversary

**Handles:** Celebrate loyal customers

### Trigger
- **Type:** Date-based (1 year since first service)
- **Or:** Custom date field: `first_service_date`

### Actions

**1. Send SMS**
```
Happy anniversary, {{contact.first_name}}! 🎉 It's been 1 year since you joined the Mosquito Joe family. Thanks for trusting us with your yard!
```

**2. Send Email**
- Subject: `Happy Anniversary! 🎉`
```
Hi {{contact.first_name}},

Wow — it's been a whole year!

Thanks for being part of the Mosquito Joe family. We're honored to help keep your yard mosquito-free.

Here's to another year of enjoying your backyard!

— The Mosquito Joe Team
```

**3. Add Tag:** `anniversary-1yr`

*(Optional: Include a loyalty discount or gift)*

---

## Workflow 3: Stale Lead Cleanup

**Handles:** Archive dead leads, keep database clean

### Trigger
- **Type:** Scheduled (weekly or monthly)
- **Filter:** Tag = `lead-new` AND No Activity in 90 days AND No Appointment

### Actions

**1. Send SMS** *(Final reach-out)*
```
Hey {{contact.first_name}}, still interested in mosquito control? Reply YES to stay on our list, or we'll close your file. No hard feelings!
```

**2. Wait:** 7 days

**3. If/Else:** Response received?
- Yes → Keep lead open, remove from cleanup
- No → Continue

**4. Remove Tag:** `lead-new`

**5. Add Tag:** `lead-archived`

**6. Update Pipeline:** Move to "Dead/Archived"

---

## Summary

| Workflow Title | Trigger | Purpose |
|----------------|---------|---------|
| **New Customer Onboarding** | First service completed | Tag updates, 30-day task, notification |
| **Customer Anniversary** | 1 year since first service | Thank you SMS + Email |
| **Stale Lead Cleanup** | 90 days no activity | Final SMS → Archive if no response |

---

## Tags

| Tag | Meaning |
|-----|---------|
| `customer-new` | Just converted |
| `customer-active` | Active paying customer |
| `anniversary-1yr` | Hit 1 year milestone |
| `lead-archived` | Dead lead, no longer active |

---

## Notes

- **Anniversary:** Can expand to 2yr, 3yr, etc. with loyalty perks
- **Cleanup:** Run monthly to keep contact list healthy
- **30-day check-in:** Good for catching issues early, building relationship
