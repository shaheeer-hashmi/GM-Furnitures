import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      )
    } else {
      setCartItems([...cartItems, { product: product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(
      cartItems.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: newQuantity }
        } else {
          return item
        }
      })
    )
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)