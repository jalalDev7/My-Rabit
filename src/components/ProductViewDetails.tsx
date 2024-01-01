"use client"
import ReactStars from 'react-rating-star-with-type'
import parse from 'html-react-parser'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { FaRegFaceGrinStars } from "react-icons/fa6";
import Image from 'next/image'
import { FaShippingFast } from 'react-icons/fa';


const ProductViewDetails = (props: {productDesc: string, productTitle: string, productPrice: string}) => {



  return (
    <div className="flex flex-col w-full gap-4 py-2 px-2">
      <div className='flex w-full lg:text-5xl 2xl:px-8 lg:px-8 2xl:text-5xl text-3xl font-bold'>
        {props.productTitle}
      </div>
      <div className='flex flex-row lg:text-5xl 2xl:px-8 lg:px-8 gap-2 w-full items-center'>
        <h1 className='text-2xl px-2 font-bold gap-2 bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent'>
          {props.productPrice} MAD
        </h1>
        <div className='flex flex-row gap-2'>
          <ReactStars 
          isEdit={true}
          value={4.5}  
          activeColors={[ "#FFCE00", "#9177FF","#8568FC",]} 
          />
        </div>
        <div className='flex text-sm font-semibold text-zinc-700 '>
          Review
        </div>
      </div>
      <div className='flex py-12 w-full items-center justify-center'>
        <Carousel className='w-[75%] lg:w-[90%] 2xl:w-[90%]'>
          <CarouselContent className='w-full'>
            <CarouselItem className='w-full '>
              <div className='flex flex-col w-full '>
                <div className='flex flex-col w-full gap-4 h-[250px] py-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center'>
                  <h1 className=' text-lg lg:text-2xl 2xl:text-2xl font-semibold'>
                    Why you should by from us ?
                  </h1>
                  <FaRegFaceGrinStars className=" w-32 h-32 " />
                </div>
                <div className='flex flex-col w-full px-4 border-b border-r border-l border-zinc-400 gap-4 py-4'>
                  <h1 className='text-lg font-semibold'>
                    1. Design unique made by our designers for you.
                  </h1>
                  <h1 className='text-md'>
                  All products are designed by the designer team. Seize the opportunity and buy an elegant and unique product that not everyone can wear.
                  </h1>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='w-full '>
              <div className='flex flex-col w-full '>
                <div className='flex flex-row w-full h-[250px] py-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 items-center justify-center'>
                  <div className='flex w-full'>
                    <Image src={"/quality-2.png"} alt={"High quality"} width={230} height={200} className='w-full h-[250px]' />
                  </div>
                  <div className='hidden lg:flex 2xl:flex w-full'>
                    <Image src={"/quality-1.png"} alt={"High quality"} width={230} height={230} className='w-full h-[250px]' />
                  </div>
                  <div className='hidden lg:flex 2xl:flex w-full'>
                    <Image src={"/quality-3.png"} alt={"High quality"} width={230} height={230} className='w-full h-[250px]' />
                  </div>
                </div>
                <div className='flex flex-col w-full px-4 border-b border-r border-l border-zinc-400 gap-4 py-4'>
                  <h1 className='text-lg font-semibold'>
                  2. High quality products.
                  </h1>
                  <h1 className='text-md'>
                  One of the most important things we focus on is providing high-quality products that will last for our customers for the longest time.
                  </h1>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className='w-full '>
              <div className='flex flex-col w-full '>
                <div className='flex flex-col w-full gap-4 h-[250px] py-10 text-white bg-gradient-to-r from-fuchsia-500 to-pink-500 items-center justify-center'>
                  <FaShippingFast  className=" w-32 h-32 " />
                </div>
                <div className='flex flex-col w-full px-4 border-b border-r border-l border-zinc-400 gap-4 py-4'>
                  <h1 className='text-lg font-semibold'>
                    3. Fast and FREE Shipping to your home.
                  </h1>
                  <h1 className='text-md'>
                  Dont care about anything we gonna ship your product to your home very fast for free. Just enjoy.
                  </h1>
                </div>
              </div>
            </CarouselItem>

          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      
    </div>
    
  )
}

export default ProductViewDetails