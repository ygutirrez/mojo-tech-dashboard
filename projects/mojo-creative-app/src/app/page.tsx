'use client'

import { useState } from 'react'
import ContentGenerator from '@/components/ContentGenerator'
import ResultsDisplay from '@/components/ResultsDisplay'
import Header from '@/components/Header'

export interface GeneratedContent {
  images: string[]
  captions: {
    text: string
    hashtags: string[]
  }[]
}

export default function Home() {
  const [results, setResults] = useState<GeneratedContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {!results ? (
          <ContentGenerator 
            onGenerate={setResults} 
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        ) : (
          <ResultsDisplay 
            results={results} 
            onBack={() => setResults(null)} 
          />
        )}
      </div>
    </main>
  )
}
