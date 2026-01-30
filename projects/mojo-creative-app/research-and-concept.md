# MoJo Creative App
## Research & Product Concept

*Created by MoJoe | January 30, 2026*

---

## Executive Summary

A SaaS platform for Mosquito Joe franchisees to generate on-brand social media content using AI. The app would let franchisees select their market, season, and content type, then generate graphics and copy that match MoJo's brand guidelines — no design skills required.

**Target Users:** 400+ Mosquito Joe franchise locations
**Problem:** Franchisees struggle to create consistent, professional social media content
**Solution:** AI-powered content generator with brand guardrails and regional customization

---

## Part 1: Competitive Research

### Existing AI Content Tools

| Tool | Strength | Weakness | Pricing |
|------|----------|----------|---------|
| **Canva Magic Studio** | Easy UI, templates | Generic, not brand-locked | $13/mo (Pro) |
| **Adobe Firefly** | High quality images | Learning curve, expensive | $5-23/mo |
| **Jasper AI** | Great copy generation | No image gen, expensive | $49-125/mo |
| **Copy.ai** | Fast text content | Limited customization | $49/mo |
| **Lately.ai** | Social-specific | Enterprise pricing | Custom |
| **Predis.ai** | Social content focus | Generic templates | $29-149/mo |

### AI Image Generation APIs (For Building Custom)

| Provider | Model | Cost per Image | Quality |
|----------|-------|----------------|---------|
| **OpenAI GPT-image-1.5** | DALL-E 4 | ~$0.04-0.17/image | Excellent |
| **OpenAI GPT-image-1-mini** | DALL-E 3 Mini | ~$0.02-0.08/image | Good |
| **Stability AI** | SDXL/SD3 | ~$0.02-0.06/image | Good |
| **Replicate (Flux)** | Flux Pro | ~$0.05/image | Excellent |
| **Midjourney API** | MJ v6 | ~$0.05-0.10/image | Excellent |
| **Ideogram** | Ideogram 2.0 | ~$0.08/image | Great for text |

### Text Generation APIs

| Provider | Model | Cost per 1K tokens | Notes |
|----------|-------|-------------------|-------|
| **OpenAI GPT-5-mini** | Best value | $0.25 in / $2.00 out | Recommended |
| **OpenAI GPT-4.1-mini** | Good balance | $0.40 in / $1.60 out | Alternative |
| **Anthropic Claude** | High quality | $0.25 in / $1.25 out | Good option |
| **Google Gemini** | Fast | $0.075 in / $0.30 out | Budget option |

---

## Part 2: MoJo Brand Analysis

### Brand Colors
- **Primary Green:** #7AB547 (lime/grass green)
- **Secondary:** White, Dark Gray
- **Accent:** Yellow (for promotions)

### Brand Voice
- Friendly, approachable
- Playful but professional ("Make Your Yard the Place to Be")
- Family-focused, pet-friendly messaging
- Local community emphasis

### Content Categories (from corporate)
1. **Service Promotions** - $X Off, seasonal specials
2. **Educational** - Mosquito facts, tick awareness, tips
3. **Lifestyle** - Backyard enjoyment, outdoor living
4. **Seasonal** - Spring kickoff, summer parties, fall prep
5. **Testimonials** - Customer reviews, before/after
6. **Community** - Local events, sponsorships
7. **Holiday** - Memorial Day, July 4th, Labor Day

### Regional Considerations
| Region | Considerations |
|--------|---------------|
| **South (FL, TX, LA)** | Year-round season, no snow content, humidity focus |
| **Northeast** | Seasonal (Apr-Oct), tick emphasis, fall prep |
| **Midwest** | Seasonal, lake/outdoor recreation focus |
| **West Coast** | Drought messaging, outdoor dining emphasis |
| **Mountain** | Shorter season, altitude/camping content |

---

## Part 3: Product Concept

### App Name Ideas
- **MoJo Studio**
- **BuzzCreate**
- **MoJo Creative Hub**
- **Spray & Share** (playful)
- **The MoJo Content Lab**

### Core Features

