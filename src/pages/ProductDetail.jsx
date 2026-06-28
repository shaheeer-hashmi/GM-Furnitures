import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { supabase } from '../supabaseClient'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.log('Failed to fetch product:', error)
      } else {
        setProduct(data)
      }

      setLoading(false)
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className='min-h-screen bg-ivory-white flex flex-col'>
        <Navbar />
        <div className='flex-1 flex items-center justify-center'>
          <p className='font-heading text-2xl text-walnut'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-screen bg-ivory-white flex flex-col'>
        <Navbar />
        <div className='flex-1 flex items-center justify-center'>
          <p className='font-heading text-2xl text-walnut'>Product not found</p>
        </div>
      </div>
    )
  }

  const whatsappNumber = '923196316464'
  const message = `Hi, I'm interested in the ${product.name}`
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  const handleAddToCart = () => {
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const handleBuyNow = () => {
    navigate('/checkout', { state: { items: [{ product: product, quantity: 1 }] } })
  }

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(product.images.length - 1)
    } else {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex === product.images.length - 1) {
      setCurrentImageIndex(0)
    } else {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  return (
    <div className='min-h-screen bg-ivory-white relative'>
      <Navbar />

      {showToast && (
        <div className='fixed top-20 right-4 md:right-10 bg-walnut text-ivory-white px-6 py-3 rounded-xl shadow-lg z-50 font-body'>
          Added to cart!
        </div>
      )}

      <div className='px-6 md:px-10 py-10 flex flex-col gap-6'>
        <Link to='/products' className='text-caramel font-body text-sm'>← Back to Collection</Link>

        <div className='flex flex-col md:flex-row gap-10'>

          <div className='flex flex-col gap-4 w-full md:w-1/2'>
            <div className='relative w-full h-72 md:h-96 bg-linen/40 rounded-2xl overflow-hidden'>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className='w-full h-full object-cover'
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className='absolute left-3 top-1/2 -translate-y-1/2 bg-walnut/80 text-ivory-white w-9 h-9 rounded-full flex items-center justify-center'
                  >
                    <MdChevronLeft size={22} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className='absolute right-3 top-1/2 -translate-y-1/2 bg-walnut/80 text-ivory-white w-9 h-9 rounded-full flex items-center justify-center'
                  >
                    <MdChevronRight size={22} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full md:w-1/2'>
            <p className='text-xs uppercase tracking-wide text-caramel'>{product.category}</p>
            <h1 className='font-heading text-3xl md:text-4xl text-walnut font-bold'>{product.name}</h1>
            <p className='text-walnut/70 font-body'>{product.description}</p>
            <p className='font-body font-bold text-2xl text-walnut'>Rs. {product.price}</p>

            <div className='flex flex-col gap-3 mt-4'>
              <button
                onClick={handleAddToCart}
                className='bg-caramel text-ivory-white text-center py-3 rounded-2xl text-lg font-body'
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className='bg-walnut text-ivory-white text-center py-3 rounded-2xl text-lg font-body'
              >
                Buy Now
              </button>

              <a
                href={whatsappLink}
                target='_blank'
                rel='noopener noreferrer'
                className='border-2 border-walnut text-walnut text-center py-3 rounded-2xl text-lg font-body'
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail