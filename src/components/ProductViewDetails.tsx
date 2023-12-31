"use client"
import parse from 'html-react-parser'
import ReactStars from "react-rating-stars-component"
const ProductViewDetails = (props: {productDesc: string, productTitle: string, productPrice: string}) => {



  return (
    <div className="flex flex-col w-full gap-2 py-2 px-2">
      <div className='flex w-full 2xl:text-5xl lg:text-5xl text-3xl font-bold'>
        {props.productTitle}
      </div>
      <div className='flex flex-row gap-2 w-full items-center'>
        <h1 className='text-2xl px-2 font-bold gap-2 bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent'>
          {props.productPrice} MAD
        </h1>
        <div className='flex flex-row gap-2'>
          <ReactStars
            size={30}
            count={5}
            value={4.5}
            isHalf={true}
            activeColor="#ffd700"
          />
        </div>
        <div className='flex text-md text-zinc-700 '>
          Review
        </div>
      </div>
      <div className='flex py-4 w-full text-lg '>
        {parse(props.productDesc)}
      </div>
      
    </div>
    
  )
}

export default ProductViewDetails