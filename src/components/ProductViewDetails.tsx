
import parse from 'html-react-parser';
const ProductViewDetails = (props: {productDesc: string, productTitle: string, productPrice: string}) => {



  return (
    <div className="flex flex-col w-full gap-2 py-4 px-2">
      <div className='flex  w-full 2xl:text-5xl lg:text-5xl text-3xl font-bold'>
        {props.productTitle}
      </div>
      <div className='flex w-full text-lg font-semibold'>
        Price : {props.productPrice}dhs
      </div>
      <div className='flex py-5 w-full text-lg '>
        {parse(props.productDesc)}
      </div>
      
    </div>
    
  )
}

export default ProductViewDetails