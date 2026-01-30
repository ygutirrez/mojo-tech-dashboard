# 📁 06 - Referrals & Reviews (Simplified)

2 workflows for referral program and review responses.

---

## Workflow 1: Referral Program

**Handles:** Invite customers to refer → Reward when friend signs up

### Trigger
- **Type:** Tag Added: `customer-active`
- **Or:** 7 days after first service completed

### Actions

**1. Wait:** 7 days after trigger

**2. Send SMS**
```
Hey {{contact.first_name}}! Loving Mosquito Joe? Refer a friend and you BOTH get $50 off your next service. Just have them mention your name when they call! 🦟
```

**3. Send Email**
- Subject: `Share the Love, Get $50`
```
Hi {{contact.first_name}},

Enjoying your mosquito-free yard? Spread the word!

🎁 REFER A FRIEND, GET $50

Here's how it works:
1. Tell a friend about Mosquito Joe
2. They mention your name when they sign up
3. You BOTH get $50 off your next service

No limit — refer as many friends as you want!

Thanks for being a great customer.

— Mosquito Joe Team
```

---

### Sub-Workflow: Referral Redeemed

**Trigger:** Tag Added: `referral-redeemed`

**Actions:**

**1. Send SMS**
```
🎉 Your friend signed up! Your $50 credit has been applied. Thanks for spreading the word, {{contact.first_name}}!
```

---

## Workflow 2: Review Response

**Handles:** Thank positive reviewers, flag negative for follow-up

### Trigger
- **Type:** Review received (via GHL reputation management)
- **Or:** Tag Added: `review-received`

### Actions

**1. Branch by Rating**

---

### Branch A: Positive (4-5 stars)

**A1. Add Tag:** `reviewer-positive`

**A2. Send SMS**
```
Thanks for the awesome review, {{contact.first_name}}! You made our day. 🦟💚
```

**A3. Add Tag:** `advocate` *(good referral candidate)*

---

### Branch B: Negative (1-3 stars)

**B1. Add Tag:** `reviewer-negative`

**B2. Internal Alert** *(immediate)*
```
⚠️ NEGATIVE REVIEW

{{contact.first_name}} {{contact.last_name}}
Rating: {{review.rating}} stars
📞 {{contact.phone}}

DO NOT auto-respond publicly. Personal outreach needed.
```

**B3. Create Task**
- Title: `🚨 Negative review - {{contact.first_name}}`
- Due: 2 hours
- Assign to: Hollie

**B4. Wait:** 1 hour

**B5. Send SMS** *(private, not public reply)*
```
Hi {{contact.first_name}}, we saw your review and we're really sorry about your experience. Can we make this right? Reply here or I'll give you a call.
```

---

## Summary

| Workflow Title | Trigger |
|----------------|---------|
| **Referral Program** | Customer active (7 days post-service) |
| **Referral Redeemed** | Tag: referral-redeemed |
| **Review Response** | Review received → Branch by rating |

---

## Tags

| Tag | Meaning |
|-----|---------|
| `referral-sent` | Referral invite sent |
| `referral-redeemed` | Friend signed up |
| `review-received` | Left a review |
| `reviewer-positive` | 4-5 star review |
| `reviewer-negative` | 1-3 star review |
| `advocate` | Happy customer, referral candidate |

---

## Notes

- **Referral tracking:** Manual for now (tag when someone mentions a referrer), or use GHL's referral tracking if set up
- **Review monitoring:** Requires GHL reputation management connected to Google
- **Negative reviews:** Never auto-reply publicly — always personal outreach first
