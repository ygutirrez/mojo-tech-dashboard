# MoJo Creative App

AI-powered social media content generator for Mosquito Joe franchisees.

## Features

- **Content Categories**: Promo, Educational, Lifestyle
- **Regional Customization**: South, Northeast, Midwest, West Coast, Mountain
- **Seasonal Context**: Auto-detects current season or manual override
- **AI Generation**: 
  - 3 image variations via OpenAI GPT-image-1
  - 3 caption variations with hashtags via GPT-4o-mini
- **Easy Downloads**: One-click image downloads and caption copying

## Quick Start

1. **Set up your OpenAI API key:**
   ```bash
   # Edit .env.local and add your key
   OPENAI_API_KEY=sk-your-key-here
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3001](http://localhost:3001)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (gpt-image-1 + gpt-4o-mini)
- **Language**: TypeScript

## Brand Colors

- Primary Green: `#7AB547`
- Dark Green: `#5A9A2A`
- Light Green: `#9ACD6B`

## Project Structure

```
src/
├── app/
│   ├── api/generate/     # OpenAI API integration
│   ├── globals.css       # Tailwind + custom styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page component
└── components/
    ├── ContentGenerator.tsx  # Form for selecting options
    ├── Header.tsx           # App header
    └── ResultsDisplay.tsx   # Generated content display
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key |

## Cost Estimate

Per generation (3 images + 3 captions):
- Images: ~$0.12 (3 × $0.04 each)
- Captions: ~$0.001
- **Total: ~$0.12 per request**

## Next Steps (Future Enhancements)

- [ ] Add logo/watermark overlay
- [ ] Social media scheduling integration
- [ ] Content calendar
- [ ] Franchise authentication
- [ ] Usage tracking & billing

---

Built for Mosquito Joe franchisees 🦟🚫
