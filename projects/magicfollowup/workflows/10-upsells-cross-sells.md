# 📁 10 - Upsells & Cross-Sells (Simplified)

3 workflows for expanding customer value.

---

## Workflow 1: Misting System Upsell

**Handles:** Pitch misting systems to recurring treatment customers

### Trigger
- **Type:** Tag Added: `upsell-misting-candidate`
- **Or:** After 3rd recurring treatment completed

### Actions

**1. Wait:** 1 day after service

**2. Send SMS**
```
Hey {{contact.first_name}}! Quick thought — ever considered a misting system? It's like having Mosquito Joe protection 24/7, automatically. Want Lee to swing by for a free estimate?
```

**3. Wait:** 5 days

**4. If/Else:** Response or appointment booked?
- Yes → End
- No → Continue

**5. Send Email**
- Subject: `What if You Never Had to Schedule Again?`
```
Hi {{contact.first_name}},

Love your mosquito treatments? Imagine never having to schedule them again.

With a misting system, your yard gets automatic protection — set it and forget it. The system runs on a timer, releasing a fine mist that keeps mosquitoes away 24/7.

✅ No scheduling hassles
✅ Year-round protection
✅ Perfect for entertaining

Curious? Reply for a free, no-obligation estimate. Lee will walk your property and show you exactly how it would work.

— Mosquito Joe Team
```

**6. Add Tag:** `misting-upsell-sent`

---

## Workflow 2: Additional Services (Ticks/Fleas)

**Handles:** Cross-sell tick & flea treatment

### Trigger
- **Type:** Service completed (standard mosquito treatment)
- **Filter:** Does NOT have tick/flea service

### Actions

**1. Wait:** 2 days

**2. Send SMS**
```
Hey {{contact.first_name}}, did you know we also treat for ticks and fleas? Great if you've got pets or kids playing in the yard. Want to add it to your plan? Reply for details!
```

**3. Wait:** 7 days

**4. If/Else:** Response?
- Yes → End
- No → Add tag `tick-flea-offered` *(don't repeat)*

---

## Workflow 3: Event Treatment Promo

**Handles:** One-time treatment for parties/events

### Trigger
- **Type:** Seasonal (May-September) or Manual
- **Audience:** All contacts, especially leads who didn't convert to recurring

### Actions

**1. Send SMS**
```
Hosting an outdoor party this summer? 🎉 We do one-time event treatments — mosquito-free guarantee for your big day! Reply for pricing.
```

**2. Wait:** 3 days

**3. Send Email**
- Subject: `Mosquito-Free Events`
```
Hi {{contact.first_name}},

Planning a backyard party, wedding, or BBQ?

Don't let mosquitoes crash it. We offer one-time event treatments that keep your guests bite-free all night.

🎉 Graduation parties
🎉 Weddings & receptions
🎉 BBQs & cookouts
🎉 Outdoor birthdays

Just tell us the date and we'll treat your yard 24-48 hours before. Easy!

Reply or call {{location.phone}} to book.

— Mosquito Joe Team
```

---

## Summary

| Workflow Title | Trigger | Upsell |
|----------------|---------|--------|
| **Misting System Upsell** | After 3rd treatment or manual tag | Recurring → Misting system |
| **Additional Services** | Post-service | Add tick/flea treatment |
| **Event Treatment Promo** | Seasonal / manual | One-time event treatment |

---

## Tags

| Tag | Meaning |
|-----|---------|
| `upsell-misting-candidate` | Good fit for misting pitch |
| `misting-upsell-sent` | Already received misting pitch |
| `tick-flea-offered` | Already offered tick/flea add-on |
| `event-inquiry` | Interested in event treatment |

---

## Notes

- **Misting timing:** After 3rd treatment = they're committed, good time to pitch upgrade
- **Tick/flea:** Only send to customers who don't already have it
- **Event promo:** Run May-September, especially around graduation/wedding season
