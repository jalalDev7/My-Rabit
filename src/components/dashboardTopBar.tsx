"use client"

import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { GrFormView } from 'react-icons/gr'
import {FaRegCopy} from "react-icons/fa"
import { toast } from './ui/use-toast'

const dashboardTopBar =  () => {

  const {data: user, isLoading} = trpc.getUserInfo.useQuery()

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Link copied to clickboard",
      description: "You can share it on your social media accounts",
      variant: "success",
    })
  }

  return (
    user ? (
      <>
      <div className="flex flex-col w-full border-b-2 border-zinc-200 justify-center">
        <div className="flex flex-row w-full justify-between">
          <h1 className="flex 2xl:text-2xl lg:text-2xl text-lg font-semibold w-full">
            Welcome {user.username}
          </h1>
          <h1 className="flex 2xl:text-2xl lg:text-2xl text-lg font-semibold w-full justify-end">
            Balance: {user.userBalance} MAD
          </h1>
        </div>
        <div className="flex flex-col mb-5  mt-1">
          <h3 className="flex flex-row">
            <span className=" text-lg font-semibold">Your link :</span> 
            <div className="bg-zinc-200 flex w-fit items-center justify-between p-2 ml-2 rounded-lg cursor-pointer hover:shadow-md ">
              <FaRegCopy className="w-[20px] h-[20px] " alt="Copy link"
              onClick={() => (handleCopy(`https://my-rabit.com/${user.username}`))}
              />
            </div>
            <div className="bg-zinc-200 flex w-fit items-center justify-between p-1 ml-2 rounded-lg cursor-pointer hover:shadow-md ">
              <Link href={`/${user.username}`}>
              <GrFormView className="w-[20px] h-[20px] " alt="Copy link" />
              </Link>
            </div>
            <div className="bg-zinc-200 flex w-fit items-center justify-between p-1 ml-2 rounded-lg cursor-pointer hover:shadow-md">
              <Link href="/settings">
                <BiEditAlt className="w-[20px] h-[20px] " alt="Copy link" />
              </Link>
            </div>
          </h3>
          
          <h3 className=" text-lg font-semibold" hidden={true}>
            http://localhost:3000/{user.username}
          </h3>
        </div>
      </div>
      </>
    ): isLoading ? (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        </div>
      </div>
    ): []
    
  )
}

export default dashboardTopBar