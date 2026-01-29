'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user)
    })
  }, [])

  const login = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) setMessage(error.message)
    else {
      setUser(data.user)
      setMessage('Login successful!')
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMessage('Logged out')
  }

  if (user) {
    return (
      <div style={{ padding: 40 }}>
        <h1>CashFlow Manager</h1>
        <p>Welcome, {user.email}</p>

        <button onClick={logout}>Logout</button>

        <hr />

        <h2>Dashboard (Coming soon)</h2>
        <p>Next step: Daily Cash Count, Till, Booking, Refund</p>
      </div>
    )
  }

  return (
    <main style={{ padding: 40, maxWidth: 400 }}>
      <h1>CashFlow Manager</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <button onClick={login}>Login</button>

      <p>{message}</p>
    </main>
  )
}
