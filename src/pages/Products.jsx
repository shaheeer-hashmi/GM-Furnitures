import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

import CategoryFilter from '../components/CatergoryFilter'
import ProductCard from '../components/ProductCard'
import { supabase } from '../supabaseClient'

const Products = () => {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  let initialCategory = 'All'
  if (categoryFromUrl) {
    initialCategory = categoryFromUrl
  }

  const [selected, setSelected] = useState(initialCategory)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        console.log('Failed to fetch products:', error)
      } else {
        setProducts(data)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  let filteredProducts = []

  if (selected === 'All') {
    filteredProducts = products
  } else {
    filteredProducts = products.filter((item) => item.category === selected)
  }

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

  return (
    <div className='min-h-screen bg-ivory-white'>
      <Navbar />

      <div className='px-4 md:px-10 py-6 md:py-10 flex flex-col gap-6'>
        <h1 className='font-heading text-2xl md:text-4xl text-walnut font-bold'>Our Collection</h1>

        <CategoryFilter selected={selected} onSelect={setSelected} />

        <div className='flex flex-wrap gap-4 md:gap-8 justify-center'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products