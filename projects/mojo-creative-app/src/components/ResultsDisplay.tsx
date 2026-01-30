'use client'

import { useState } from 'react'
import type { GeneratedContent } from '@/app/page'

interface Props {
  results: GeneratedContent
  onBack: () => void
}

export default function ResultsDisplay({ results, onBack }: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopyCaption = async (text: string, hashtags: string[], index: number) => {
    const fullText = `${text}\n\n${hashtags.map(h => `#${h}`).join(' ')}`
    await navigator.clipboard.writeText(fullText)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleDownloadImage = async (url: string, index: number) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `mojo-content-${index + 1}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Generated Content</h2>
          <p className="text-gray-600">Choose your favorites and download!</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Create New
        </button>
      </div>

      {/* Images Section */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🖼️</span> Image Variations
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {results.images.map((url, index) => (
            <div key={index} className="card overflow-hidden p-0">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={url}
                  alt={`Generated content ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <button
                  onClick={() => handleDownloadImage(url, index)}
                  className="btn-mojo w-full text-sm"
                >
                  ⬇️ Download Image {index + 1}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Captions Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>✍️</span> Caption Options
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {results.captions.map((caption, index) => (
            <div key={index} className="card">
              <div className="mb-4">
                <span className="inline-block bg-mojo-green/10 text-mojo-green-dark px-2 py-1 rounded text-sm font-medium">
                  Option {index + 1}
                </span>
              </div>
              <p className="text-gray-800 mb-4 leading-relaxed">{caption.text}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {caption.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleCopyCaption(caption.text, caption.hashtags, index)}
                className={`w-full py-2 px-4 rounded-lg border-2 transition-all ${
                  copiedIndex === index
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-mojo-green text-gray-700'
                }`}
              >
                {copiedIndex === index ? '✓ Copied!' : '📋 Copy Caption'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-12 bg-mojo-green/5 border border-mojo-green/20 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h4>
        <ul className="text-gray-600 text-sm space-y-1">
          <li>• Mix and match images with different captions</li>
          <li>• Best posting times: Tuesday-Thursday, 10am or 7pm</li>
          <li>• Add your franchise location to personalize</li>
        </ul>
      </div>
    </div>
  )
}
