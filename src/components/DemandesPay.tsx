import { trpc } from '@/app/_trpc/Client'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import React from 'react'

const DemandesPay = () => {

    const {data: user, isLoading} = trpc.getUserInfo.useQuery()
    const {data: userPayHistory} = trpc.getUserPayHistory.useQuery()
  return (
    user ? (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between">
                <h1 className="text-lg font-semibold p-2">
                    Payment history:
                </h1>
            </div>
            <div className="flex flex-col w-full gap-2">
            {userPayHistory ? (
                userPayHistory.map((history, index) => {

                    let bgColor = "bg-blue-100"
                    if (history.transactionType == "DEMANDE") bgColor = "bg-zinc-100"
                    if (history.transactionType == "COMFIRMED") bgColor = "bg-green-100"
                    if (history.transactionType == "CANCELED") bgColor = "bg-red-100"

                    return (
                        <div key={index} className={`flex flex-col w-full border-2 rounded-lg border-zinc-300 p-3 item-start justify-center ${bgColor}`}>
                            <div className='flex 2xl:flex-row lg:flex-row flex-col gap-2 w-full 2xl:justify-between lg:justify-between items-center'>
                                <div className='flex flex-col w-full'>
                                    <h1 className='text-md font-semibold'>
                                        Transaction ID : {history.id}
                                    </h1>
                                    <h1 className='text-sm'>
                                        Ordred at :  {format(new Date(history.createdAt), "dd MMM yyyy")}
                                        
                                    </h1>
                                    <h1 className='text-sm font-semibold'>
                                        Demande value :  {history.transactionValue} MAD
                                        
                                    </h1>
                                </div>
                                <div className='text-lg font-semibold'>
                                    {history.transactionType}
                                </div>
                            </div>
                        </div>
                    )
                }) 
            ): []}
                
            </div>
        </div>
    ): isLoading ? (
        <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        </div>
        </div>
    ): []
    )
}

export default DemandesPay