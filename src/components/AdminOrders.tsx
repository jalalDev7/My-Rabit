import { trpc } from '@/app/_trpc/Client'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import Link from 'next/link'


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
                    
                    const commission = order.Products.productCommision

                    return (
                        <div key={order.id} className={`flex flex-col w-full border-b-4 border-zinc-600 p-3 item-start justify-center ${bgColor}`}>
                            <div className='flex flex-row w-full justify-between items-center'>
                                <div className='text-lg font-semibold mr-2'>
                                    
                                    <Image src={order.Products.productImg[0]} height={150} width={150} alt={"Product image"} />
                                </div>
                                <div className='flex flex-col w-full'>
                                    
                                    <h1 className='text-sm'>
                                        Ordred at: {format(new Date(order.createdAt), "dd MMM yyyy")}
                                    </h1>
                                    {order.Products.productSrc ? (
                                        <Link href={order.Products.productSrc}>
                                            <h1 className='text-md font-semibold'>
                                                Download design
                                            </h1>
                                        </Link>
                                    ): null}
                                    
                                    
                                </div>
                                <div className='text-lg font-semibold'>
                                    {order.orderState}
                                </div>
                                
                            </div>
                            <div className='grid grid-cols-2 gap-2 border-t-2 border-zinc-300 p-1'>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    Name: {order.clientName}
                                </div>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    Phone: {order.clientPhone}
                                </div>
                                <div className='col-span-2 font-semibold flex w-full items-center justify-center'>
                                    Adress: {order.clientAdresse}
                                </div>
                            </div>
                            <div className='flex gap-2 border-t-2 border-zinc-300 p-1 w-full justify-between'>
                                <div className='font-semibold flex w-full items-center justify-start'>
                                    Choice : {order.productVar}
                                </div>
                                <div className='font-semibold flex w-full items-center justify-center'>
                                    User : <Link href={`/${order.User?.username}`}> {order.User?.username}</Link>
                                </div>
                            </div>
                            
                            {order.orderState != "COMFIRMED" && order.orderState != "CANCELED" ? (
                            <div className='flex gap-2 border-t-2 border-zinc-300 p-1 items-center justify-center'>
                                <button className='text-sm lg:text-md 2xl:text-md font-semibold bg-blue-400 p-1 rounded-lg border-2 border-blue-700 '
                                onClick={() => {
                                    editOrderState({orderId: order.id, newState: "PENDING"})
                                }}
                                >
                                    PENDING
                                </button>
                                    <button className='text-sm lg:text-md 2xl:text-md font-semibold bg-green-400 p-1 rounded-lg border-2 border-green-700'
                                    onClick={() => {
                                        editBalance({userId: order.userId, addValue: commission, productId: order.productId})
                                        editOrderState({orderId: order.id, newState: "COMFIRMED"})
                                    }}
                                    >
                                        COMFIRMED
                                    </button>
                                
                                <button className='text-sm lg:text-md 2xl:text-md font-semibold bg-red-400 p-1 rounded-lg border-2 border-red-700'
                                onClick={() => {
                                    editOrderState({orderId: order.id, newState: "CANCELED"})
                                }}
                                >
                                    CANCELED
                                </button>
                            </div>
                            ): null}
                            
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