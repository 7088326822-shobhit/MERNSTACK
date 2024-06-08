import React, { useEffect, useState } from 'react'
import image1 from '../assest/img/b1.jpg'
import image2 from '../assest/img/b2.jpg'
import image3 from '../assest/img/b3.jpg'
import image4 from '../assest/img/b4.jpg'
import image5 from '../assest/img/b5.jpg'


import image6Mobile from '../assest/img/b6.jpg'
import image7Mobile from '../assest/img/b7.jpg'
import image8Mobile from '../assest/img/b8.jpg'
import image9Mobile from '../assest/img/b9.jpg'
import image10Mobile from '../assest/img/b10.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {

  const [currentImage, setCurrentImage] = useState()

  const desktopImage = [
    image1,
    image2,
    image3,
    image4,
    image5
  ]

  const mobileImage = [
     image6Mobile,
     image7Mobile,
     image8Mobile,
     image9Mobile,
     image10Mobile
  ]

 const nextImage = () => {
  if (desktopImage.length - 1 > currentImage) {
    setCurrentImage(preve => preve + 1)
  }

 }

  
const previousImage = () => {
  if (currentImage != 0) {
    setCurrentImage(preve => preve - 1)
  }
  
}

useEffect(() => {
  const interval = setInterval(() => {

    if (desktopImage.length - 1 > currentImage) {
      nextImage()
    }
    else{
      setCurrentImage(0)
    }

  }, 5000)

  return () => clearInterval(interval)

}, [currentImage])

  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-56 md:h-72 w-full bg-rose-500 relative'>

          <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
            <div className='flex justify-between w-full text-2xl'>
              <button onClick={previousImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
              <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button>
            </div>
          </div>

       {/*  desktop version*/}
         <div className='hidden md:flex h-full w-full overflow-hidden'>
           {
            desktopImage.map((imageURl,index) => {
              return(
                <div className='w-full h-full min-w-full min-h-full transition-all'
                     key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                    <img src={imageURl} className='w-full h-full '/>
                </div>
              )
            })
           }
         </div>


          {/*  mobile version*/}
          <div className='flex h-full w-full overflow-hidden md:hidden'>
           {
            mobileImage.map((imageURl,index) => {
              return(
                <div className='w-full h-full min-w-full min-h-full transition-all'
                     key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                    <img src={imageURl} className='w-full h-full object-cover'/>
                </div>
              )
            })
           }
         </div>
      </div>
    </div>
  )
}

export default BannerProduct
