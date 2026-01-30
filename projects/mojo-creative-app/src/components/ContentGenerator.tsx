'use client'

import { useState, useEffect } from 'react'
import type { GeneratedContent } from '@/app/page'

interface Props {
  onGenerate: (results: GeneratedContent) => void
  isGenerating: boolean
  setIsGenerating: (val: boolean) => void
}

const CATEGORIES = [
  { value: 'promo', label: 'Promotional', description: 'Sales, discounts, special offers' },
  { value: 'educational', label: 'Educational', description: 'Tips, facts, awareness' },
  { value: 'lifestyle', label: 'Lifestyle', description: 'Backyard enjoyment, outdoor living' },
]

const REGIONS = [
  { value: 'south', label: 'South', states: 'FL, TX, LA, GA' },
  { value: 'northeast', label: 'Northeast', states: 'NY, NJ, PA, CT' },
  { value: 'midwest', label: 'Midwest', states: 'OH, IL, MI, MN' },
  { value: 'west-coast', label: 'West Coast', states: 'CA, OR, WA' },
  { value: 'mountain', label: 'Mountain', states: 'CO, AZ, UT, NV' },
]

const SEASONS = [
  { value: 'spring', label: 'Spring', icon: '🌸' },
  { value: 'summer', label: 'Summer', icon: '☀️' },
  { value: 'fall', label: 'Fall', icon: '🍂' },
  { value: 'winter', label: 'Winter', icon: '❄️' },
]

const PLATFORMS = [
  { value: 'instagram-post', label: 'Instagram Post', dimensions: '1080×1080', icon: '📷' },
  { value: 'instagram-story', label: 'Instagram Story', dimensions: '1080×1920', icon: '📱' },
  { value: 'facebook-post', label: 'Facebook Post', dimensions: '1200×630', icon: '👍' },
]

function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

export default function ContentGenerator({ onGenerate, isGenerating, setIsGenerating }: Props) {
  const [category, setCategory] = useState('promo')
  const [region, setRegion] = useState('south')
  const [season, setSeason] = useState(getCurrentSeason())
  const [offer, setOffer] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [franchiseName, setFranchiseName] = useState('')
  const [platform, setPlatform] = useState('instagram-post')
  const [addLogo, setAddLogo] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setSeason(getCurrentSeason())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          category, 
          region, 
          season, 
          offer,
          customPrompt,
          franchiseName,
          platform,
          addLogo,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Generation failed')
      }

      const data = await response.json()
      onGenerate(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create Social Media Content
        </h2>
        <p className="text-gray-600">
          Generate professional, on-brand content for your Mosquito Joe franchise
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        {/* Franchise Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Franchise Location <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={franchiseName}
            onChange={(e) => setFranchiseName(e.target.value)}
            placeholder="e.g., Miami, South Florida, Atlanta"
            className="input-mojo"
          />
          <p className="text-xs text-gray-500 mt-1">Used in captions: "Mosquito Joe of [Location]"</p>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
          </label>
          <div className="grid grid-cols-3 gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPlatform(p.value)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  platform === p.value
                    ? 'border-mojo-green bg-mojo-green/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-xl mb-1">{p.icon}</div>
                <div className="text-sm font-medium text-gray-900">{p.label}</div>
                <div className="text-xs text-gray-500">{p.dimensions}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Category
          </label>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  category === cat.value
                    ? 'border-mojo-green bg-mojo-green/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{cat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="select-mojo"
          >
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label} ({r.states})
              </option>
            ))}
          </select>
        </div>

        {/* Season */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Season
          </label>
          <div className="grid grid-cols-4 gap-3">
            {SEASONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSeason(s.value)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  season === s.value
                    ? 'border-mojo-green bg-mojo-green/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-sm font-medium text-gray-700">{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Offer (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Offer <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="e.g., $40 Off First Treatment"
            className="input-mojo"
          />
        </div>

        {/* Custom Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Description <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Describe specific content you want, e.g., 'Family having a barbecue in their backyard without mosquitoes' or 'Before and after yard treatment'"
            rows={3}
            className="input-mojo resize-none"
          />
        </div>

        {/* Logo Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900">Add Mosquito Joe Logo</div>
            <div className="text-sm text-gray-500">Overlay logo on generated images</div>
          </div>
          <button
            type="button"
            onClick={() => setAddLogo(!addLogo)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              addLogo ? 'bg-mojo-green' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                addLogo ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isGenerating}
          className="btn-mojo w-full flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generating Content...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>Generate Content</span>
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Generates 3 image variations + 3 caption options with hashtags
      </p>
    </div>
  )
}
