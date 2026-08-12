import React from 'react'
import LessonsList from './components/LessonsList'
import UploadVideo from './components/UploadVideo'
import ClubFinder from './components/ClubFinder'

export default function App() {
  const handleUploaded = (key: string, url: string) => {
    console.log('Uploaded', key, url)
    // Optionally refresh lesson list or show success message
  }

  return (
    <div className="app-container">
      <header>
        <h1>Jawnee — Learn Golf</h1>
      </header>
      <main>
        <section className="left">
          <UploadVideo onUploaded={handleUploaded} />
          <LessonsList />
        </section>
        <aside className="right">
          <ClubFinder />
        </aside>
      </main>
      <footer>
        <small>Scaffold branch: scaffold/web-typescript</small>
      </footer>
    </div>
  )
}
