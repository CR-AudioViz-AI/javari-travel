// app/api/travel-planner/route.ts — javari-travel
// AI travel planner with Klook affiliate links and budget tracker
// Beats TripAdvisor, Expedia, Google Travel, Lonely Planet
// May 17, 2026 — CR AudioViz AI, LLC
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const GROQ = process.env.GROQ_API_KEY ?? ''
const OR   = process.env.OPENROUTER_API_KEY ?? ''
const KLOOK_ID = '106921'  // Klook affiliate ID

async function ai(prompt: string): Promise<string> {
  for (const [url, key, model] of [
    ['https://api.groq.com/openai/v1/chat/completions', GROQ, 'openai/gpt-oss-20b'],
    ['https://openrouter.ai/api/v1/chat/completions', OR, 'deepseek/deepseek-r1-distill-llama-70b:free'],
  ] as const) {
    if (!key) continue
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, max_tokens: 2000, messages: [{ role: 'user', content: prompt }] }),
    })
    if (r.ok) {
      const d = await r.json() as { choices?: Array<{ message?: { content?: string } }> }
      const t = d.choices?.[0]?.message?.content ?? ''
      if (t.length > 100) return t
    }
  }
  return ''
}

function klookLink(activity: string, destination: string) {
  return `https://www.klook.com/en-US/search-results/?keyword=${encodeURIComponent(activity + ' ' + destination)}&aff_id=${KLOOK_ID}`
}

export async function GET() {
  return NextResponse.json({
    capabilities: ['itinerary', 'budget', 'packing_list', 'local_tips', 'restaurant_guide'],
    beats: ['TripAdvisor', 'Expedia', 'Google Travel', 'Lonely Planet', 'Kayak'],
    cost: '$0.00',
    affiliate_partner: 'Klook (3-5% commission on bookings)',
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    action: 'itinerary' | 'budget' | 'packing' | 'restaurants' | 'tips'
    destination: string
    days?: number
    travelers?: number
    budget?: string
    interests?: string[]
    start_date?: string
    travel_style?: string
  }

  const { destination, days = 5, travelers = 2, budget = 'moderate', interests = [], travel_style = 'mix' } = body

  if (body.action === 'budget') {
    // Budget calculator — no AI needed
    const budgets: Record<string, Record<string, number>> = {
      budget:   { hotel: 60, food: 40, transport: 20, activities: 30 },
      moderate: { hotel: 150, food: 80, transport: 40, activities: 60 },
      luxury:   { hotel: 350, food: 150, transport: 80, activities: 120 },
    }
    const daily = budgets[budget] ?? budgets.moderate
    const total_daily = Object.values(daily).reduce((a,b) => a+b, 0)
    const per_person = total_daily * travelers * (days ?? 5)

    return NextResponse.json({
      destination,
      days: days ?? 5,
      travelers,
      budget_level: budget,
      daily_per_person: daily,
      daily_total: total_daily * travelers,
      trip_total: per_person,
      book_activities: klookLink('tours', destination),
      tips: [
        'Book activities 2-4 weeks in advance for best prices',
        'Use Javari Travel for real-time deal alerts',
        `Klook affiliate: save up to 20% on ${destination} activities`,
      ],
      cost: '$0.00',
    })
  }

  const prompts: Record<string, string> = {
    itinerary: `Create a detailed ${days}-day itinerary for ${destination} for ${travelers} traveler(s) with a ${budget} budget. Interests: ${interests.join(', ') || 'general sightseeing'}. Travel style: ${travel_style}.

Format as Day 1, Day 2, etc. with Morning/Afternoon/Evening activities. Include: specific attraction names, estimated costs, insider tips, and transportation between sites. Be specific and practical.`,
    
    packing: `Create a complete packing list for ${days} days in ${destination}${body.start_date ? ` in ${body.start_date}` : ''}. Include: clothing (with quantities), electronics, documents, toiletries, destination-specific items. Consider local weather and customs.`,
    
    restaurants: `Recommend the top 10 restaurants in ${destination} across budget ranges (budget, moderate, upscale). For each include: name, cuisine type, price range (per person), signature dish, best time to visit, and why it's worth visiting.`,
    
    tips: `Share 20 insider local tips for ${destination} that most tourists don't know. Include: transportation tricks, free attractions, best times to visit popular sites, local etiquette, scams to avoid, hidden gems, best neighborhoods to stay.`,
  }

  const result = await ai(prompts[body.action] ?? prompts.itinerary)

  // Generate Klook booking links for activities
  const activities = ['city tour', 'museum pass', 'day trip', 'food tour', 'airport transfer']
  const bookingLinks = activities.map(a => ({
    activity: a.charAt(0).toUpperCase() + a.slice(1),
    link: klookLink(a, destination),
  }))

  return NextResponse.json({
    action: body.action,
    destination,
    result,
    book_activities: bookingLinks,
    affiliate_note: 'Booking via Klook links supports Javari at no extra cost to you',
    cost: '$0.00',
    beats: ['TripAdvisor (ads, paid listings)', 'Expedia (no AI)', 'Google Travel (generic)'],
  })
}
