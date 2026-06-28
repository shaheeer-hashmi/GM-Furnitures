import React, { useRef } from 'react'
import categories from '../data/categories'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const CategoryFilter = ({ selected, onSelect }) => {
  const scrollingRef = useRef(null)

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollingRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    } else {
      scrollingRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div className='w-full flex p-2 md:p-5 gap-3 md:gap-5 items-center'>
      <button onClick={() => scroll('left')} className='shrink-0 bg-walnut text-ivory-white rounded-full p-1 hover:bg-caramel transition-colors'>
        <MdChevronLeft size={20} />
      </button>

      <div className='flex overflow-x-hidden h-full w-full gap-3 md:gap-4' ref={scrollingRef}>
        {categories.map((item) => {
          let isSelected = false
          if (selected === item.name) {
            isSelected = true
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.name)}
              className={isSelected
                ? 'shrink-0 bg-walnut text-ivory-white rounded-xl py-2 px-4 md:px-6 text-sm md:text-base font-body font-bold transition-all'
                : 'shrink-0 bg-linen/40 text-walnut rounded-xl py-2 px-4 md:px-6 text-sm md:text-base font-body font-bold transition-all hover:bg-linen/70'
              }
            >
              {item.name}
            </button>
          )
        })}
      </div>

      <button onClick={() => scroll('right')} className='shrink-0 bg-walnut text-ivory-white rounded-full p-1 hover:bg-caramel transition-colors'>
        <MdChevronRight size={20} />
      </button>
    </div>
  )
}

export default CategoryFilter