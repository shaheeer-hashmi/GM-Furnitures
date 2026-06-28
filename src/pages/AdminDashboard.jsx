import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [mainImageFile, setMainImageFile] = useState(null)
  const [extraImageFiles, setExtraImageFiles] = useState([])
  const [existingMainImage, setExistingMainImage] = useState('')
  const [existingExtraImages, setExistingExtraImages] = useState([])

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*')

    if (error) {
      console.log('Failed to fetch products:', error)
    } else {
      setProducts(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const resetForm = () => {
    setName('')
    setCategory('')
    setPrice('')
    setDescription('')
    setMainImageFile(null)
    setExtraImageFiles([])
    setExistingMainImage('')
    setExistingExtraImages([])
    setEditingProduct(null)
    setIsFormOpen(false)
  }

  const handleAddClick = () => {
    resetForm()
    setIsFormOpen(true)
  }

  const handleEditClick = (product) => {
    setEditingProduct(product)
    setName(product.name)
    setCategory(product.category)
    setPrice(product.price)
    setDescription(product.description)
    setExistingMainImage(product.image)
    setExistingExtraImages(product.images)
    setIsFormOpen(true)
  }

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?')

    if (confirmed) {
      const { error } = await supabase.from('products').delete().eq('id', productId)

      if (error) {
        alert('Failed to delete product')
      } else {
        fetchProducts()
      }
    }
  }

  const uploadFile = async (file) => {
    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)

    if (error) {
      console.log('Upload failed:', error)
      return null
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    let mainImageUrl = existingMainImage
    let extraImageUrls = existingExtraImages

    if (mainImageFile) {
      const uploadedUrl = await uploadFile(mainImageFile)
      if (uploadedUrl) {
        mainImageUrl = uploadedUrl
      }
    }

    if (extraImageFiles.length > 0) {
      extraImageUrls = []
      for (let i = 0; i < extraImageFiles.length; i++) {
        const uploadedUrl = await uploadFile(extraImageFiles[i])
        if (uploadedUrl) {
          extraImageUrls.push(uploadedUrl)
        }
      }
    }

    const productData = {
      name: name,
      category: category,
      price: Number(price),
      description: description,
      image: mainImageUrl,
      images: extraImageUrls,
    }

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id)

      if (error) {
        alert('Failed to update product')
      }
    } else {
      const { error } = await supabase.from('products').insert(productData)

      if (error) {
        alert('Failed to add product')
      }
    }

    setUploading(false)
    resetForm()
    fetchProducts()
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
        <button onClick={handleLogout} className='text-caramel font-body underline'>
          Log Out
        </button>
      </div>

      <div className='flex justify-between items-center mb-6'>
        <h2 className='font-heading text-2xl text-walnut'>Products</h2>
        <button
          onClick={handleAddClick}
          className='bg-walnut text-ivory-white px-6 py-2 rounded-xl font-body'
        >
          + Add Product
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className='bg-linen/30 p-6 rounded-2xl flex flex-col gap-4 mb-8 max-w-lg'>
          <h3 className='font-heading text-xl text-walnut'>
            {editingProduct ? 'Edit Product' : 'New Product'}
          </h3>

          <input
            type='text'
            placeholder='Product Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='border border-walnut/30 rounded-xl px-4 py-3 font-body'
          />

          <input
            type='text'
            placeholder='Category (e.g. Sofas)'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className='border border-walnut/30 rounded-xl px-4 py-3 font-body'
          />

          <input
            type='number'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className='border border-walnut/30 rounded-xl px-4 py-3 font-body'
          />

          <textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className='border border-walnut/30 rounded-xl px-4 py-3 font-body resize-none'
          />

          <div className='flex flex-col gap-2'>
            <label className='font-body text-sm text-walnut/70'>Main Image</label>
            {existingMainImage && !mainImageFile && (
              <img src={existingMainImage} alt='current' className='w-20 h-20 object-cover rounded-lg' />
            )}
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setMainImageFile(e.target.files[0])}
              className='font-body text-sm'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-body text-sm text-walnut/70'>All Product Photos (select multiple)</label>
            {existingExtraImages.length > 0 && extraImageFiles.length === 0 && (
              <div className='flex gap-2'>
                {existingExtraImages.map((url, index) => (
                  <img key={index} src={url} alt='current' className='w-16 h-16 object-cover rounded-lg' />
                ))}
              </div>
            )}
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={(e) => setExtraImageFiles(Array.from(e.target.files))}
              className='font-body text-sm'
            />
          </div>

          <div className='flex gap-3'>
            <button
              type='submit'
              disabled={uploading}
              className='bg-walnut text-ivory-white px-6 py-3 rounded-xl font-body disabled:opacity-50'
            >
              {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type='button'
              onClick={resetForm}
              className='border border-walnut text-walnut px-6 py-3 rounded-xl font-body'
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className='flex flex-col gap-3'>
        {products.map((product) => (
          <div key={product.id} className='flex items-center justify-between bg-linen/20 p-4 rounded-xl gap-4'>
            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 bg-linen/40 rounded-lg overflow-hidden'>
                <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
              </div>
              <div>
                <p className='font-body font-bold text-walnut'>{product.name}</p>
                <p className='text-sm text-walnut/70'>{product.category} — Rs. {product.price}</p>
              </div>
            </div>

            <div className='flex gap-3'>
              <button onClick={() => handleEditClick(product)} className='text-caramel font-body underline'>
                Edit
              </button>
              <button onClick={() => handleDelete(product.id)} className='text-red-600 font-body underline'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AdminDashboard