#### 1. Content Generator
```
User selects:
├── Content Type (Post, Story, Reel cover, Ad)
├── Category (Promo, Educational, Lifestyle, etc.)
├── Region/Climate (affects imagery and messaging)
├── Season (or auto-detect)
├── Tone (Playful, Professional, Urgent)
└── Include offer? (Yes/No + offer details)

Output:
├── 3-5 image variations
├── 3-5 caption options
├── Hashtag suggestions
└── Best posting times
```

#### 2. Brand Asset Library
- Pre-approved templates
- MoJo logos (various formats)
- Stock photos (licensed, on-brand)
- Icon library
- Color palette enforcement

#### 3. Content Calendar
- Suggested posting schedule
- Pre-built seasonal campaigns
- National awareness days (Earth Day, etc.)
- Auto-schedule to social platforms (later phase)

#### 4. Customization
- Add franchise location name/logo
- Local phone number overlay
- Service area customization
- Price/offer customization

### User Flow
```
1. Login (franchise credentials)
2. Dashboard: Quick Create / Calendar / Library
3. Quick Create:
   a. Select content type
   b. Choose category + inputs
   c. Generate (3-5 options)
   d. Edit/customize if needed
   e. Download or schedule
4. Usage tracked per franchise
```

---

## Part 4: Technical Architecture

### Recommended Stack

**Frontend:**
- Next.js 14 (React)
- Tailwind CSS
- Hosted on Vercel

**Backend:**
- Next.js API routes (or separate Node.js)
- PostgreSQL (Supabase or PlanetScale)
- Redis for caching

**AI Services:**
- **Images:** OpenAI GPT-image-1-mini (best cost/quality)
- **Text:** OpenAI GPT-5-mini (fast, cheap, good)
- **Fallback:** Replicate Flux for specific styles

**Auth & Billing:**
- Clerk or Auth0 (franchise SSO potential)
- Stripe for subscriptions

### API Flow
```
User Request → Validate Auth → Check Usage Limits
    ↓
Build Prompt (brand guidelines + user inputs)
    ↓
Call AI APIs (parallel: image + text)
    ↓
Post-process (add logo, format for platform)
    ↓
Return results → Log usage → Update billing
```

---

## Part 5: Cost Analysis

### Per-Content Generation Cost

**Scenario: Generate 1 social post (1 image + caption)**

| Component | Cost |
|-----------|------|
| Image generation (GPT-image-1-mini, medium) | $0.04 |
| Text generation (~500 tokens) | $0.001 |
| Hosting/bandwidth (amortized) | $0.005 |
| **Total per generation** | **~$0.05** |

**With 3 variations per request:** ~$0.15/request

### Monthly Usage Estimates (per franchise)

| Usage Level | Generations/mo | AI Cost | 
|-------------|----------------|---------|
| Light | 20 | $3.00 |
| Medium | 50 | $7.50 |
| Heavy | 100 | $15.00 |

### Pricing Strategy

**Option A: Flat Rate**
| Tier | Price | Generations | Margin |
|------|-------|-------------|--------|
| Basic | $29/mo | 30 | ~75% |
| Pro | $49/mo | 75 | ~80% |
| Unlimited | $99/mo | 200 | ~70% |

**Option B: Credit-Based**
- $0.50 per generation (3x markup)
- Buy credits in packs ($25 = 50 credits)
- Rollover unused credits

**Recommendation:** Start with **Option A (Flat Rate)** — easier for franchisees to budget, predictable revenue for you.

---

## Part 6: Revenue Projections

### Conservative Scenario
- **Target:** 50 franchises in Year 1 (12% of ~400)
- **Avg subscription:** $39/mo
- **Monthly revenue:** $1,950
- **Annual revenue:** $23,400
- **AI costs (~20%):** $4,680
- **Net after AI:** $18,720

### Optimistic Scenario
- **Target:** 150 franchises in Year 2
- **Avg subscription:** $49/mo
- **Monthly revenue:** $7,350
- **Annual revenue:** $88,200
- **AI costs (~20%):** $17,640
- **Net after AI:** $70,560

### Additional Revenue Opportunities
1. **White-label for other Neighborly brands** (Mr. Rooter, Glass Doctor, etc.)
2. **Premium templates/campaigns** (one-time purchases)
3. **Done-for-you content packages** (managed service tier)
4. **Affiliate revenue** from social scheduling tools

