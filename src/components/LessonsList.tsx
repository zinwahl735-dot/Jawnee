import React, { useEffect, useState } from 'react'

type Lesson = {
  id: string
  title: string
  description?: string
  video_url?: string
}

export default function LessonsList() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/lessons')
      .then((r) => r.json())
      .then((data) => setLessons(data ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="card">
      <h2>Lessons</h2>
      {loading && <p>Loading...</p>}
      {!loading && lessons.length === 0 && <p>No lessons yet.</p>}
      <ul>
        {lessons.map((l) => (
          <li key={l.id} className="lesson-item">
            <h3>{l.title}</h3>
            {l.video_url && (
              <video src={l.video_url} controls width={480} preload="metadata" />
            )}
            {l.description && <p>{l.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
