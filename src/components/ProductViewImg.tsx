"use client"

import Link from "next/link"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"


const ProductViewImg = (props: {productImg: string, username: string}) => {

  const {productImg} = props

  const imgs = productImg.split(',')

  const [bigOne, setBigOne] = useState(imgs[1])
 
  return (

    <div className='flex flex-col w-full justify-start items-start gap-2'>
        <div className='flex w-full justify-center items-center'>
            <img src={bigOne}
            className="2xl:w-[456px] 2xl:h-[350px] lg:w-[456px] lg:h-[350px] w-[366px] h-[300px] "
            />
        </div>
        <div className='flex flex-row w-full justify-center items-center gap-1'>
          {imgs.map((img, indx) => {
            if (indx == 0) return null
            return (<img key={indx} src={img} height="150px" width="150px" 
                    onClick={() => (setBigOne(img))}
                    className="cursor-pointer 2xl:w-[150px] 2xl:h-[150px] lg:w-[150px] lg:h-[150px] w-[120px] h-[150px] "
            />)
          })}
            
        </div>
        <div className='absolute left-2 top-4 z-0 hover:bg-zinc-200 rounded-full'>
            <Link href={`http://localhost:3000/${props.username}`}>
              <FaArrowLeft className="w-[25px] h-[25px]" />
            </Link>
        </div>
    </div>
  )
}

export default ProductViewImg