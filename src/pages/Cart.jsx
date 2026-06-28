import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const navigate = useNavigate()

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
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

      <div className='px-6 md:px-10 py-10 flex flex-col gap-6'>
        <h1 className='font-heading text-3xl md:text-4xl text-walnut font-bold'>Your Cart</h1>

        <div className='flex flex-col gap-4'>
          {cartItems.map((item) => (
            <div key={item.product.id} className='flex items-center justify-between bg-linen/30 p-4 rounded-xl gap-4'>

              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 bg-linen/40 rounded-lg overflow-hidden'>
                  <img src={item.product.image} alt={item.product.name} className='w-full h-full object-cover' />
                </div>
                <div>
                  <p className='font-body font-bold text-walnut'>{item.product.name}</p>
                  <p className='text-sm text-walnut/70'>Rs. {item.product.price}</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className='bg-walnut text-ivory-white w-7 h-7 rounded-full'
                >
                  -
                </button>
                <span className='font-body font-bold text-walnut'>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className='bg-walnut text-ivory-white w-7 h-7 rounded-full'
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className='text-caramel font-body text-sm underline'
              >
                Remove
              </button>

            </div>
          ))}
        </div>

        <div className='flex justify-between items-center border-t border-walnut/20 pt-4 mt-2'>
          <p className='font-heading text-xl text-walnut'>Total</p>
          <p className='font-heading text-xl text-walnut font-bold'>Rs. {total}</p>
        </div>

        <button
          onClick={handleCheckout}
          className='bg-walnut text-ivory-white py-3 rounded-2xl text-lg font-body'
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart