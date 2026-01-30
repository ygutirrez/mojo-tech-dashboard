# 📁 03 - Service & Fulfillment (Simplified)

2 workflows covering post-service follow-up and complaints.

---

## Workflow 1: Service Completed

**Handles:** Thank you → Review request → Follow-up

### Trigger
- **Type:** Appointment Status = Completed
- **Calendar:** Service appointments (or Tag Added: `service-completed`)

### Actions

**1. Add Tag:** `service-completed`

**2. Wait:** 2 hours

**3. Send SMS** *(Thank you)*
```
Thanks for choosing Mosquito Joe, {{contact.first_name}}! Your service is complete. Questions? Just reply here. 🦟
```

**4. Wait:** 24 hours

**5. Send SMS** *(Review request)*
```
Hey {{contact.first_name}}, quick favor — if you were happy with your service, would you leave us a quick review? Takes 30 seconds and helps us a ton! {{google_review_link}}
```

**6. Wait:** 3 days

**7. If/Else:** Check if review submitted (optional - requires review tracking)
- If yes → End
- If no → Continue

**8. Send Email** *(Review follow-up)*
- Subject: `How'd we do?`
```
Hi {{contact.first_name}},

Hope you're enjoying your mosquito-free yard!

If you have a minute, we'd really appreciate a quick Google review. It helps other families find us and means a lot to our small team.

⭐ Leave a Review: {{google_review_link}}

Thanks again for trusting Mosquito Joe!

— The Mosquito Joe Team
```

---

## Workflow 2: Complaint / Service Issue

**Handles:** Negative feedback response + internal escalation

### Trigger
- **Type:** Tag Added
- **Tag:** `complaint` or `service-issue`
- *(Can also trigger from negative survey response or low rating)*

### Actions

**1. Internal Alert** *(immediate - HIGH PRIORITY)*
```
⚠️ SERVICE ISSUE

{{contact.first_name}} {{contact.last_name}}
📞 {{contact.phone}}
📧 {{contact.email}}

Tagged as complaint — follow up ASAP!
```

**2. Send SMS** *(immediate)*
```
Hi {{contact.first_name}}, we're sorry to hear there was an issue. Someone from our team will reach out within the hour to make this right.
```

**3. Create Task**
- Title: `🚨 URGENT: Service issue - {{contact.first_name}}`
- Due: 1 hour
- Priority: High
- Assign to: Hollie

**4. Wait:** 24 hours

**5. If/Else:** Check if Tag `issue-resolved` exists
- If yes → End
- If no → Continue

**6. Internal Alert** *(Escalation)*
```
⚠️ UNRESOLVED COMPLAINT - 24 HOURS

{{contact.first_name}} {{contact.last_name}}
Still has open service issue. Needs immediate follow-up!
```

**7. Create Task**
- Title: `🚨 ESCALATION: Unresolved issue - {{contact.first_name}}`
- Due: Immediate
- Priority: High
- Assign to: Hollie

---

## Summary

| Workflow | Trigger | What It Does |
|----------|---------|--------------|
| **Service Completed** | Appointment completed | Thank you → Review request (24hr) → Email follow-up (3 days) |
| **Complaint / Issue** | Tag: complaint | Internal alert → Customer SMS → Task → 24hr escalation if unresolved |

---

## Tags

| Tag | Meaning |
|-----|---------|
| `service-completed` | Service done |
| `complaint` | Has open issue (add manually or via survey) |
| `service-issue` | Alias for complaint |
| `issue-resolved` | Complaint closed (add when resolved) |

---

## Notes

- **Google Review Link:** Add Hollie's actual Google review link as a custom value
- **Complaint trigger:** Usually manual (someone flags it) or from survey/feedback form
- **Review tracking:** Optional integration — can skip the "check if review submitted" step if not tracking
