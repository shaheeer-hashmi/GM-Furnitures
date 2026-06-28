import React, { useRef, useEffect  } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import CategoryCarousel from '../components/CategoryCarousel'
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
  const heroRef = useRef(null)

  useGSAP(() => {
    gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 0.6 })
    gsap.from('.hero-heading', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 })
    gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.6, delay: 0.5 })
    gsap.from('.hero-btn', { opacity: 0, y: 20, duration: 0.6, delay: 0.7 })
  }, { scope: heroRef })


  const location = useLocation()

useEffect(() => {
  if (location.hash) {
    const sectionId = location.hash.replace('#', '')
    const element = document.getElementById(sectionId)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}, [location])

  return (
    <div className='flex flex-col h-screen'>

      <Navbar />

      <div className='flex-1 overflow-y-scroll'>

        {/* Section 1 — Hero */}
        <section ref={heroRef} className='w-full h-screen bg-warm-cream flex justify-center items-center flex-col gap-6 md:gap-12 font-body px-4 text-center'>
          <h2 className='hero-tag text-linen uppercase text-lg md:text-2xl tracking-widest'>Handcrafted Furniture</h2>
          <h1 className='hero-heading text-center font-bold text-3xl md:text-5xl text-walnut'>The Kind of <br />Comfort You Brag About</h1>
          <h2 className='hero-sub text-caramel text-base md:text-2xl'>Premium quality stools and more — Built for your homes</h2>
          <Link to='/products' className='hero-btn bg-walnut text-ivory-white py-3 rounded-2xl px-6 md:px-8 text-base md:text-xl'>
            Explore The Collection
          </Link>
        </section>

        {/* Section 2 — Our Collection */}
        <section id='products' className='w-full h-screen bg-ivory-white flex justify-center items-center flex-col gap-10 md:gap-20 px-4'>
          <h1 className='font-heading text-3xl md:text-5xl text-walnut font-bold'>Our Collection</h1>
          <CategoryCarousel />
        </section>

        {/* Section 3 — About */}
        <section id='about' className='w-full h-screen bg-warm-cream flex justify-center items-center flex-col gap-5 p-4 md:p-10'>
          <h1 className='font-heading text-3xl md:text-5xl mt-10 md:mt-30 font-bold text-walnut'>About GM Furnitures</h1>
          <div className='h-full w-full flex flex-col md:flex-row justify-between mt-6 md:mt-10 gap-6'>

            <div className='w-full md:w-[50vw] h-auto md:h-[80%] flex flex-row md:flex-col justify-center items-center gap-4 md:gap-7'>
              <div className="img1 h-32 md:h-80 w-1/2 md:w-90 bg-gray-300 rounded-xl hover:scale-105 transition-all duration-700 ease-in-out overflow-hidden">
                <img className='h-full w-full object-cover' src="/images/gm-furniture-logo.jpeg" alt="" />
              </div>
              <div className="img2 h-32 md:h-80 w-1/2 md:w-90 bg-gray-300 rounded-xl hover:scale-105 transition-all duration-700 ease-in-out overflow-hidden">
                <img className='h-full w-full object-cover' src="/images/about-second.jfif" alt="" />
              </div>
            </div>

            <div className='w-full md:w-[50vw] h-auto md:h-[80%] flex'>
              <p className='font-body font-bold text-sm md:text-base'>
                GM Furniture was founded on a simple belief: great furniture shouldn't be a compromise between quality and affordability. While our brand is new, our craftsmanship isn't — every piece we create is shaped by hands that have spent years mastering the art of woodwork, joinery, and finishing. Long before GM Furniture existed, our craftsmen were already perfecting their trade, building pieces for homes across the region and refining techniques passed down through real, hands-on experience. We work exclusively with premium-grade wood, carefully selected for its strength, grain, and longevity, because furniture in your home should last for generations, not seasons. From sofas to stools, beds to cabinets and everything in between, every item is built with precision, structural integrity, and an obsessive attention to detail that mass-produced furniture simply can't match. We also believe furniture should feel personal. That's why we welcome custom requests — tailoring dimensions, finishes, upholstery, and design details to fit your space, your taste, and your lifestyle. Whether you're furnishing your very first home or upgrading a space you've lived in for years, we treat every order with the same level of care and craftsmanship. At GM Furniture, we're not just building pieces for your home — we're building pieces that become part of your story, made by hands that understand that good furniture is never just furniture.
              </p>
            </div>
          </div>
        </section>

       
        {/* Section 4 — Contact */}
<section id='contact' className='w-full h-screen bg-walnut flex justify-center items-center px-4'>
  <div className='flex flex-col items-center gap-8 text-center'>
    <h1 className='font-heading text-3xl md:text-5xl text-ivory-white font-bold'>Get In Touch</h1>

    <div className='flex flex-col gap-6 font-body text-ivory-white'>
      <a href='tel:03157504296' className='flex items-center gap-4 justify-center text-lg md:text-xl hover:text-linen transition-colors'>
        <FaPhoneAlt size={20} />
        0315-7504296
      </a>

      <a href='https://wa.me/923196316464' target='_blank' rel='noopener noreferrer' className='flex items-center gap-4 justify-center text-lg md:text-xl hover:text-linen transition-colors'>
        <FaWhatsapp size={24} />
        0319-6316464
      </a>

      <div className='flex items-center gap-4 justify-center text-lg md:text-xl text-center'>
        <FaMapMarkerAlt size={20} />
        Toba Road, Near Sanat Zar, Jhang Sadar
      </div>
    </div>
  </div>
</section>

      </div>
    </div>
  )
}

export default HomePage