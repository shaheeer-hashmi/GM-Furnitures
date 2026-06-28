import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { supabase } from '../supabaseClient'

const Checkout = () => {
  const location = useLocation()
  const { cartItems } = useCart()

  let orderItems = cartItems

  if (location.state && location.state.items) {
    orderItems = location.state.items
  }

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const total = orderItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const itemsForDatabase = orderItems.map((item) => ({
      product_name: item.product.name,
      quantity: item.quantity,
      price: item.product.price
    }))

    const { error } = await supabase.from('orders').insert({
      customer_name: name,
      phone: phone,
      address: address,
      items: itemsForDatabase,
      total: total
    })

    if (error) {
      console.log('Order save failed:', error)
      alert('Something went wrong saving your order, but you can still send it via WhatsApp.')
    }

    let itemsList = ''
    orderItems.forEach((item) => {
      itemsList += `- ${item.product.name} (x${item.quantity}) - Rs. ${item.product.price * item.quantity}\n`
    })

    const message = `New Order!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n${itemsList}\nTotal: Rs. ${total}`

    const whatsappNumber = '923196316464'
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappLink, '_blank')
    setIsSubmitting(false)
  }

  if (orderItems.length === 0) {
    return (
      <div className='min-h-screen bg-ivory-white flex flex-col'>
        <Navbar />
        <div className='flex-1 flex flex-col items-center justify-center gap-4'>
          <p className='font-heading text-2xl text-walnut'>Your cart is empty</p>
          <Link to='/products' className='bg-walnut text-ivory-white px-6 py-3 rounded-xl font-body'>
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-ivory-white'>
      <Navbar />

      <div className='px-6 md:px-10 py-10 flex flex-col md:flex-row gap-10'>

        <div className='w-full md:w-1/2 flex flex-col gap-4'>
          <h1 className='font-heading text-3xl text-walnut font-bold'>Order Summary</h1>

          {orderItems.map((item) => (
            <div key={item.product.id} className='flex justify-between items-center bg-linen/30 p-4 rounded-xl'>
              <div>
                <p className='font-body font-bold text-walnut'>{item.product.name}</p>
                <p className='text-sm text-walnut/70'>Qty: {item.quantity}</p>
              </div>
              <p className='font-body font-bold text-walnut'>Rs. {item.product.price * item.quantity}</p>
            </div>
          ))}

          <div className='flex justify-between items-center border-t border-walnut/20 pt-4 mt-2'>
            <p className='font-heading text-xl text-walnut'>Total</p>
            <p className='font-heading text-xl text-walnut font-bold'>Rs. {total}</p>
          </div>
        </div>

        <div className='w-full md:w-1/2 flex flex-col gap-4'>
          <h1 className='font-heading text-3xl text-walnut font-bold'>Your Details</h1>

          <form onSubmit={handlePlaceOrder} className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='border border-walnut/30 rounded-xl px-4 py-3 font-body'
            />

            <input
              type='tel'
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className='border border-walnut/30 rounded-xl px-4 py-3 font-body'
            />

            <textarea
              placeholder='Delivery Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              className='border border-walnut/30 rounded-xl px-4 py-3 font-body resize-none'
            />

            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-walnut text-ivory-white py-3 rounded-2xl text-lg font-body mt-2 disabled:opacity-50'
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Checkout