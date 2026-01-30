# MoJo Franchisee Automation Templates

Organized folder structure for GHL workflows. Build these as a starter kit for franchisees.

---

## 📁 01 - Lead Management

### New Lead - Web Form
**Trigger:** Form submitted (website contact form)
**Actions:**
- Add tag: `lead-web`
- Send SMS: "Thanks for reaching out to Mosquito Joe! We'll call you shortly to schedule your free quote."
- Send internal notification to sales
- Wait 5 min → If no call made, send email with service info

### New Lead - Phone Call
**Trigger:** Inbound call (first time caller)
**Actions:**
- Create contact if new
- Add tag: `lead-phone`
- If missed → trigger "Missed Call" workflow

### New Lead - Facebook/Google Ad
**Trigger:** Form submitted (ad lead form)
**Actions:**
- Add tag: `lead-paid`
- Send SMS: "Hey {{contact.first_name}}! Thanks for your interest in Mosquito Joe. When's a good time for a quick call?"
- Wait 2 hours → Send follow-up if no response
- Assign to sales rep

### Lead - No Response Follow-up
**Trigger:** Tag added: `lead-no-response`
**Actions:**
- Day 1: SMS reminder
- Day 3: Email with value prop + testimonials
- Day 7: Final SMS ("Still interested? Reply YES for a callback")
- Day 14: Add to long-term nurture or mark dead

---

## 📁 02 - Appointments

### Appointment Booked - Confirmation
**Trigger:** Appointment created
**Actions:**
- Send SMS: "You're scheduled! {{appointment.date}} at {{appointment.time}}. Reply C to confirm or R to reschedule."
- Send email with confirmation details + what to expect

### Appointment Reminder - 24 Hours
**Trigger:** 24 hours before appointment
**Actions:**
- Send SMS: "Reminder: Mosquito Joe is coming tomorrow at {{appointment.time}}. Please make sure gates are unlocked. See you then!"

### Appointment Reminder - 1 Hour
**Trigger:** 1 hour before appointment
**Actions:**
- Send SMS: "Our tech is on the way! Should arrive within the hour. 🦟"

### Appointment - No Show / Cancelled
**Trigger:** Appointment status = No Show or Cancelled
**Actions:**
- Send SMS: "We missed you today! Want to reschedule? Reply with a day that works."
- Wait 2 days → Follow-up call task for sales

### Appointment - Rescheduled
**Trigger:** Appointment rescheduled
**Actions:**
- Send SMS: "Got it! You're now scheduled for {{appointment.date}} at {{appointment.time}}."

---

## 📁 03 - Service & Fulfillment

### Service Completed - Thank You
**Trigger:** Appointment status = Completed (or manual tag)
**Actions:**
- Wait 2 hours
- Send SMS: "Thanks for choosing Mosquito Joe! Your yard is now protected. Questions? Just reply to this text."

### Service Completed - Review Request
**Trigger:** 24 hours after service completion
**Actions:**
- Send SMS: "How was your service? We'd love a quick review! {{google_review_link}}"
- Wait 3 days → If no review, send email follow-up
- Wait 7 days → Final ask via SMS

### Service Issue - Complaint Received
**Trigger:** Tag added: `complaint` or negative survey response
**Actions:**
- Send internal alert to manager (HIGH PRIORITY)
- Send SMS to customer: "We're sorry to hear that. A manager will reach out within 2 hours to make this right."
- Create task: Follow-up call within 2 hours

---

## 📁 04 - Payments & Billing

### Invoice Sent - Text2Pay
**Trigger:** Invoice created
**Actions:**
- Send SMS with payment link: "Hi {{contact.first_name}}, here's your invoice from Mosquito Joe: {{invoice.link}} - Thanks!"
- Wait 3 days → If unpaid, send reminder
- Wait 7 days → Second reminder + email
- Wait 14 days → Internal alert for collections follow-up

### Payment Received - Confirmation
**Trigger:** Payment received
**Actions:**
- Send SMS: "Payment received - thank you! 🙌"
- Remove any "past due" tags

### Payment Failed - Retry Notice
**Trigger:** Payment failed
**Actions:**
- Send SMS: "Heads up - your payment didn't go through. Please update your card here: {{payment_link}}"
- Wait 2 days → Follow-up if still failed

---

## 📁 05 - Recurring / Subscription Customers

### Subscription - Welcome Sequence
**Trigger:** Tag added: `subscription-active`
**Actions:**
- Send welcome email (what to expect, service schedule)
- Day 3: SMS "Any questions about your mosquito protection plan? We're here!"
- Day 7: Email with referral offer

### Subscription - Next Service Reminder
**Trigger:** 3 days before scheduled recurring service
**Actions:**
- Send SMS: "Your next Mosquito Joe treatment is scheduled for {{date}}. Gates unlocked? 👍"

### Subscription - Renewal Coming Up
**Trigger:** 30 days before subscription renewal
**Actions:**
- Send email: "Your protection plan renews on {{date}}. No action needed - we've got you covered!"
- If annual: Include early renewal discount offer

### Subscription - Cancellation Request
**Trigger:** Tag added: `cancel-request`
**Actions:**
- Internal alert to retention team
- Send SMS: "We're sorry to see you go. Mind sharing why? We'd love a chance to make it right."
- Create task: Retention call within 24 hours

### Subscription - Win-Back (Cancelled)
**Trigger:** 30 days after cancellation
**Actions:**
- Send email: "We miss you! Come back and get 20% off your first treatment."
- Day 60: Final SMS offer
- If no response: Add to seasonal re-engagement list

---

## 📁 06 - Seasonal Campaigns

