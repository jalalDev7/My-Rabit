"use client"
import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import React from 'react'
import {format} from "date-fns"
import Link from 'next/link'

const Orders = () => {

    document.title = `My-Rabit.com | Orders`

    const {data: getUserOrders, isLoading} = trpc.getUserOrders.useQuery()
    const {data: getUserInfo} = trpc.getUserInfo.useQuery()

  return (
    <>
    <h1 className='text-2xl mt-5 px-5 font-bold flex flex-row justify-start items-center gap-1'>
        All your orders :
        <span 
        className='inline-flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900 '>
            {getUserOrders?.length}
        </span>
        
    </h1>
    <div className='flex flex-col w-full items-start justify-center p-4'>
        <div className='flex flex-col shadow-md border-2 border-zinc-300 justify-center items-start w-full'>
            {getUserOrders && getUserOrders.length > 0 ? (

                getUserOrders.map((order, index) => {

                    let bgColor = "bg-blue-100"

                    if (order.orderState == "PENDING") bgColor = "bg-zinc-100"
                    if (order.orderState == "COMFIRMED") bgColor = "bg-green-100"
                    if (order.orderState == "CANCELED") bgColor = "bg-red-100"

                    return (
                        <div key={index} className={`flex flex-col w-full border-b-2 border-zinc-300 p-3 item-start justify-center ${bgColor}`}>
                            <div className='flex flex-col 2xl:flex-row lg:flex-row w-full 2xl:justify-between lg:justify-between items-center gap-2'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-md font-semibold'>
                                        Order id: {order.id}
                                    </h1>
                                    <h1 className='text-sm'>
                                        Ordred at: {format(new Date(order.createdAt), "dd MMM yyyy")} | {" "}
                                        <Link href={`/product/${order.productId}/${getUserInfo?.username}`} className='font-semibold underline '>
                                            View product
                                        </Link>
                                    </h1>
                                </div>
                                <div className='text-lg font-semibold'>
                                    {order.orderState}
                                </div>
                            </div>
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
    </>
  )
}

export default Orders