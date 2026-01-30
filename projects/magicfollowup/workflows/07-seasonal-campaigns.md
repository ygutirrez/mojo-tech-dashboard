# 📁 07 - Seasonal Campaigns (Simplified)

4 workflows — manually triggered or scheduled annually.

---

## Workflow 1: Spring Kickoff

**When:** March (mosquito season starting)

### Trigger
- **Type:** Manual or Scheduled (March 1)
- **Audience:** Past customers, lapsed customers, unconverted leads

### Actions

**1. Send Email**
- Subject: `Mosquito Season is Coming 🦟`
```
Hi {{contact.first_name}},

Spring is here — and so are the mosquitoes.

Now's the perfect time to get ahead of them. Book your first treatment before the swarms arrive and take back your backyard!

📞 Call us: {{location.phone}}
💬 Reply to this email

Early birds get priority scheduling!

— Mosquito Joe Team
```

**2. Wait:** 2 days

**3. Send SMS**
```
Hey {{contact.first_name}}! Mosquito season is starting — want to get on the schedule before it gets crazy? Reply YES and we'll get you booked! 🦟
```

---

## Workflow 2: Summer Push

**When:** June (peak season)

### Trigger
- **Type:** Manual or Scheduled (June 1)
- **Audience:** Leads who didn't convert in spring, lapsed customers

### Actions

**1. Send SMS**
```
{{contact.first_name}}, mosquitoes are in full force! Still need protection? We can get you on the schedule this week. Reply or call {{location.phone}} 🦟
```

**2. Wait:** 3 days

**3. Send Email**
- Subject: `Take Back Your Backyard`
```
Hi {{contact.first_name}},

It's peak mosquito season — are you protected?

Our customers are enjoying their backyards while everyone else is getting eaten alive. Join them!

📞 {{location.phone}}

— Mosquito Joe Team
```

---

## Workflow 3: Fall Wrap-Up

**When:** September/October

### Trigger
- **Type:** Manual or Scheduled (September 15)
- **Audience:** Active customers

### Actions

**1. Send Email**
- Subject: `Keep Your Yard Protected Through Fall`
```
Hi {{contact.first_name}},

Mosquito season isn't over yet! Fall is actually when they make their final push before winter.

Stay protected through October and enjoy every last outdoor day this year.

Questions about your service schedule? Just reply!

— Mosquito Joe Team
```

**2. Send SMS**
```
Quick heads up, {{contact.first_name}} — mosquitoes don't stop until it's cold! Keep your protection going through fall. Questions? Reply here 🦟
```

---

## Workflow 4: Winter Re-engagement / Early Bird

**When:** December/January

### Trigger
- **Type:** Manual or Scheduled (January 15)
- **Audience:** All past customers, especially lapsed

### Actions

**1. Send Email**
- Subject: `Early Bird Special — Lock In Your 2026 Protection`
```
Hi {{contact.first_name}},

Thanks for a great year! Ready to do it again?

🐦 EARLY BIRD SPECIAL
Book your spring startup NOW and lock in last year's pricing before rates go up.

Reply to this email or call {{location.phone}} to secure your spot.

See you in the spring!

— Mosquito Joe Team
```

**2. Wait:** 5 days

**3. Send SMS**
```
Hey {{contact.first_name}}! Lock in early bird pricing for next mosquito season before rates go up. Want me to reserve your spot? Reply YES! 🦟
```

---

## Summary

| Workflow Title | When | Audience |
|----------------|------|----------|
| **Spring Kickoff** | March | Past customers, leads |
| **Summer Push** | June | Unconverted, lapsed |
| **Fall Wrap-Up** | September | Active customers |
| **Winter Early Bird** | January | All past customers |

---

## Notes

- **All manual trigger** — Run these when ready, or schedule in GHL
- **Segment your audience** — Don't send "come back" messages to active customers
- **Customize offers** — Add specific discounts or promos as needed
- **Frequency:** These are 1x campaigns, not recurring automations
