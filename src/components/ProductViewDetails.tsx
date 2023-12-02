

const ProductViewDetails = (props: {productDesc: string, productTitle: string, productPrice: string}) => {



  return (
    <div className="">
      <div className='flex p-3  w-full text-2xl font-bold'>
        {props.productTitle}
      </div>
      <div className='flex px-3  w-full text-2xl font-semibold'>
        Price : {props.productPrice}dhs
      </div>
      <div className='flex px-3 py-10 w-full text-lg '>
        {props.productDesc}
      </div>
      
    </div>
    
  )
}

export default ProductViewDetails