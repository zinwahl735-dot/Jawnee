import React, { useState } from 'react'

export default function UploadVideo({ onUploaded }: { onUploaded: (key: string, url: string) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    try {
      const presignRes = await fetch('/api/upload/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type })
      })
      if (!presignRes.ok) throw new Error('presign failed')
      const presign = await presignRes.json()

      // Upload to S3 (presigned URL)
      const put = await fetch(presign.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      })
      if (!put.ok) throw new Error('upload failed')

      // Create lesson record (server expected to accept videoKey)
      const createRes = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: file.name, videoKey: presign.key })
      })
      if (!createRes.ok) throw new Error('create lesson failed')
      const created = await createRes.json()

      onUploaded(presign.key, created.video_url || presign.publicUrl || '')
      setFile(null)
    } catch (err) {
      console.error(err)
      alert('Upload error — check console')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="card">
      <h2>Upload Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload & Create Lesson'}
        </button>
      </div>
    </div>
  )
}
