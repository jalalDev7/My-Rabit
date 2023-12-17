"use client"

import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { GrFormView } from 'react-icons/gr'
import {FaRegCopy} from "react-icons/fa"
import { toast } from './ui/use-toast'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
      <>
      <div className="flex flex-col w-full justify-center gap-2 ">
        <div className="flex flex-row w-full border-b-2 border-zinc-400 py-4 justify-between p-2 bg-white shadow-lg">
          <div className='flex flex-row gap-2 2xl:text-2xl lg:text-2xl text-md font-semibold w-full items-center'>
            <Link href="/settings">
            <Avatar className='h-[35px] w-[35px] items-center cursor-pointer'>
              <AvatarImage src={user.avatar}/>
                <AvatarFallback>
                  <Loader2 className='h-[35px] w-[35px] animate-spin '/>
                </AvatarFallback>
             </Avatar>
             </Link>
            <h1>
              Welcome {user.username != user.id ? user.username : null}
            </h1>
          </div>
          
          <h1 className="flex 2xl:text-2xl lg:text-2xl text-md font-semibold w-full items-center justify-end">
            Balance: {user.userBalance} MAD
          </h1>
        </div>

        <div className="flex flex-row gap-2 py-2 px-4">
          <h3 className="2xl:text-2xl lg:text-2xl text-md font-semibold">Your link :</h3>
          <div className="bg-zinc-300 flex w-fit items-center justify-between rounded-lg cursor-pointer hover:shadow-md px-2">
            <FaRegCopy className="w-[15px] h-[15px] " alt="Copy link"
            onClick={() => (handleCopy(`https://my-rabit.com/${user.username}`))}
            />
          </div>
          <Link href={`/${user.username}`} target='_blank' className="bg-zinc-300 flex w-fit items-center justify-between rounded-lg cursor-pointer hover:shadow-md px-2">
              <GrFormView className="w-[15px] h-[15px] " alt="Copy link" />
          </Link>
          <Link href="/settings" className="bg-zinc-300 flex w-fit items-center justify-between rounded-lg cursor-pointer hover:shadow-md px-2">
              <BiEditAlt className="w-[15px] h-[15px] " alt="Copy link" />
          </Link>
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