# 📁 08 - Recurring/Subscription (Simplified)

3 workflows for subscription customers — renewal, cancellation saves, win-back.

---

## Workflow 1: Subscription Renewal Reminder

**Handles:** Heads up before renewal + confirmation

### Trigger
- **Type:** Date-based (30 days before renewal date)
- **Or:** Tag Added: `renewal-upcoming`

### Actions

**1. Send Email**
- Subject: `Your Mosquito Protection Renews Soon`
```
Hi {{contact.first_name}},

Just a heads up — your Mosquito Joe protection plan renews on {{custom.renewal_date}}.

No action needed! We'll keep your yard protected automatically.

Questions or want to make changes? Just reply to this email or call {{location.phone}}.

Thanks for being a loyal customer!

— Mosquito Joe Team
```

**2. Wait:** 7 days before renewal

**3. Send SMS**
```
Hey {{contact.first_name}}, your Mosquito Joe plan renews next week. All set to keep you protected! Questions? Reply here 🦟
```

---

## Workflow 2: Cancellation Request - Save Attempt

**Handles:** Customer wants to cancel → Try to save

### Trigger
- **Type:** Tag Added: `cancel-request`

### Actions

**1. Internal Alert** *(immediate)*
```
⚠️ CANCEL REQUEST

{{contact.first_name}} {{contact.last_name}}
📞 {{contact.phone}}

Retention call needed!
```

**2. Create Task**
- Title: `🚨 Retention call: {{contact.first_name}}`
- Due: 2 hours
- Assign to: Hollie

**3. Send SMS** *(immediate)*
```
Hi {{contact.first_name}}, we got your request. Before we process it, is there anything we can do to keep you? Pause service? Adjust frequency? We'd love to find a solution. Reply or I'll give you a call.
```

**4. Wait:** 24 hours

**5. If/Else:** Tag `cancel-saved` exists?
- Yes → End
- No → Continue

**6. Send SMS**
```
Hey {{contact.first_name}}, just checking in one more time — we hate to see you go! Would a pause or discount help? Let me know.
```

**7. Wait:** 3 days

**8. If/Else:** Still wants to cancel?
- Yes → Add tag `cancelled`, trigger Win-Back workflow (30 days)
- No → End

---

## Workflow 3: Win-Back (Cancelled Customers)

**Handles:** Re-engage customers who cancelled

### Trigger
- **Type:** Tag Added: `cancelled`
- **Wait:** 30 days after cancellation

### Actions

**1. Wait:** 30 days

**2. Send Email**
- Subject: `We Miss You, {{contact.first_name}}!`
```
Hi {{contact.first_name}},

We noticed you're no longer with Mosquito Joe — and honestly, we miss you!

If you'd ever like to come back, we'd love to have you. Here's a little incentive:

🎁 20% OFF your first treatment back

Just reply to this email or call {{location.phone}} to reactivate.

No pressure — just know we're here when you need us!

— Mosquito Joe Team
```

**3. Wait:** 30 days

**4. Send SMS**
```
Hey {{contact.first_name}}, mosquitoes don't take breaks — but we get it if you needed one! Ready to restart? Reply YES for a special comeback deal 🦟
```

**5. Wait:** 30 days

**6. Send Email** *(Final attempt)*
- Subject: `Last Chance: Special Offer Inside`
```
Hi {{contact.first_name}},

Last check-in from us! If you ever want to restart your mosquito protection, just reply.

We'll keep your info on file — no hard feelings either way.

Enjoy your yard!

— Mosquito Joe Team
```

**7. Add Tag:** `win-back-completed` *(finished sequence, don't repeat)*

---

## Summary

| Workflow Title | Trigger |
|----------------|---------|
| **Renewal Reminder** | 30 days before renewal |
| **Cancel Save Attempt** | Tag: cancel-request |
| **Win-Back** | 30 days after cancelled |

---

## Tags

| Tag | Meaning |
|-----|---------|
| `renewal-upcoming` | Renewal within 30 days |
| `cancel-request` | Wants to cancel |
| `cancel-saved` | Retention successful |
| `cancelled` | Actually cancelled |
| `win-back-completed` | Finished win-back sequence |

---

## Notes

- **Renewal dates:** Need custom field tracking renewal date, or trigger manually
- **Cancel saves:** Common offers: pause service, reduce frequency, one-time discount
- **Win-back timing:** 30-60-90 day sequence, then stop (don't harass)
