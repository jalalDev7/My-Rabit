"use client"
import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import React from 'react'
import {format} from "date-fns"
import Image from 'next/image'

const DesignerProducts = () => {
    document.title = `My-Rabit.com | Orders`

    const {data: getUserProducts, isLoading} = trpc.getDesignerProduct.useQuery()
    const {data: getUserInfo} = trpc.getUserInfo.useQuery()

  return (
    <>
    <h1 className='text-2xl mt-5 px-5 font-bold flex flex-row justify-start items-center gap-1'>
        All your products :
        <span 
        className='inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900 '>
            {getUserProducts?.length}
        </span>
        
    </h1>
    <div className='w-full p-4'>
        <div className='flex w-full shadow-md border-2 border-zinc-300 bg-white p-2 rounded-lg'>
            <div className='grid grid-cols-2 lg:grid-cols-6 2xl:grid-cols-6 gap-2 items-start justify-center w-full'>
            {getUserProducts && getUserProducts.length > 0 ? (

                getUserProducts.map((product, index) => {

                return (
                <div key={index} className='flex flex-col border-2 border-zinc-400 bg-zinc-100 rounded-lg relative '>
                    <div className='flex p-2'>
                        <div className='flex rounded-lg w-full justify-center bg-gradient-to-t from-slate-300 to-slate-500'>
                            <Image src={product.productImg[0]} height={150} width={150} alt={"Product image"} />
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full px-2 py-1'>
                        <h1 className='text-md font-bold'>
                            Created at :
                        </h1>
                        <h1 className='text-md'>
                            {format(new Date(product.createdAt), "dd MMM yyyy")}
                        </h1>
                        <h1 className='text-md font-bold'>
                            Commision : 
                        </h1>
                        <h1 className='text-md'>
                            {product.productAuthCommision} MAD
                        </h1>
                        <h1 className='text-md font-bold'>
                            Total orders :
                        </h1>
                        <h1 className='text-md'>
                            {product.transactions.length}
                        </h1>
                        
                    </div>
                    {product.productState == "ACTIF" ? (
                        <div className='absolute top-0 left-0 bg-green-500 text-white px-4 py-1 shadow-lg text-sm font-bold rounded-br-lg rounded-tl-md'>
                            Accepted
                        </div>
                    ): (
                        <div className='absolute top-0 left-0 bg-red-500 text-white px-4 py-1 shadow-lg text-sm font-bold rounded-br-lg rounded-tl-md'>
                            Hidden
                        </div>
                    )}
                    
                </div>
                )
                })
                ): isLoading ? (
                    <div className='mt-10 flex justify-center w-full items-center lg:col-span-3 2xl:col-span-4'>
                    <div className='flex flex-col items-center gap-2 w-full justify-center '>
                        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                        <h3 className='font-semibold text-xl'>
                        Getting your orders from database...
                        </h3>
                    </div>
                    </div>
                ): null}
            </div>
        </div>
    </div>
    </>
  )

}

export default DesignerProducts