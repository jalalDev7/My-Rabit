import React, { useState } from 'react'
import UploadButton from './UploadButton'
import { trpc } from '@/app/_trpc/Client'

const Analytics = () => {
    
    const {data: analyticsLinks} = trpc.getUserAnalitycs.useQuery()
    const {data: analyticsOrders} = trpc.getUserOrders.useQuery()
    const {data: userBenefits} = trpc.getUserBenefits.useQuery()

    let filtredOrders = []
    let totalEarning = 0
    if (analyticsOrders && analyticsOrders.length > 0) {
        filtredOrders = analyticsOrders.filter((order) => {
            return order.orderState === "COMFIRMED"
        })
    }
    if (userBenefits && userBenefits.length > 0) {
        userBenefits.map((benefit) => {
            totalEarning = totalEarning + benefit.transactionValue
        })
    }
      
  return (
    <>
    <h1 className='text-2xl mt-5 px-5'>
        Analytics
    </h1>
    <div className='grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 items-center'>
        <div className='flex bg-white rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center '>
            <p className='text-lg font-bold'>
                Total links clicks:
            </p>
            <span className='bg-green-200 p-2 rounded-lg font-semibold'>
                +{analyticsLinks?.length || 0}
            </span>
        </div>
        <div className='flex bg-white rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center '>
            <p className='text-lg font-bold'>
                Total Orders:
            </p>
            <span className='bg-green-200 p-2 rounded-lg font-semibold'>
                +{analyticsOrders?.length || 0}
            </span>
        </div>
        <div className='flex bg-white rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center '>
            <p className='text-lg font-bold'>
                Orders confirmed:
            </p>
            <span className='bg-green-200 p-2 rounded-lg font-semibold'>
                +{filtredOrders.length}
            </span>
        </div>
        <div className='flex bg-white rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center '>
            <p className='text-lg font-bold'>
                Total earning:
            </p>
            <span className='bg-green-200 p-2 rounded-lg font-semibold'>
                +{totalEarning} MAD
            </span>
        </div>
    </div>
    </>
  )
}

export default Analytics