"use client"

import SellerAllProducts from "./SellerAllProducts"
import SellerChoosenProducts from "./SellerChoosenProducts"


const Seller = () => {


    
  return (
    <>
        <h1 className='text-2xl mt-10 px-5 font-semibold'>
            Seller dashboard
        </h1>
        <SellerChoosenProducts />
        <SellerAllProducts />
    </>
  
  )
}

export default Seller