import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { cartCount } = useCart()

  return (
    <div className='w-full h-auto bg-walnut text-ivory-white px-4 md:px-8 py-3 md:py-4 items-center flex sticky top-0 z-50'>
      <Link to='/' className='h-14 md:h-20 flex items-center'>
        <img
          src="/images/gm-furniture-logo.png"
          className='h-full w-auto object-contain'
          alt="GM Furnitures"
        />
      </Link>
      <div className='flex gap-6 md:gap-20 font-body text-ivory-white text-sm md:text-xl ml-auto items-center'>
        <Link to='/products'>Products</Link>
        <Link to='/#about'>About</Link>
        <Link to='/#contact'>Contact</Link>

        <Link to='/cart' className='relative'>
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span className='absolute -top-2 -right-2 bg-caramel text-ivory-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  )
}

export default Navbar