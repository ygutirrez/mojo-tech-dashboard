import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface GenerateRequest {
  category: string
  region: string
  season: string
  offer?: string
  customPrompt?: string
  franchiseName?: string
  platform?: string
  addLogo?: boolean
}

const REGION_CONTEXT: Record<string, string> = {
  south: 'Southern US (Florida, Texas, Louisiana) - year-round warm climate, no snow, humidity focus, Spanish moss and palm trees in imagery',
  northeast: 'Northeast US (New York, New Jersey) - seasonal April-October, tick emphasis, fall foliage, traditional backyards',
  midwest: 'Midwest US (Ohio, Illinois, Michigan) - seasonal, lake recreation, classic American backyards, friendly community vibe',
  'west-coast': 'West Coast (California, Oregon, Washington) - drought-conscious, outdoor dining, modern aesthetic, wine country vibes',
  mountain: 'Mountain region (Colorado, Arizona, Utah) - shorter season, camping lifestyle, altitude awareness, desert or mountain scenery',
}

const CATEGORY_CONTEXT: Record<string, string> = {
  promo: 'promotional content featuring a special offer or discount, urgency and value messaging',
  educational: 'educational content about mosquito/tick facts, disease prevention, or pest control tips',
  lifestyle: 'lifestyle content showing families enjoying their mosquito-free backyard, outdoor gatherings, and quality time',
}

const SEASON_CONTEXT: Record<string, string> = {
  spring: 'Spring season - new growth, flowers blooming, getting ready for outdoor season, fresh starts',
  summer: 'Summer season - peak outdoor enjoyment, BBQs, pool parties, kids playing outside, family gatherings',
  fall: 'Fall season - football gatherings, harvest celebrations, crisp air, preparing for cooler weather',
  winter: 'Winter season - holiday gatherings, year-round protection messaging, planning ahead for spring',
}

