"use client"

import { trpc } from '@/app/_trpc/Client'
import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import { BiLike } from 'react-icons/bi'

const ProductViewBuy = (props: {productPrice: string, productVar: string, productId: string, user: string}) => {

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

  const [orderName, setName] = useState("")
  const [orderPhone, setPhone] = useState("")
  const [orderAdress, setAdress] = useState("")

  const handleClick = () => {
    if (!orderName || !orderPhone || !orderAdress) {
      return toast({
        title: "Please type your information",
        description: "Please retry",
        variant: "destructive",
      })
    }
    addOrder({
      clientName: orderName,
      clientAdresse: orderAdress,
      clientPhone: orderPhone,
      productId: props.productId,
      userId: props.user,
      productVar: varChoosen
    })

  }

  return (<>


    <div className='flex flex-col w-full items-center justify-center'>
      <Drawer>
        <DrawerTrigger
        className='flex w-full items-center justify-center text-2xl bg-green-500 border-2 border-green-600 text-white  hover:bg-black hover:border-black font-bold rounded-lg py-2 px-5 my-1 transition-all duration-500 ease-in-out'
        >
          Buy now
        </DrawerTrigger>
        <DrawerContent className='flex w-full items-center justify-center'>
          <DrawerHeader>
            <DrawerTitle>We are ready to serve you better.</DrawerTitle>
            <DrawerDescription>We are sure it will not be the last time.</DrawerDescription>
          </DrawerHeader>
          {buyState == "before" ? (
          <div className='flex w-full lg:w-[600px] 2xl:w-[600px] items-center justify-center z-100'>
            <div className='flex flex-col w-full items-center justify-center'>
              <h1 className='text-lg font-bold py-2'>
                Please choose your size.
              </h1>
              <div className='flex flex-row justify-start items-center'>
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
              <h1 className='text-lg font-bold py-2'>
                Please fill out your information bellow.
              </h1>
              <div className='grid grid-cols-2 w-full justify-center items-center gap-2 px-2'>
                  <input autoComplete="new-password" type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 ' placeholder='Your name'
                  onChange={(event) => {setName(event.currentTarget.value)}} />
                  <input autoComplete="new-password" type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2' placeholder='Phone number'
                  onChange={(event) => {setPhone(event.currentTarget.value)}} />
                  <input autoComplete="new-password" type="text" className='w-full col-span-2 border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Your adresse'
                  onChange={(event) => {setAdress(event.currentTarget.value)}} />
              </div>
              <h1 className='flex w-full justify-center items-center mt-4 text-lg font-bold py-2'>
                Paiment details.
              </h1>
              <div className='grid grid-cols-2 justify-center items-center w-full px-2 gap-2'>
                <div className='flex w-full text-lg font-semibold'>
                  Price : {props.productPrice} Dhs
                </div>
                <div className='flex w-full justify-end text-lg font-semibold'>
                  Delivery : 0.00 Dhs
                </div>
                <div className='flex w-full text-lg col-span-2 justify-end items-end font-semibold border-t-2 border-zinc-300'>
                  Total : {props.productPrice} Dhs
                </div>
              </div>
            </div>
          </div>
          ): buyState == "on" ? (
            <div className='w-full flex justify-center py-24'>
              <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-24 w-24 animate-spin text-zinc-800' />
              </div>
            </div>
          ): buyState == "after" ? (
            <div className='w-full pb-16 pt-8 px-4 flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center gap-1'>
                <div className='flex w-full items-center justify-center pt-8 pb-8'>
                  <BiLike className="h-24 w-24 animate-pulse text-green-600" />
                </div>
                <h3 className='font-bold text-black text-lg'>
                  Thanks for ordering, we will call you soon.
                </h3>
                <h3 className='font-semibold text-zinc-600 text-md'>
                  You can close this window bellow.
                </h3>
              </div>
            </div>
          ): null}
          <DrawerFooter className='flex w-full lg:w-[600px] 2xl:w-[600px]'>
          {buyState == "before" ? (
            <Button onClick={handleClick} variant="default" className='font-semibold text-md'>
              Order now
            </Button>
          ): null}
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
    
    </>)
}

export default ProductViewBuy