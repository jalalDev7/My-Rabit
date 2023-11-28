import { trpc } from '@/app/_trpc/Client'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import {v4 as uuidv4} from 'uuid'

const AdminOrders = () => {

    const utils = trpc.useContext()

    const [query, setQuery] = useState("")

    const [orderNewState, setOrderNewState] = useState("")

    const {data: getUserOrders, isLoading} = trpc.getAllOrders.useQuery({query: query})

    const {mutate: editBalance} = trpc.addBalance.useMutation({
        onSuccess: () => {
            utils.getUserInfo.invalidate()
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Please retry",
            variant: "destructive",
          })
        }})

    const {mutate: editOrderState} = trpc.editOrderState.useMutation({
        onSuccess: () => {
            utils.getAllOrders.invalidate()
          toast({
            title: "Done",
            description: "",
            variant: "success",
          })
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Please retry",
            variant: "destructive",
          })
        }})

    const handleQuery = (query: string) => {
        setQuery(query)
        utils.getAllOrders.invalidate()
    }

    
    
  return (
    <>
        <h1 className='text-2xl mt-10 px-5 mb-2'>
             All orders :
        </h1>
        <div className='flex flex-col w-full items-start justify-center p-4'>
        <div className='flex flex-col shadow-md border-2 border-zinc-300 justify-center items-start w-full'>
            <input type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Search by ID'
            onChange={(event) => (handleQuery(event.currentTarget.value))}
            />
            {getUserOrders && getUserOrders.length > 0 ? (

                getUserOrders.map((order, index) => {

                    let bgColor = "bg-blue-100"

                    if (order.orderState == "PENDING") bgColor = "bg-zinc-100"
                    if (order.orderState == "COMFIRMED") bgColor = "bg-green-100"
                    if (order.orderState == "CANCELED") bgColor = "bg-red-100"
                    if (!order.Products) return null
                    const imgs = order.Products.productImg.split(',')
                    const commission = order.Products.productCommision

                    return (
                        <div key={uuidv4()} className={`flex flex-col w-full border-b-4 border-zinc-600 p-3 item-start justify-center ${bgColor}`}>
                            <div className='flex flex-row w-full justify-between items-center'>
                                <div className='text-lg font-semibold mr-2'>
                                    
                                    <Image src={imgs[1]} height={150} width={150} alt={"Product image"} />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-md font-semibold'>
                                        Order id: {order.id}
                                    </h1>
                                    <h1 className='text-sm'>
                                        Ordred at: {format(new Date(order.createdAt), "MMM yyyy")}
                                    </h1>
                                </div>
                                <div className='text-lg font-semibold'>
                                    {order.orderState}
                                </div>
                                
                            </div>
                            <div className='flex gap-2 border-t-2 border-zinc-300 mt-1'>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    Name: {order.clientName}
                                </div>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    Phone: {order.clientPhone}
                                </div>
                                <div className='font-semibold flex w-full items-center justify-center'>
                                    Adress: {order.clientAdresse}
                                </div>
                            </div>
                            <div className='flex gap-2 border-t-2 border-zinc-300 mt-1'>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    Product var: {order.productVar}
                                </div>
                                <div className='font-semibold flex w-full items-center justify-center'>
                                    User: {order.userId}
                                </div>
                            </div>
                            
                            {order.orderState != "COMFIRMED" && order.orderState != "CANCELED" ? (
                            <div className='flex gap-2 border-t-2 border-zinc-300 mt-1'>
                                <button className='text-md font-semibold bg-blue-400 py-1 px-2 border-2 border-blue-700 m-1'
                                onClick={() => {
                                    editOrderState({orderId: order.id, newState: "PENDING"})
                                }}
                                >
                                    PENDING
                                </button>
                                    <button className='text-md font-semibold bg-green-400 py-1 px-2 border-2 border-green-700 m-1'
                                    onClick={() => {
                                        editBalance({userId: order.userId, addValue: commission, productId: order.productId})
                                        editOrderState({orderId: order.id, newState: "COMFIRMED"})
                                    }}
                                    >
                                        COMFIRMED
                                    </button>
                                
                                <button className='text-md font-semibold bg-red-400 py-1 px-2 border-2 border-red-700 m-1'
                                onClick={() => {
                                    editOrderState({orderId: order.id, newState: "CANCELED"})
                                }}
                                >
                                    CANCELED
                                </button>
                            </div>
                            ): []}
                            
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
            ):[
                <div>
                <h1 className="text-xl font-semibold">
                    Please choose some products to sell
                </h1>
            </div>
            ]}
            
            
        </div>
    </div>
    </>
  )
}

export default AdminOrders