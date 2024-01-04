import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { trpc } from '@/app/_trpc/Client'


const SliderShow = (props: {userId: string, username: string}) => {

  const {data: getUserProducts, isLoading} = trpc.getUserProductById.useQuery({query: props.userId})

  return (
    <>
    <div className='grid 2xl:grid-cols-4 lg:grid-cols-4 grid-cols-2 w-full items-center justify-center gap-2 my-2 lg:px-44 2xl:px-96'>
      {getUserProducts && getUserProducts.length > 0 ? (
      
      getUserProducts.map((item, index) => {

      

        return (
          <div key={index} className='bg-white/25 flex flex-col hover:shadow-xl rounded-xl border-black p-1 items-center justify-start border-2 w-full '>
            
            <Link href={`/product/${item.id}/${props.username}`}>
            <div className='flex w-full items-center justify-center'>
            <Image src={item.productImg[0]} height={180} width={180} alt={"product image"}
            className='lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px] w-[180px] h-[180px] transition-all duration-700 ease-in-out rounded-lg ' />
            </div>

            <div className='flex flex-row w-full justify-between items-center mt-1 mx-1 lg:px-4 2xl:px-4 px-1'>

              <p className='text-lg font-bold 2xl:text-xl flex w-full items-center justify-center'>
                {item.productPrice}  dhs
              </p>
              <Link href={`/product/${item.id}/${props.username}`}
              className={`text-white bg-black rounded-lg text-sm font-semibold px-6 py-2`}> 
                  Buy
              </Link>
              
            </div>
            </Link>
          </div>
        )
      })
      ):[]}
    </div>
    </>
  )
}

export default SliderShow