"use client"

import { trpc } from '@/app/_trpc/Client'
import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

const ProductViewBuy = (props: {productVar: string, productId: string, user: string}) => {

  const [buyState, setBuyState] = useState("before")

  const {mutate: addOrder} = trpc.addOrder.useMutation({
    onSuccess: () => {
      setBuyState("after")
        return toast({
            title: "Your order is placed",
            description: "Thanks you, we will call you soon",
            variant: "success",
          })
    },
    onError: () => {
        return toast({
            title: "Somethings wrong",
            description: "Please retry",
            variant: "destructive",
          })
    },
    onMutate: () => {
      setBuyState("on")
    }
    
  })
  
  const vars = props.productVar.split(',')

  const [varChoosen, setVarChoosen] = useState(vars[0])

  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientAdress, setClientAdress] = useState("")

  const handleClick = () => {
    if (!clientName || !clientPhone || !clientAdress) {
      return toast({
        title: "Please type your information",
        description: "Please retry",
        variant: "destructive",
      })
    }
    addOrder({
      clientName: clientName,
      clientAdresse: clientAdress,
      clientPhone: clientPhone,
      productId: props.productId,
      userId: props.user,
      productVar: varChoosen
    })

  }

  return (<>
    
    {buyState == "before" ? (
      <div className='flex w-full mb-5'>
      <div className='flex flex-col w-full p-3  border-2 border-zinc-200 rounded-lg justify-center'>
        <h1 className='text-lg font-semibold py-2'>
          Quick buy
        </h1>
        <div className='flex flex-row justify-start items-center'>
          Varaibles :
              {vars.map((getVar,indx) => {
                let speciaClass = ""
                if (getVar == varChoosen) {
                  speciaClass = "bg-blue-400 border-blue-700"
                }

              return (
                <div key={indx} 
                className={`flex border-2 border-blue-200 bg-blue-50 font-semibold py-2 px-4 rounded-lg m-1 cursor-pointer hover:bg-white transition-all duration-500 ease-in-out ${speciaClass}`}
                onClick={() => {setVarChoosen(getVar)}}
                >
                  {getVar}
                </div>
              )
            })}
        </div>
        <div className='flex flex-row justify-between items-center gap-2'>
            <input type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Your name'
            onChange={(event) => {setClientName(event.currentTarget.value)}} />
            <input type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Phone number'
            onChange={(event) => {setClientPhone(event.currentTarget.value)}} />
        </div>
        <div className='flex flex-row w-full justify-between items-center gap-2'>
            <input type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Your adresse'
            onChange={(event) => {setClientAdress(event.currentTarget.value)}} />
        </div>
        <button 
        onClick={handleClick}
        className='text-xl bg-green-400 border-2 border-green-600 text-black hover:bg-white font-semibold rounded-lg py-2 px-5 my-1 transition-all duration-500 ease-in-out'>
          Buy now
        </button>
      </div>
    </div>
    ): buyState == "on" ? (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        </div>
      </div>
    ): buyState == "after" ? (
      <div className='w-full my-10 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <h3 className='font-bold text-green-600 text-2xl'>
            Thanks for ordering, we will call you soon
          </h3>
        </div>
      </div>
    ):[]}
    
    </>)
}

export default ProductViewBuy