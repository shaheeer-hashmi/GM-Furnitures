import React, { useRef } from 'react'
import categories from '../data/categories'
import { Link } from 'react-router-dom'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CategoryCarousel = () => {
  const scrollingRef = useRef(null)
  const containerRef = useRef(null)

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollingRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    } else {
      scrollingRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }



  return (
    <div ref={containerRef} className='w-full md:w-[50%] h-40 flex p-3 md:p-5 gap-4 md:gap-10 items-center'>
      <button onClick={() => scroll('left')} className='shrink-0 bg-walnut text-ivory-white rounded-full p-1 hover:bg-caramel transition-colors'>
        <MdChevronLeft size={24} />
      </button>

      <div className='flex overflow-hidden h-full w-full p-4 md:p-8 gap-4 md:gap-11' ref={scrollingRef}>
        {categories.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/products?category=${item.name}`}
              className='category-card shrink-0 bg-caramel text-center rounded-xl hover:scale-110 transition-all duration-700 py-2 md:py-3 text-base md:text-2xl px-6 md:px-10 font-body font-bold text-ivory-white'
            >
              {item.name}
            </Link>
          )
        })}
      </div>

      <button onClick={() => scroll('right')} className='shrink-0 bg-walnut text-ivory-white rounded-full p-1 hover:bg-caramel transition-colors'>
        <MdChevronRight size={24} />
      </button>
    </div>
  )
}

export default CategoryCarousel