const PLATFORM_SIZES: Record<string, { size: '1024x1024' | '1024x1792' | '1792x1024'; aspectRatio: string }> = {
  'instagram-post': { size: '1024x1024', aspectRatio: 'square (1:1)' },
  'instagram-story': { size: '1024x1792', aspectRatio: 'vertical portrait (9:16)' },
  'facebook-post': { size: '1792x1024', aspectRatio: 'landscape (1.91:1)' },
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json()
    const { category, region, season, offer, customPrompt, franchiseName, platform = 'instagram-post', addLogo = true } = body

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Build prompts
    const regionContext = REGION_CONTEXT[region] || REGION_CONTEXT.south
    const categoryContext = CATEGORY_CONTEXT[category] || CATEGORY_CONTEXT.promo
    const seasonContext = SEASON_CONTEXT[season] || SEASON_CONTEXT.summer
    const offerText = offer ? `Special offer to highlight: "${offer}"` : 'No specific offer - focus on brand awareness and service value'
    const platformConfig = PLATFORM_SIZES[platform] || PLATFORM_SIZES['instagram-post']
    const franchiseText = franchiseName ? `Mosquito Joe of ${franchiseName}` : 'Mosquito Joe'
    const logoInstructions = addLogo 
      ? 'Leave clear space in the bottom-right corner for logo placement. Keep that area simple/uncluttered.'
      : 'No need to leave space for a logo.'
    const customInstructions = customPrompt 
      ? `\n\nSPECIFIC REQUEST FROM USER: ${customPrompt}`
      : ''

    // Image generation prompt
    const imagePrompt = `Create a professional social media graphic for Mosquito Joe, a mosquito and tick control company.

Brand Style:
- Primary color: Lime green (#7AB547)
- Clean, friendly, family-focused imagery
- Professional but approachable
- NO scary insects - show a pleasant, pest-free environment

Scene Requirements:
- ${categoryContext}
- ${regionContext}
- ${seasonContext}
- Show a beautiful backyard or outdoor space that's perfect for family enjoyment
- Include happy people (family or friends) if appropriate for the content type
- Bright, inviting lighting
- ${offer ? `Include visual hint of promotion/special offer` : 'Focus on lifestyle and enjoyment'}

Format: ${platformConfig.aspectRatio} composition
${logoInstructions}
${customInstructions}

Technical: Vibrant colors, high quality photography style, professional social media aesthetic.

DO NOT include any text overlays - keep the image clean for the franchisee to add their own text/branding.`

    // Caption generation prompt
    const captionPrompt = `You are a social media copywriter for ${franchiseText}, a mosquito and tick control franchise.

Write 3 different Instagram captions for a ${category} post.

Context:
- Franchise: ${franchiseText}
- Region: ${regionContext}
- Season: ${seasonContext}
- Content type: ${categoryContext}
- ${offerText}
${customPrompt ? `- User's specific request: ${customPrompt}` : ''}

Brand Voice:
- Friendly and approachable
- Playful but professional
- Family-focused, pet-friendly
- Local community emphasis
- Tagline inspiration: "Make Your Yard the Place to Be"

Requirements for EACH caption:
- Under 150 words
- Include 1-2 relevant emojis naturally placed
- End with a clear call-to-action
- Be conversational, not salesy
- ${franchiseName ? `Reference the local area (${franchiseName}) naturally when appropriate` : 'Keep it general for any location'}

After the 3 captions, provide 7 relevant hashtags.

Format your response EXACTLY as JSON:
{
  "captions": [
    {"text": "caption 1 here", "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"]},
    {"text": "caption 2 here", "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"]},
    {"text": "caption 3 here", "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"]}
  ]
}`

    // Generate images and captions in parallel
    const [imageResults, captionResult] = await Promise.all([
      // Generate 3 images
      Promise.all([
        openai.images.generate({
          model: 'gpt-image-1',
          prompt: imagePrompt,
          n: 1,
          size: platformConfig.size,
          quality: 'medium',
        }),
        openai.images.generate({
          model: 'gpt-image-1',
          prompt: imagePrompt + '\n\nVariation: Different angle or composition, different people/family.',
          n: 1,
          size: platformConfig.size,
          quality: 'medium',
        }),
        openai.images.generate({
          model: 'gpt-image-1',
          prompt: imagePrompt + '\n\nVariation: Different scene, setting, or outdoor activity.',
          n: 1,
          size: platformConfig.size,
          quality: 'medium',
        }),
      ]),
      // Generate captions
      openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional social media copywriter. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: captionPrompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
      }),
    ])

    // Extract image URLs - gpt-image-1 returns base64
    const images = imageResults.map((result) => {
      if (result.data[0].b64_json) {
        return `data:image/png;base64,${result.data[0].b64_json}`
      }
      return result.data[0].url || ''
    })

    // Parse captions
    const captionContent = captionResult.choices[0].message.content
    let captions = []
    
    try {
      const parsed = JSON.parse(captionContent || '{}')
      captions = parsed.captions || []
    } catch {
      // Fallback captions if parsing fails
      captions = [
        { text: `Enjoy your backyard again! 🌿 Contact ${franchiseText} today for mosquito-free outdoor living.`, hashtags: ['MosquitoJoe', 'BackyardLiving', 'PestFree', 'OutdoorLife', 'FamilyTime', 'SummerVibes', 'MosquitoControl'] },
        { text: `Your family deserves a bite-free backyard. ☀️ Let ${franchiseText} help you make the most of your outdoor space!`, hashtags: ['MosquitoJoe', 'BackyardLiving', 'PestFree', 'OutdoorLife', 'FamilyTime', 'SummerVibes', 'MosquitoControl'] },
        { text: `Say goodbye to pesky mosquitoes! 🙌 Schedule your treatment with ${franchiseText} today and reclaim your yard.`, hashtags: ['MosquitoJoe', 'BackyardLiving', 'PestFree', 'OutdoorLife', 'FamilyTime', 'SummerVibes', 'MosquitoControl'] },
      ]
    }

    return NextResponse.json({
      images,
      captions,
      metadata: {
        platform,
        addLogo,
        franchiseName: franchiseName || null,
      }
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
