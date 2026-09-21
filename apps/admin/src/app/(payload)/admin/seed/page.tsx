'use client'

import { useState } from 'react'
import { runServerSeed } from './action'

export default function SeedPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSeed = async () => {
    setStatus('loading')
    const res = await runServerSeed()
    if (res.success) {
      setStatus('success')
      setMessage('Database seeded successfully!')
    } else {
      setStatus('error')
      setMessage(`Error: ${res.error}`)
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Database Seeder</h1>
      <p>Click the button below to populate the database with the MyGan template data.</p>
      
      <button 
        onClick={handleSeed}
        disabled={status === 'loading'}
        style={{
          padding: '10px 20px',
          background: status === 'loading' ? '#ccc' : '#000',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer'
        }}
      >
        {status === 'loading' ? 'Seeding...' : 'Run Seed'}
      </button>

      {status === 'success' && <p style={{ color: 'green', marginTop: 20 }}>{message}</p>}
      {status === 'error' && <p style={{ color: 'red', marginTop: 20 }}>{message}</p>}
    </div>
  )
}
