import React, { useState } from 'react'

type Club = {
  id: string
  name: string
  address?: string
  distance_km?: number
}

export default function ClubFinder() {
  const [lat, setLat] = useState('37.7749')
  const [lng, setLng] = useState('-122.4194')
  const [radius, setRadius] = useState('20')
  const [results, setResults] = useState<Club[]>([])
  const [loading, setLoading] = useState(false)

  async function search() {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/clubs/search?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&radius_km=${encodeURIComponent(
          radius
        )}`
      )
      if (!res.ok) throw new Error('search failed')
      const data = await res.json()
      setResults(data)
    } catch (err) {
      console.error(err)
      alert('Search error — check console')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Club Finder</h2>
      <div className="form-row">
        <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="lat" />
        <input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="lng" />
        <input value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="km" />
        <button onClick={search} disabled={loading}>
          Search
        </button>
      </div>
      {loading && <p>Searching...</p>}
      <ul>
        {results.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong>
            {c.distance_km != null && <span> — {c.distance_km.toFixed(1)} km</span>}
            {c.address && <div>{c.address}</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
