"use client"

import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import {FaRegCopy} from "react-icons/fa"
import { toast } from './ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { MdOpenInNew } from 'react-icons/md'
import { Skeleton } from "@/components/ui/skeleton"

const dashboardTopBar =  () => {

  const utils = trpc.useContext()

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

      <div className="flex w-full bg-white border border-zinc-200">
        <div className="flex flex-row justify-between w-full py-4 p-2">
          <div className='flex flex-row  gap-4 2xl:text-2xl lg:text-2xl text-md font-semibold items-center'>
            <Link href="/settings">
              <Avatar className='h-[50px] w-[50px] items-center cursor-pointer'>
                <AvatarImage src={user.avatar}/>
                  <AvatarFallback>
                    <Loader2 className='h-[50px] w-[50px] animate-spin '/>
                  </AvatarFallback>
              </Avatar>
             </Link>
             <div className='flex flex-col w-full h-full items-center justify-center'>
              <h1 className="2xl:text-lg lg:text-lg text-sm font-semibold w-full">
                Welcome {user.username != user.id ? user.username : null}
              </h1>
              <h1 className="2xl:text-lg lg:text-lg text-sm font-semibold w-full">
                Balance: {user.userBalance} MAD
              </h1>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row 2xl:flex-row items-center gap-2">
            <h3 className="2xl:text-2xl lg:text-2xl text-md font-semibold flex">
              Your link :
            </h3>
            <div className='flex gap-2'>
              <div 
              onClick={() => (handleCopy(`https://my-rabit.com/${user.username}`))}
              className='flex justify-start p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-xl cursor-pointer'>
                <FaRegCopy alt="Copy link" className=' h-[15px] w-[15px] '/> 
              </div>
              <Link href={`/${user.username}`} target='_blank' 
              className='flex justify-start p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-xl'>
                  <MdOpenInNew   className="w-[15px] h-[15px] " alt="Copy link" />
              </Link>
              <Link href="/settings" 
              className='flex justify-start p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-xl'>
                  <BiEditAlt className="w-[15px] h-[15px] " alt="Copy link" />
              </Link>
            </div>
            
          </div>
        </div>
      </div>

    ): isLoading ? (
      <div className="flex w-full bg-white border border-zinc-200">
        <div className="flex flex-row justify-between w-full py-4 p-2">
          <div className='flex flex-row  gap-4 2xl:text-2xl lg:text-2xl text-md font-semibold items-center'>
              <Skeleton className='h-[50px] w-[50px] items-center cursor-pointer rounded-full' />
             <div className='flex flex-col w-full h-full items-center justify-center'>
              <h1 className="2xl:text-lg lg:text-lg text-sm font-semibold w-full">
                <Skeleton className='h-4  w-24 items-center cursor-pointer' />
              </h1>
              <h1 className="2xl:text-lg lg:text-lg text-sm font-semibold w-full">
                <Skeleton className='h-4  w-24 items-center cursor-pointer' />
              </h1>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row 2xl:flex-row items-center gap-2">
            <h3 className="2xl:text-2xl lg:text-2xl text-md font-semibold flex">
              <Skeleton className='h-4  w-8 items-center cursor-pointer' />
            </h3>
            <div className='flex gap-2'>
              <div className='flex justify-start p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white shadow-xl cursor-pointer'>
                <Skeleton className=' h-[15px] w-[15px] '/> 
              </div>
              <div className='flex justify-start p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-xl'>
                <Skeleton className=' h-[15px] w-[15px] '/> 
              </div>
              <div
              className='flex justify-start p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow-xl'>
                  <Skeleton className=' h-[15px] w-[15px] '/> 
              </div>
            </div>
          </div>
        </div>
      </div>
    ): null
    
  )
}

export default dashboardTopBar