# 📁 01 - Lead Management Workflows

Ready-to-build specs for GHL. Copy/paste the messages directly.

---

## Workflow 1: New Lead - Web Form

**Folder:** 01 - Lead Management
**Workflow Name:** `New Lead - Web Form`
**Status:** Active

### Trigger
- **Type:** Form Submitted
- **Form:** Website Contact Form (or all forms tagged `lead-form`)

### Actions

**1. Add Tag**
- Tag: `lead-web`

**2. Add Tag**
- Tag: `lead-new`

**3. Update Contact Field**
- Lead Source: `Website`

**4. Send SMS** *(immediate)*
```
Hi {{contact.first_name}}! Thanks for reaching out to Mosquito Joe. We'll give you a call shortly to answer any questions and get you scheduled. Talk soon!
```

**5. Internal Notification** *(Email or SMS to sales)*
```
🦟 NEW WEB LEAD

{{contact.first_name}} {{contact.last_name}}
📞 {{contact.phone}}
📧 {{contact.email}}

Submitted: Website Contact Form
```

**6. Wait**
- Duration: 5 minutes

**7. If/Else Condition**
- If: `Call Status` is empty (no outbound call logged)
- Then → Continue to step 8
- Else → End workflow

**8. Send Email**
- Subject: `Your Mosquito-Free Yard Starts Here`
```
Hi {{contact.first_name}},

Thanks for contacting Mosquito Joe of Northwest DFW!

We're excited to help you take back your yard from mosquitoes. Here's what you can expect:

✅ A quick call from our team to learn about your property
✅ A customized treatment plan for your yard
✅ Service that actually works — backed by our satisfaction guarantee

We'll be reaching out shortly, but if you'd like to get started right away, just reply to this email or give us a call at {{location.phone}}.

Talk soon!

The Mosquito Joe Team
{{location.full_address}}
```

**9. Create Task**
- Title: `Follow up with web lead: {{contact.first_name}} {{contact.last_name}}`
- Due: 1 hour from now
- Assign to: Sales rep

---

## Workflow 2: New Lead - Phone Call (First Time Caller)

**Folder:** 01 - Lead Management
**Workflow Name:** `New Lead - Inbound Call`
**Status:** Active

### Trigger
- **Type:** Call Status Changed
- **Filter:** First Time Caller = Yes, Call Direction = Inbound

### Actions

**1. Add Tag**
- Tag: `lead-phone`

**2. Add Tag**
- Tag: `lead-new`

**3. Update Contact Field**
- Lead Source: `Phone Call`

**4. If/Else Condition**
- If: `Call Status` = Missed OR Voicemail
- Then → **Go to Workflow:** `Missed Call - Business Hours` (or After Hours based on time)
- Else → Continue

**5. Wait**
- Duration: 1 hour

**6. If/Else Condition**
- If: `Appointment` exists = No
- Then → Continue
- Else → End workflow

**7. Send SMS**
```
Hi {{contact.first_name}}, thanks for calling Mosquito Joe! Just following up — did you have any questions about protecting your yard? We'd love to help you get scheduled. 🦟
```

---

## Workflow 3: New Lead - Facebook/Google Ad

**Folder:** 01 - Lead Management
**Workflow Name:** `New Lead - Paid Ad`
**Status:** Active

### Trigger
- **Type:** Form Submitted
- **Form:** Facebook Lead Form OR Google Ads Form
- *Alternative:* Contact Tag Added = `fb-lead` or `google-lead`

### Actions

**1. Add Tag**
- Tag: `lead-paid`

**2. Add Tag**
- Tag: `lead-new`

**3. Update Contact Field**
- Lead Source: `Paid Ad`

**4. Send SMS** *(immediate)*
```
Hey {{contact.first_name}}! Thanks for your interest in Mosquito Joe. 🦟 Quick question — are mosquitoes driving you crazy in your backyard or is this for an upcoming event? Reply and let us know!
```

