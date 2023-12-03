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

const dashboardTopBar =  () => {

  const utils = trpc.useContext()

  const {data: user, isLoading} = trpc.getUserInfo.useQuery()
  const {data: noti} = trpc.getUserNoti.useQuery()

  const {mutate: deleteNotiDb} = trpc.deleteNoti.useMutation()

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Link copied to clickboard",
      description: "You can share it on your social media accounts",
      variant: "success",
    })
  }

  const deleteNoti = (id: string) => {
    deleteNotiDb({id: id})
    utils.getUserNoti.invalidate()
    window.location.reload();
  }

  return (
    user ? (
      <>
      <div className="flex flex-col w-full border-b-2 border-zinc-200 justify-center">
        <div className="flex flex-row w-full justify-between">
          <h1 className="flex 2xl:text-2xl lg:text-2xl text-lg font-semibold w-full">
            Welcome {user.username != user.id ? user.username : null}
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
        </div>
      </div>
      {noti && noti.length > 0 ? (
        noti.map((item) => {
          let bgColor = "bg-blue-100"
          let borderColor = "border-blue-100"
          if (item.notiColor == "red") {
            bgColor = "bg-red-100"
            borderColor = "border-red-500"
          }
          if (item.notiColor == "green") {
            bgColor = "bg-green-100"
            borderColor = "border-green-500"
          }
          if (item.notiColor == "yellow") {
            bgColor = "bg-yellow-100"
            borderColor = "border-yellow-500"
          }
          return (<>
            <div key={item.id} className={`flex flex-row w-fill justify-between border-2 ${bgColor} ${borderColor} p-2 mt-1 font-semibold`}>
              <h1>
                {item.notiText}
              </h1>
              {item.notiLink ? (
                <div className='flex flex-row gap-2 items-center'>
                  <Link href={item.notiLink}>
                    {item.notiCallToAction}
                  </Link>
                  <IoMdCloseCircleOutline className="h-[20px] w-[20px] cursor-pointer text-zinc-700 hover:text-black hover:bg-zinc-200 rounded-full "
                  onClick={() => (deleteNoti(item.id))} />
                </div>
              ): null}
            </div>
            </>)
        })
        
      ): null}
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