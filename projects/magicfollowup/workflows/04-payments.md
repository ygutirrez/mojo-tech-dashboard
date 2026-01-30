# 📁 04 - Payments (Simplified)

2 workflows for Text2Pay and payment issues.

---

## Workflow 1: Invoice Sent - Text2Pay

**Handles:** Payment request → Reminders → Escalation

### Trigger
- **Type:** Invoice Created
- *(Or Tag Added: `invoice-sent`)*

### Actions

**1. Send SMS** *(immediate)*
```
Hi {{contact.first_name}}, here's your invoice from Mosquito Joe: {{invoice.link}} — Thanks!
```

**2. Wait:** 3 days

**3. If/Else:** Invoice paid?
- Yes → End
- No → Continue

**4. Send SMS** *(Reminder 1)*
```
Friendly reminder, {{contact.first_name}} — your Mosquito Joe invoice is still open: {{invoice.link}}
```

**5. Wait:** 4 days

**6. If/Else:** Invoice paid?
- Yes → End
- No → Continue

**7. Send SMS** *(Reminder 2)*
```
Hey {{contact.first_name}}, just following up on your invoice. Let us know if you have any questions! {{invoice.link}}
```

**8. Send Email**
- Subject: `Invoice Reminder - Mosquito Joe`
```
Hi {{contact.first_name}},

This is a friendly reminder that your invoice is still outstanding.

💳 Pay Now: {{invoice.link}}

If you've already paid, please disregard. Questions? Just reply to this email.

Thanks,
Mosquito Joe Team
```

**9. Wait:** 7 days

**10. If/Else:** Still unpaid?
- Yes → Add tag `payment-overdue`, Create task for manual follow-up
- No → End

---

## Workflow 2: Payment Failed

**Handles:** Failed payment notification + retry request

### Trigger
- **Type:** Payment Failed
- *(Or Tag Added: `payment-failed`)*

### Actions

**1. Add Tag:** `payment-failed`

**2. Send SMS** *(immediate)*
```
Hi {{contact.first_name}}, heads up — your payment didn't go through. Please update your card here: {{payment_link}}
```

**3. Wait:** 2 days

**4. If/Else:** Payment resolved?
- Yes → Remove tag, End
- No → Continue

**5. Send SMS**
```
Hey {{contact.first_name}}, still having trouble with your payment? Reply here if you need help or a different way to pay.
```

**6. Wait:** 3 days

**7. If/Else:** Still failed?
- Yes → Add tag `payment-overdue`, Create task for Hollie
- No → End

---

## Summary

| Workflow | Trigger | Flow |
|----------|---------|------|
| **Invoice Sent** | Invoice created | SMS with link → 3 day reminder → 7 day reminder + email → Task if unpaid |
| **Payment Failed** | Payment failed | SMS to update card → 2 day follow-up → Task if unresolved |

---

## Tags

| Tag | Meaning |
|-----|---------|
| `invoice-sent` | Invoice out, awaiting payment |
| `payment-failed` | Card declined |
| `payment-overdue` | 14+ days unpaid, needs manual follow-up |

---

## Notes

- **{{invoice.link}}** — GHL generates this automatically with invoices
- **{{payment_link}}** — Link to update payment method
- **Requires NMI connected** — These won't work until payment gateway is set up