### Spring Kickoff
**Trigger:** Manual or scheduled (March)
**Actions:**
- Email to all past customers: "Mosquito season is coming. Book your first treatment now!"
- SMS to hot leads from last year
- Segment: Prioritize lapsed customers

### Summer Push
**Trigger:** Manual or scheduled (June)
**Actions:**
- Email: "Peak mosquito season is here - are you protected?"
- Target: Leads who didn't convert in spring

### Fall Reminder
**Trigger:** Manual or scheduled (September)
**Actions:**
- Email to active customers: "Keep your yard protected through fall"
- Upsell: Misting systems or extended coverage

### Winter Dormancy / Re-engagement
**Trigger:** Manual or scheduled (December)
**Actions:**
- Email: "Thanks for a great year! Early bird pricing for next season..."
- Collect pre-bookings for spring

---

## 📁 07 - Referrals & Reviews

### Referral Program - Invitation
**Trigger:** 7 days after first completed service
**Actions:**
- Send email: "Love Mosquito Joe? Refer a friend, you both get $50!"
- Include referral link/code

### Referral - Friend Signed Up
**Trigger:** Referral code used
**Actions:**
- Notify original customer: "Your friend signed up! Your $50 credit is on the way."
- Add credit to both accounts
- Send thank you to new customer

### Review - Positive Received
**Trigger:** 5-star review detected (or positive survey)
**Actions:**
- Send SMS: "Thanks for the awesome review! You made our day. 🦟💚"
- Add tag: `advocate`
- Add to referral program if not already

### Review - Negative Received
**Trigger:** 1-3 star review or negative survey
**Actions:**
- Internal alert IMMEDIATELY
- Do NOT auto-respond publicly
- Create task: Manager outreach within 2 hours

---

## 📁 08 - Missed Calls & After Hours

### Missed Call - Business Hours
**Trigger:** Missed inbound call during business hours
**Actions:**
- Send SMS (immediate): "Sorry we missed your call! How can we help? Reply here or we'll call you back shortly."
- Create task: Return call within 15 min
- If no callback in 30 min → escalate

### Missed Call - After Hours
**Trigger:** Missed inbound call outside business hours
**Actions:**
- Send SMS: "Thanks for calling Mosquito Joe! We're closed now but will call you back first thing tomorrow. Need something urgent? Reply here."
- Route to Voice AI (if enabled)
- Create task: First call tomorrow AM

### Voice AI - Appointment Booked
**Trigger:** Voice AI books appointment
**Actions:**
- Send confirmation SMS to customer
- Internal notification: "Voice AI booked an appointment for {{contact.name}}"

### Voice AI - Message Taken
**Trigger:** Voice AI takes message (didn't book)
**Actions:**
- Create task: Follow-up call
- Internal SMS with message summary

---

## 📁 09 - Upsells & Cross-Sells

### Upsell - Misting System
**Trigger:** After 3rd recurring service (or tag: `upsell-candidate`)
**Actions:**
- Send email: "Love being mosquito-free? Make it permanent with a misting system."
- Include before/after, testimonials
- Wait 7 days → Follow-up SMS if interested

### Upsell - Additional Services
**Trigger:** Service completed (standard treatment)
**Actions:**
- Wait 1 day
- Send email: "Did you know we also treat for ticks and fleas? Add it to your plan!"

### Event Treatment - One-Time
**Trigger:** Tag added: `event-inquiry`
**Actions:**
- Send info package: Pricing, what's included, booking link
- Wait 2 days → Follow-up call if no booking

---

## 📁 10 - Internal / Admin

### New Customer - Onboarding Checklist
**Trigger:** First appointment completed
**Actions:**
- Add tag: `customer-active`
- Update lifecycle stage
- Add to appropriate nurture sequence
- Create task: 30-day check-in call

### Customer Anniversary
**Trigger:** 1 year since first service
**Actions:**
- Send email: "Happy anniversary! Thanks for a year of trusting Mosquito Joe."
- Include loyalty offer or gift

### Stale Lead - Cleanup
**Trigger:** No activity in 90 days + status = Lead
**Actions:**
- Send final SMS: "Still interested in mosquito control? Reply YES or we'll close out your file."
- Wait 7 days → If no reply, mark as Dead Lead

---

## Folder Summary

| Folder | # of Workflows | Priority |
|--------|----------------|----------|
| 01 - Lead Management | 4 | 🔴 High |
| 02 - Appointments | 5 | 🔴 High |
| 03 - Service & Fulfillment | 3 | 🔴 High |
| 04 - Payments & Billing | 3 | 🔴 High |
| 05 - Recurring Customers | 5 | 🟡 Medium |
| 06 - Seasonal Campaigns | 4 | 🟡 Medium |
| 07 - Referrals & Reviews | 4 | 🟡 Medium |
| 08 - Missed Calls | 4 | 🔴 High |
| 09 - Upsells | 3 | 🟢 Low |
| 10 - Internal / Admin | 3 | 🟢 Low |

**Total: 38 workflows**

---

## Build Order (Recommended)

**Phase 1 - Go Live Essentials:**
1. Missed Call - Business Hours
2. Missed Call - After Hours
3. Appointment Booked - Confirmation
4. Appointment Reminder - 24 Hours
5. Service Completed - Review Request
6. Invoice Sent - Text2Pay

**Phase 2 - Lead & Customer Management:**
7. New Lead - Web Form
8. New Lead - Phone Call
9. Lead - No Response Follow-up
10. Payment Received - Confirmation

**Phase 3 - Retention & Growth:**
11. Subscription workflows
12. Referral program
13. Seasonal campaigns
14. Upsells
