import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className='w-64 bg-ivory-white border border-linen/40 rounded-2xl overflow-hidden hover:scale-105 transition-transform block'>

      <div className='w-full h-44 bg-linen/40 flex items-center justify-center'>
        <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
      </div>

      <div className='p-4'>
        <p className='text-xs uppercase tracking-wide text-caramel mb-1'>{product.category}</p>
        <h3 className='font-heading text-lg text-walnut mb-1'>{product.name}</h3>
        <p className='text-sm text-walnut/70 mb-3'>{product.description}</p>

        <div className='flex items-center justify-between'>
          <span className='font-body font-bold text-walnut'>Rs. {product.price}</span>
          <span className='bg-caramel text-ivory-white px-4 py-2 rounded-lg text-sm'>
            View
          </span>
        </div>
      </div>

    </Link>
  )
}

export default ProductCard