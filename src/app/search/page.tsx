'use client'

import { useState } from 'react'
import { searchItems, getAllTags, getAllSources } from '@/lib/store'
import { SourceType } from '@/types'
import { SourceBadge, ScoreIndicator } from '@/components/SourceBadge'
import Nav from '@/components/Nav'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<SourceType[]>([])
  const [results, setResults] = useState(searchItems(''))

  const allTags = getAllTags()
  const allSources = getAllSources()

  const handleSearch = () => {
    const items = searchItems(
      query,
      selectedTags.length > 0 ? selectedTags : undefined,
      selectedSources.length > 0 ? selectedSources : undefined
    )
    setResults(items)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const toggleSource = (source: SourceType) => {
    setSelectedSources(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    )
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Nav />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px 60px' }}>
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <h1 className="heading-display" style={{ fontSize: 28, marginBottom: 4 }}>
            搜索<em>日报</em>
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            按关键词、标签、来源搜索历史日报
          </p>
        </div>

        {/* Search box */}
        <div className="anim-fade-up anim-d1 surface" style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <svg
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入关键词搜索..."
              className="search-input"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
              标签
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`chip ${selectedTags.includes(tag) ? 'chip-active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
              来源
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {allSources.map(source => (
                <button
                  key={source}
                  onClick={() => toggleSource(source)}
                  className={`chip ${selectedSources.includes(source) ? 'chip-active' : ''}`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="anim-fade-up anim-d2 surface" style={{ overflow: 'hidden' }}>
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              找到 <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{results.length}</span> 条结果
            </span>
            {(selectedTags.length > 0 || selectedSources.length > 0) && (
              <button
                onClick={() => { setSelectedTags([]); setSelectedSources([]); setResults(searchItems('')); }}
                style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                清除筛选
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div style={{ padding: '48px 20px', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>没有找到匹配的结果</div>
            </div>
          ) : (
            results.map(item => (
              <div key={item.id} className="news-item">
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                      <SourceBadge source={item.source} />
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {item.date}
                      </span>
                      {item.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-primary)', marginBottom: 6 }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 8,
                    }}>
                      {item.summary}
                    </p>
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      原文
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                  <ScoreIndicator score={item.totalScore} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
