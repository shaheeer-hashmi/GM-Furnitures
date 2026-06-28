import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    getSession()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen bg-ivory-white flex items-center justify-center'>
        <p className='font-heading text-2xl text-walnut'>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to='/login' />
  }

  return children
}

export default ProtectedRoute