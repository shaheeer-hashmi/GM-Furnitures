import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import HomePage from './pages/HomePage'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders from './pages/AdminOrders'


const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={
            <ProtectedRoute>
            <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path='/admin/orders' element={
          <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App