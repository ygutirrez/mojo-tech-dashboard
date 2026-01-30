# ManyChat Flows for Mosquito Joe Miami

## Flow 1: Comment-to-DM (Lead Magnet)

### Trigger
User comments a **keyword** on an Instagram post

### Keywords to Set Up
- `QUOTE` — Free estimate
- `MOSQUITO` — General info + offer
- `MISTING` — Misting system info
- `EVENT` — Event/party spray info

---

### Flow: "QUOTE" Keyword

**Post Caption Example:**
> 🦟 Tired of mosquitoes ruining your backyard?
>
> Comment "QUOTE" and I'll send you a link to get a FREE estimate for your Miami home!
>
> We've helped 10,000+ Miami families take back their yards. You're next. 👇

**DM Sequence:**

```
[Immediate - Message 1]
Hey {{first_name}}! 👋

Thanks for reaching out about mosquito control!

Quick question — what's your biggest mosquito problem right now?

[Quick Reply Buttons]
• 🏡 Backyard is unusable
• 🎉 Have an event coming up
• 🦟 Just want them gone
• 💡 Interested in misting system
```

```
[After Button Click - Message 2]

OPTION A: "Backyard is unusable"
-------
Ugh, I hear you! Miami mosquitoes are brutal 😤

Good news — our barrier spray keeps them away for 21 days, guaranteed.

Here's your free quote link:
👉 [GHL BOOKING LINK]

Takes 30 seconds. We'll text you a quote within the hour!

OPTION B: "Have an event coming up"
-------
Nice! We do event sprays all the time — weddings, quinces, BBQs, you name it.

When's your event? We can spray 24-48 hours before and your guests won't see a single mosquito.

👉 [GHL EVENT BOOKING LINK]

OPTION C: "Just want them gone"
-------
I got you! We service all of Miami-Dade.

Our barrier spray lasts 21 days and we guarantee it works — or we come back free.

Get your free quote here:
👉 [GHL BOOKING LINK]

OPTION D: "Interested in misting system"
-------
Smart! Misting systems are the ultimate solution — automated mosquito control 24/7.

I'll have our misting specialist reach out. In the meantime, check this out:
👉 [MISTING INFO PAGE]

What's your address? I'll make sure we can service your area.
```

```
[Follow-up - 24 hours later if no booking]

Hey {{first_name}}! Just checking in 👋

Did you get a chance to grab your free quote?

Here's the link again: [GHL BOOKING LINK]

Or just reply here if you have any questions — I'm happy to help!
```

---

## Flow 2: New Follower Welcome

### Trigger
User follows @MosquitoJoeMiami on Instagram

**DM Sequence:**

```
[Immediate - Message 1]
Hey {{first_name}}! 👋

Thanks for following Mosquito Joe Miami! 🦟💨

Since you're new here, I want to hook you up:

🎁 Use code NEWFOLLOWER for $25 off your first service!

Ready to get a quote?
👉 [GHL BOOKING LINK]

Or just reply with any questions — I'm here!
```

```
[If they reply with a question]
→ Route to Live Chat or auto-respond based on keywords
```

---

## Flow 3: Story Reply Automation

### Trigger
User replies to any Instagram Story

**DM Response:**

```
[Immediate]
Hey! Thanks for watching 👀

Were you interested in learning more about our mosquito control services?

[Quick Reply Buttons]
• ✅ Yes, get me a quote!
• ❓ Just had a question
• 👋 Just saying hi!
```

```
[If "Yes, get me a quote!"]
Awesome! Here's your free quote link:
👉 [GHL BOOKING LINK]

Takes 30 seconds and we'll text you a quote within the hour!
```

```
[If "Just had a question"]
No problem! What's on your mind?

[Route to Live Chat]
```

```
[If "Just saying hi!"]
Hey! 👋 Appreciate you!

If you ever need mosquito help, just DM us "QUOTE" and we'll hook you up!
```

---

## Flow 4: Misting System Inquiry

### Trigger
Keyword: `MISTING`, `MIST`, `SYSTEM`

**DM Sequence:**

```
[Immediate - Message 1]
Hey {{first_name}}! 👋

Interested in a misting system? Great choice — it's the ultimate mosquito solution!

Quick question: What type of property?

[Quick Reply Buttons]
• 🏡 Residential
• 🏢 Commercial
• 🎉 Event venue
```

```
[After Selection - Message 2]
Perfect!

Our misting systems:
✅ Automated — sprays on a schedule
✅ Odorless & safe for pets/kids
✅ Covers up to 1 acre
✅ Financing available

Want a free misting consultation?
👉 [GHL MISTING BOOKING LINK]

Or reply with your address and I'll have our specialist call you today!
```

---

## Flow 5: Event/Party Spray

### Trigger
Keywords: `EVENT`, `PARTY`, `WEDDING`, `BBQ`, `QUINCE`

**DM Sequence:**

