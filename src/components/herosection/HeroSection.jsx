import React from 'react'
import Hero from "../../assets/hero.png"

const HeroSection = () => {
  return (
    <div>
        <img className='w-full lg:h-100' src={Hero} alt="" />
    </div>
  )
}

export default HeroSection