**5. Internal Notification**
```
💰 NEW PAID LEAD

{{contact.first_name}} {{contact.last_name}}
📞 {{contact.phone}}
📧 {{contact.email}}

Source: {{contact.lead_source}}

⚡ HOT LEAD - Call within 5 minutes!
```

**6. Create Task**
- Title: `🔥 CALL NOW: Paid lead {{contact.first_name}}`
- Due: Immediate
- Priority: High
- Assign to: Sales rep

**7. Wait**
- Duration: 2 hours

**8. If/Else Condition**
- If: `Appointment` exists = No AND `Call Status Outbound` = Empty
- Then → Continue
- Else → End workflow

**9. Send SMS**
```
Hi {{contact.first_name}}, just circling back! We'd love to help you get mosquito-free. Got 2 minutes for a quick call? Or if easier, let us know a good time to reach you. 👍
```

**10. Wait**
- Duration: 24 hours

**11. If/Else Condition**
- If: No response AND no appointment
- Then → Add tag `lead-no-response`
- Else → End workflow

---

## Workflow 4: Lead - No Response Follow-up

**Folder:** 01 - Lead Management
**Workflow Name:** `Lead - No Response Nurture`
**Status:** Active

### Trigger
- **Type:** Tag Added
- **Tag:** `lead-no-response`

### Actions

**1. Wait**
- Duration: 1 day

**2. Send SMS**
```
Hey {{contact.first_name}}, still thinking about mosquito control? No pressure — just didn't want you to miss out on enjoying your yard this season. Reply anytime if you have questions!
```

**3. Wait**
- Duration: 2 days

**4. Send Email**
- Subject: `Don't let mosquitoes win 🦟`
```
Hi {{contact.first_name}},

Just wanted to follow up one more time — mosquito season is in full swing and we don't want you to miss out.

Here's what our customers are saying:

⭐⭐⭐⭐⭐
"We can finally use our backyard again! The kids play outside every evening now."
— Sarah M., [City]

⭐⭐⭐⭐⭐
"I was skeptical but WOW. Huge difference after the first treatment."
— Mike R., [City]

Ready to take back your yard? Just reply to this email or call us at {{location.phone}}.

— The Mosquito Joe Team
```

**5. Wait**
- Duration: 4 days

**6. Send SMS** *(Final attempt)*
```
Last check-in, {{contact.first_name}}! 🦟 Want us to reach out when it's a better time? Just reply "LATER" and we'll follow up next month. Or "STOP" and we'll leave you alone. No hard feelings either way!
```

**7. Wait**
- Duration: 7 days

**8. If/Else Condition**
- If: Response received = No AND Appointment = No
- Then → Continue
- Else → End workflow

**9. Remove Tag**
- Tag: `lead-new`

**10. Add Tag**
- Tag: `lead-cold`

**11. Update Contact Field**
- Lead Status: `Cold - No Response`

**12. Add to Long-Term Nurture**
- *Optional:* Move to seasonal re-engagement list

---

## Quick Reference

| Workflow | Trigger | Key Action |
|----------|---------|------------|
| New Lead - Web Form | Form submit | SMS + Email + Task |
| New Lead - Inbound Call | First time caller | Tag + Follow-up if no appt |
| New Lead - Paid Ad | FB/Google form | Immediate SMS + Hot lead alert |
| Lead - No Response | Tag: no-response | 7-day nurture sequence |

---

## Tags Used

| Tag | Meaning |
|-----|---------|
| `lead-new` | Fresh lead, actively being worked |
| `lead-web` | Came from website form |
| `lead-phone` | Came from inbound call |
| `lead-paid` | Came from paid ad |
| `lead-no-response` | No reply after initial outreach |
| `lead-cold` | Nurture complete, no conversion |

---

## Notes for Building

1. **Customize {{location.phone}}** — Set to Hollie's business number
2. **Customize city names** in testimonials
3. **Internal notifications** — Set to Hollie's email/phone
4. **Task assignments** — Assign to Hollie or her team member
5. **Forms** — Connect to whatever forms she's using (website, FB, etc.)
