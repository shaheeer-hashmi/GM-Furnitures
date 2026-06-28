import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className='min-h-screen bg-warm-cream flex items-center justify-center px-4'>
      <div className='bg-ivory-white p-8 rounded-2xl w-full max-w-sm flex flex-col gap-4'>
        <h1 className='font-heading text-3xl text-walnut font-bold text-center'>Admin Login</h1>

        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border border-walnut/30 rounded-xl px-4 py-3 font-body'
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border border-walnut/30 rounded-xl px-4 py-3 font-body'
          />

          {error && <p className='text-red-600 text-sm font-body'>{error}</p>}

          <button
            type='submit'
            disabled={loading}
            className='bg-walnut text-ivory-white py-3 rounded-2xl text-lg font-body disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login