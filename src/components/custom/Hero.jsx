import React from 'react'
import { Button } from '../ui/button'
import {Link} from 'react-router-dom'
const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1
        className='font-extrabold text-[50px] text-center mt-16'
        >
          <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span><br/> Personalized Itineraries at Your Fingertips</h1>
          <p className="text-xl text-gray-500 text-center">
          "AI plans seamless, personalized trips for adventure, relaxation, and exploration."
          </p>
          <Link to={'/create-trip'}>
          <Button>"Discover Your Trip" ✈️</Button>
          </Link>
          

    </div>
  )
}

export default Hero