---

## Part 7: MVP Scope

### Phase 1 MVP (4-6 weeks)
- [ ] User auth (email/password)
- [ ] Single content type (Instagram post)
- [ ] 3 categories (Promo, Educational, Lifestyle)
- [ ] Region selector (5 regions)
- [ ] Generate 3 image variations + 3 captions
- [ ] Download images
- [ ] Basic usage tracking
- [ ] Stripe subscription (1 tier: $39/mo)

### Phase 2 (Months 2-3)
- [ ] More content types (Stories, Facebook, Reels)
- [ ] Content calendar
- [ ] Asset library
- [ ] Multiple subscription tiers
- [ ] Usage analytics dashboard

### Phase 3 (Months 4-6)
- [ ] Social platform integration (Buffer/Later API)
- [ ] Franchise performance benchmarking
- [ ] A/B testing suggestions
- [ ] Corporate admin dashboard
- [ ] White-label readiness

---

## Part 8: Prompt Engineering

### Sample Image Prompt Template
```
Create a social media graphic for a mosquito control company.

Brand: Mosquito Joe
Style: Friendly, professional, clean
Colors: Primary green (#7AB547), white background
Include: {service_type} messaging

Scene: {scene_description}
Season: {season}
Region: {region_climate_notes}

Text overlay: "{headline}"

Requirements:
- Family-friendly imagery
- Outdoor/backyard setting
- No scary insects (friendly approach)
- Professional but approachable
- Include space for logo placement (bottom right)
```

### Sample Caption Prompt Template
```
Write 3 Instagram captions for a Mosquito Joe franchise post.

Content type: {content_type}
Topic: {topic}
Offer (if any): {offer_details}
Location: {city}, {state}
Season: {season}
Tone: Friendly, local, family-focused

Requirements:
- Under 150 words
- Include 1-2 relevant emojis
- End with clear CTA
- Include local reference when possible
- Suggest 5-7 hashtags

Output format:
Caption 1: ...
Caption 2: ...
Caption 3: ...
Hashtags: ...
```

---

## Part 9: Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| AI generates off-brand content | Medium | High | Strong prompts, review queue, brand guidelines fine-tuning |
| Franchise adoption low | Medium | High | Pilot with 5-10 franchises, get testimonials, corporate endorsement |
| AI costs spike | Low | Medium | Usage caps, caching popular content, negotiate volume pricing |
| Corporate pushback | Low | High | Position as supporting (not replacing) corporate marketing |
| Competition from corporate | Medium | High | Move fast, prove value, offer to white-label to them |

---

## Part 10: Next Steps

### Immediate (This Week)
1. [ ] Review this concept with Yoel
2. [ ] Identify 3-5 pilot franchises
3. [ ] Get corporate brand guidelines (official)
4. [ ] Set up OpenAI API account with billing

### Short-term (Next 2 Weeks)
1. [ ] Build proof-of-concept (single page, one content type)
2. [ ] Generate 20 sample posts across categories
3. [ ] Get feedback from pilot franchises
4. [ ] Refine prompts based on feedback

### Medium-term (Month 1-2)
1. [ ] Build full MVP
2. [ ] Beta test with 5 franchises
3. [ ] Iterate based on feedback
4. [ ] Launch to broader franchise network

---

## Appendix: Similar Products for Reference

1. **Marq (formerly Lucidpress)** - Brand templating for franchises
2. **Canva for Teams** - Collaborative design with brand kits
3. **Lately.ai** - AI social content from long-form
4. **Jasper Art + Jasper AI** - Combo image + text generation
5. **AdCreative.ai** - AI ad creative generation
6. **Designs.ai** - Full creative suite with AI

---

## Questions for Yoel

1. **Corporate buy-in:** Should we pitch this to MoJo corporate first, or build it independently?
2. **Pilot franchises:** Who are 3-5 franchisees who'd test this?
3. **Pricing preference:** Flat rate ($29-99/mo) or credit-based ($0.50/generation)?
4. **Build vs. Partner:** Build from scratch or white-label existing tool (Canva, etc.)?
5. **Timeline:** When do you want to launch MVP?

---

*Research complete. Ready to build when you give the green light.*
