"use client"

import Link from "next/link"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import Image from 'next/image'

const ProductViewImg = (props: {productImg: string[], username: string}) => {

  const {productImg} = props

  const [bigOne, setBigOne] = useState(productImg[0])
 
  return (

    <div className='flex flex-col w-full justify-start items-start px-4'>
        <div className='flex flex-col w-full justify-center items-center gap-2 '>
          <div className="flex w-full bg-zinc-200 items-center justify-center relative">
            <Image src={bigOne} height={366} width={300} alt={"Product image"}
            className="2xl:w-[450px] 2xl:h-[450px] lg:w-[450px] lg:h-[450px] w-[300px] h-[300px]"
            />
            <Image src={"/super-sale.png"} height={90} width={90} alt={"Super sale"}
            className="absolute top-1 left-1 drop-shadow-xl w-[90px] h-[90px]" 
            />
          </div>
          <div className='grid grid-cols-3 w-full justify-center items-center gap-2'>
          {productImg.map((img, indx) => {
            return (<Image key={indx} src={img} height={150} width={150} alt={"product image"} 
                    onClick={() => (setBigOne(img))}
                    className="cursor-pointer w-full h-[150px] bg-zinc-200 "
            />)
          })}
            
          </div>
        </div>
        
        <div className='absolute left-2 top-4 z-0 hover:bg-zinc-200 rounded-full'>
            <Link href={`/${props.username}`}>
              <FaArrowLeft className="w-[25px] h-[25px]" />
            </Link>
        </div>
    </div>
  )
}

export default ProductViewImg