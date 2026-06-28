import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.log('Failed to fetch orders:', error)
    } else {
      setOrders(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const handleMarkComplete = async (orderId) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', orderId)

    if (error) {
      alert('Failed to update order')
    } else {
      fetchOrders()
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) +
      ' at ' +
      date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-ivory-white flex items-center justify-center'>
        <p className='font-heading text-2xl text-walnut'>Loading...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-ivory-white px-4 md:px-10 py-8'>

      <div className='flex justify-between items-center mb-8'>
        <h1 className='font-heading text-3xl md:text-4xl text-walnut font-bold'>Admin Dashboard</h1>
        <button onClick={handleLogout} className='text-caramel font-body underline cursor-pointer hover:text-walnut/70 transition-colors'>
          Log Out
        </button>
      </div>

      <div className='flex gap-6 mb-8 font-body text-lg'>
        <Link to='/admin' className='text-walnut/60'>Products</Link>
        <Link to='/admin/orders' className='text-walnut font-bold border-b-2 border-caramel'>Orders</Link>
      </div>

      {orders.length === 0 ? (
        <p className='font-body text-walnut/70'>No pending orders.</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {orders.map((order) => (
            <div key={order.id} className='bg-linen/20 p-5 rounded-xl flex flex-col gap-3'>

              <div className='flex justify-between items-start'>
                <div>
                  <p className='font-body font-bold text-walnut text-lg'>{order.customer_name}</p>
                  <p className='text-sm text-walnut/70'>{order.phone}</p>
                </div>
                <p className='text-xs text-walnut/50 font-body'>{formatDate(order.created_at)}</p>
              </div>

              <p className='text-sm text-walnut/70 font-body'>{order.address}</p>

              <div className='border-t border-walnut/10 pt-3 flex flex-col gap-1'>
                {order.items.map((item, index) => (
                  <p key={index} className='text-sm font-body text-walnut'>
                    {item.product_name} × {item.quantity} — Rs. {item.price * item.quantity}
                  </p>
                ))}
              </div>

              <div className='flex justify-between items-center mt-2'>
                <p className='font-body font-bold text-walnut'>
                  Total: Rs. {order.total}
                </p>
                <button
                  onClick={() => handleMarkComplete(order.id)}
                  className='bg-walnut text-ivory-white px-5 py-2 rounded-xl font-body text-sm cursor-pointer hover:scale-105 hover:bg-caramel transition-all duration-200'
                >
                  Mark as Complete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default AdminOrders