import { trpc } from '@/app/_trpc/Client'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from './ui/use-toast'

const AdminOrders = () => {

    const utils = trpc.useContext()

    const [query, setQuery] = useState("")

    const {data: getAllDemandes, isLoading} = trpc.getAllDemandes.useQuery({query: query})

    const {mutate: editBalance} = trpc.editBalance.useMutation({
        onSuccess: () => {
            utils.getUserInfo.invalidate()
            utils.getAllDemandes.invalidate()
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Please check all details",
            variant: "destructive",
          })
        }})
    const {mutate: editDemande} = trpc.editDemande.useMutation({
        onSuccess: () => {
            utils.getUserInfo.invalidate()
            utils.getAllDemandes.invalidate()
        },
    })

    const handleQuery = (query: string) => {
        setQuery(query)
        utils.getAllDemandes.invalidate()
    }

    
    
  return (
    <>
        <h1 className='text-2xl mt-10 px-5 mb-2'>
             All demandes :
        </h1>
        <div className='flex flex-col w-full items-start justify-center p-4'>
        <div className='flex flex-col shadow-md border-2 border-zinc-300 justify-center items-start w-full'>
            <input type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Search by ID'
            onChange={(event) => (handleQuery(event.currentTarget.value))}
            />
            {getAllDemandes && getAllDemandes.length > 0 ? (

                getAllDemandes.map((demande, index) => {

                    let bgColor = "bg-blue-100"

                    if (demande.transactionType == "DEMANDE") bgColor = "bg-zinc-100"
                    if (demande.transactionType == "COMFIRMED") bgColor = "bg-green-100"
                    if (demande.transactionType == "CANCELED") bgColor = "bg-red-100"
                        

                    return (
                        <div key={demande.id} className={`flex flex-col w-full border-b-4 border-zinc-600 p-3 item-start justify-center ${bgColor}`}>
                            <div className='flex flex-row w-full justify-between items-center'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-md font-semibold'>
                                        Demande id: {demande.id}
                                    </h1>
                                    <h1 className='text-sm'>
                                        Demanded at: {format(new Date(demande.createdAt), "MMM yyyy")}
                                    </h1>
                                </div>
                                <div className='text-lg font-semibold'>
                                    {demande.transactionType}
                                </div>
                                
                            </div>
                            <div className='flex gap-5 border-t-2 border-zinc-300 mt-1 w-full'>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    Value : {demande.transactionValue} dhs
                                </div>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    User: {demande.User?.username} <br />
                                </div>
                                <div className='font-semibold flex w-fit items-center justify-center'>
                                    Current balance: {demande.User?.userBalance} dhs
                                </div>
                            </div>
                            <div className='flex gap-2 border-t-2 border-zinc-300 mt-1'>
                            {demande.transactionType == "DEMANDE" ? (<>
                                <button className='text-sm lg:text-md 2xl:text-md bg-green-400 py-1 px-2 border-2 border-green-700 m-1'
                                onClick={() => {
                                    editBalance({userId: demande.userId, value: demande.transactionValue, transactionId: demande.id})
                                }}
                                >
                                    COMFIRMED
                                </button>
                                <button className='text-sm lg:text-md 2xl:text-md text-white font-semibold bg-red-400 py-1 px-2 border-2 border-red-700 m-1'
                                onClick={() => {
                                    editDemande({newValue: "CANCELED", transactionId: demande.id})
                                }}
                                >
                                    Cancel demande
                                </button>
                            </>): null}
                                
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