```
[Immediate - Message 1]
Hey {{first_name}}! 🎉

Planning an outdoor event? Smart to think about mosquitoes!

We do event sprays for:
• Weddings
• Quinceañeras
• Birthday parties
• Corporate events
• BBQs & cookouts

When's your event?

[Quick Reply Buttons]
• 📅 This week
• 📅 Next 2 weeks
• 📅 Next month
• 📅 Just planning ahead
```

```
[After Selection - Message 2]
Perfect! We spray 24-48 hours before your event and GUARANTEE no mosquitoes bother your guests.

Event spray pricing starts at $149 depending on yard size.

Book your event spray here:
👉 [GHL EVENT BOOKING LINK]

Or tell me more about your event and I'll get you an exact quote!
```

---

## Integration: ManyChat → GHL

### How to Connect

1. **In ManyChat:** Use "External Request" action
2. **Send to GHL webhook** when user:
   - Clicks booking link
   - Provides contact info
   - Completes a flow

### Data to Pass to GHL
- First name
- Instagram handle
- Phone (if collected)
- Lead source: "ManyChat - [Flow Name]"
- Interest: (quote/misting/event)

### GHL Automation
- Tag lead based on source
- Trigger SMS follow-up
- Add to appropriate pipeline

---

## Content Ideas for Comment-to-DM Posts

### Post 1: General Quote
> 🦟 Miami mosquitoes are NO JOKE this year.
>
> If your backyard has become a no-go zone, comment "QUOTE" and I'll send you a link for a FREE estimate.
>
> We guarantee results or we come back free. 💪

### Post 2: Misting System
> This is what $0 in mosquito stress looks like 👆
>
> Our automated misting systems spray on a schedule so you never think about mosquitoes again.
>
> Comment "MISTING" to learn more!

### Post 3: Event Spray
> Planning an outdoor wedding? Quinceañera? BBQ?
>
> Don't let mosquitoes crash your party 🦟🚫
>
> Comment "EVENT" and I'll send you our event spray info!

### Post 4: Seasonal
> It's [MONTH] in Miami and the mosquitoes are THRIVING ☀️🦟
>
> But you don't have to suffer.
>
> Comment "QUOTE" for a free estimate — we'll have you mosquito-free in 48 hours!

---

## Metrics to Track

- Comments per post
- DM conversations started
- Click-through to booking link
- Leads captured
- Conversion to booked service
- Cost per lead (if boosting posts)

---

## Make.com Automation: IG Post → GHL Workflow

### Scenario Created
**Name:** MoJo IG Post → GHL Workflow  
**URL:** https://us1.make.com/82813/scenarios/4524080/edit  
**Status:** Draft (needs connection configuration)

### What's Built
- ✅ Instagram for Business "Watch events" trigger module added
- ⏳ Needs: Instagram connection + event type selection
- ⏳ Needs: HTTP/Webhook module to call GHL workflow

### To Complete (2-3 minutes)

#### Step 1: Configure Instagram Trigger
1. Click on the **pink Instagram module** in the canvas
2. Click **Create a connection** (or select existing Facebook/IG connection)
3. Follow OAuth flow to connect your Facebook Business account
4. Select **Mosquito Joe Miami** Instagram page
5. Set Event type: **"Media" → "New media"** (triggers on new posts)

#### Step 2: Add HTTP Module for GHL
1. Click the **small + icon** next to the Instagram module
2. Search for **"HTTP"** → select **"Make a request"**
3. Configure:
   - **URL:** Your GHL workflow webhook URL
   - **Method:** POST
   - **Body type:** JSON
   - **Body content:**
   ```json
   {
     "event": "new_ig_post",
     "media_id": "{{1.id}}",
     "media_url": "{{1.media_url}}",
     "permalink": "{{1.permalink}}",
     "caption": "{{1.caption}}",
     "timestamp": "{{1.timestamp}}"
   }
   ```

#### Step 3: GHL Workflow Setup
In GoHighLevel:
1. Create a new Workflow
2. Add trigger: **Webhook / Inbound Webhook**
3. Copy the webhook URL
4. Paste into Make.com HTTP module
5. Add actions:
   - Parse JSON data
   - Create/update contact (if needed)
   - Send internal notification
   - Add to pipeline or tag

#### Step 4: Test & Activate
1. In Make.com: Click **"Run once"** to test
2. Create a test post on Instagram
3. Verify data flows to GHL
4. Turn on the scenario schedule (every 15 min or instant)

### Alternative: Direct GHL Instagram Integration
GHL has native Instagram DM integration that might be simpler:
1. Go to **Settings → Integrations → Facebook & Instagram**
2. Connect your Facebook Business account
3. GHL will sync Instagram DMs automatically

The Make.com approach gives you more control (trigger on posts, not just DMs).

---

## Next Steps

1. [ ] Log into ManyChat and connect Instagram
2. [ ] Build "QUOTE" keyword flow first
3. [ ] Create GHL webhook for lead capture
4. [ ] **Complete Make.com scenario configuration** (link above)
5. [ ] Test with a real post
6. [ ] Monitor and optimize
