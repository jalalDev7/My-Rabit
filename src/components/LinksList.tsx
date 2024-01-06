"use client"
import { trpc } from '@/app/_trpc/Client'
import Link from 'next/link'
import { useState } from 'react'
import {AiOutlineDelete,  AiFillEye} from "react-icons/ai"
import UploadButton from './UploadButton'
import { Skeleton } from "@/components/ui/skeleton"
import { FaInstagram } from 'react-icons/fa6'
import { FiYoutube } from 'react-icons/fi'
import { PiSnapchatLogoBold } from 'react-icons/pi'
import { CiLinkedin } from 'react-icons/ci'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import LinkEditor from './LinkEditor'
import { BsCashCoin } from 'react-icons/bs'

const linksList = () => {
  
  const [isOpen2,setIsOpen2] = useState<boolean>()

  const utils = trpc.useContext()
  const {data: links, isLoading} = trpc.getUserLinks.useQuery(undefined, {retry:false})
    
  const {mutate: deleteLink} = trpc.deleteLink.useMutation({
    onSuccess: () => {
      utils.getUserLinks.invalidate()
      utils.getUserAnalitycs.invalidate()
    },
  })
    
  return (
    <>
    <div className='flex flex-row gap-2 justify-between w-full items-start px-4 mt-4'>
      <h1 className='text-2xl'>
          Your links
      </h1>
      <div>
        <UploadButton />
      </div>
    </div>
    {links && links.length > 0 ? (
    <div className='flex flex-col w-full'>
      <div className='grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 p-4'>
      {links.map((link) => {
        return (
            <div key={link.id} className='flex bg-zinc-50 rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center  '>
                <div className='flex flex-row items-center justify-center '>
                  <p className='flex flex-col border-r-[1px] border-zinc-300 text-sm font-bold pr-3 items-center justify-center'>
                    <AiFillEye className="h-[20px] w-[20px] text-green-700 " />
                    {link.Visitors.length}
                  </p>
                  <p className='text-xl font-semibold content-stretch ml-3 sm:text-md '>
                  {link.linkTitle}
                  </p>
                </div>
                <div className='flex flex-row items-center justify-center'>

                    <Link href="" onClick={() => deleteLink({id: link.id})}>
                      <AiOutlineDelete className=" text-4xl bg-red-200  hover:bg-red-300 rounded-lg p-1 m-1 " />
                    </Link>
                </div>
            </div>
        )
      })}
      </div>
      <div className='grid lg:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 py-8'>
        <div className='flex flex-col bg-white rounded-lg shadow-lg'>
            <div className='flex w-full h-32 rounded-t-lg items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
              <div className='flex flex-row gap-2 '>
                <FaInstagram className="w-12 h-12 text-white" />
                <FiYoutube  className="w-12 h-12 text-white" />
                <PiSnapchatLogoBold   className="w-12 h-12 text-white" />
                <CiLinkedin className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className='flex flex-col w-full gap-2 p-4 h-36 justify-between'>
              <h1 className='text-lg font-semibold'>
                You can change your social media links in settings.
              </h1>
              <div className='flex w-full p-2 items-end justify-end text-lg font-semibold text-blue-500'>
                <Link href={"/settings"}>
                  Settings
                </Link>
              </div>
            </div>
        </div>
        <div className='flex flex-col bg-white rounded-lg shadow-lg'>
            <div className='flex w-full h-32 rounded-t-lg items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
              <div className='flex flex-row gap-2 '>
                <div className='flex rounded-lg text-lg font-semibold bg-white px-6 py-2'>
                  your-website.com
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-2 p-4 h-36 justify-between'>
              <h1 className='text-lg font-semibold'>
                You can change your social media links in settings.
              </h1>
              <div className='flex w-full p-2 items-end justify-end text-lg font-semibold text-blue-500'>
              <Dialog open={isOpen2} onOpenChange={(v) => {
                if(!v) {
                    setIsOpen2(v)
                  }
                }}>
                <DialogTrigger onClick={() => setIsOpen2(true)} asChild>
                  <h1 className='cursor-pointer'>Add your link</h1>
                </DialogTrigger>
                <DialogContent>
                  <LinkEditor />
                </DialogContent>
              </Dialog>
              </div>
            </div>
        </div>
        <div className='flex flex-col bg-white rounded-lg shadow-xl'>
          <div className='flex w-full h-32 rounded-t-lg items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='flex flex-row justify-end items-end gap-2 '>
              <BsCashCoin  className="w-12 h-12 text-white" />
              <BsCashCoin  className="w-16 h-16 text-white" />
              <BsCashCoin  className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className='flex flex-col w-full gap-2 p-4 h-36 justify-between'>
              <h1 className='text-lg font-semibold'>
                You can choose any product from our store.
              </h1>
              <div className='flex w-full p-2 items-end justify-end text-lg font-semibold text-blue-500'>
                <Link href={"/seller"}>
                  Seller panel
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
    ) : isLoading ? (
      <div className='grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 p-4'>
        <div  className='flex bg-zinc-50 rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center  '>
          <div className='flex flex-row items-center justify-center '>
            <p className='flex flex-col border-r-[1px] border-zinc-300 text-sm font-bold pr-3 items-center justify-center'>
              <Skeleton className='h-[40px] w-[40px] items-center cursor-pointer rounded-lg bg-zinc-200' />
            </p>
            <p className='text-xl font-semibold content-stretch ml-3 sm:text-md '>
            <Skeleton className='h-[40px] w-[200px] items-center cursor-pointer rounded-lg bg-zinc-200' />
            </p>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <Skeleton className='h-[40px] w-[40px] items-center cursor-pointer rounded-lg bg-zinc-200' />
          </div>
        </div>
        <div  className='hidden lg:flex 2xl:flex bg-zinc-50 rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center  '>
          <div className='flex flex-row items-center justify-center '>
            <p className='flex flex-col border-r-[1px] border-zinc-300 text-sm font-bold pr-3 items-center justify-center'>
              <Skeleton className='h-[40px] w-[40px] items-center cursor-pointer rounded-full bg-zinc-200' />
            </p>
            <p className='text-xl font-semibold content-stretch ml-3 sm:text-md '>
              <Skeleton className='h-[40px] w-[200px] items-center cursor-pointer rounded-lg bg-zinc-200' />
            </p>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <Skeleton className='h-[40px] w-[40px] items-center cursor-pointer rounded-lg bg-zinc-200' />
          </div>
        </div>
        <div  className='hidden lg:flex 2xl:flex bg-zinc-50 rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center  '>
          <div className='flex flex-row items-center justify-center '>
            <p className='flex flex-col border-r-[1px] border-zinc-300 text-sm font-bold pr-3 items-center justify-center'>
              <Skeleton className='h-[40px] w-[40px] items-center cursor-pointer rounded-full bg-zinc-200' />
            </p>
            <p className='text-xl font-semibold content-stretch ml-3 sm:text-md '>
              <Skeleton className='h-[40px] w-[200px] items-center cursor-pointer rounded-lg bg-zinc-200' />
            </p>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <Skeleton className='h-[40px] w-[40px] items-center cursor-pointer rounded-lg bg-zinc-200' />
          </div>
        </div>
      </div> 
    ) : [
      <div className='grid lg:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 py-8'>
        <div className='flex flex-col bg-white rounded-lg shadow-lg'>
            <div className='flex w-full h-32 rounded-t-lg items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
              <div className='flex flex-row gap-2 '>
                <FaInstagram className="w-12 h-12 text-white" />
                <FiYoutube  className="w-12 h-12 text-white" />
                <PiSnapchatLogoBold   className="w-12 h-12 text-white" />
                <CiLinkedin className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className='flex flex-col w-full gap-2 p-4 h-36 justify-between'>
              <h1 className='text-lg font-semibold'>
                You can change your social media links in settings.
              </h1>
              <div className='flex w-full p-2 items-end justify-end text-lg font-semibold text-blue-500'>
                <Link href={"/settings"}>
                  Settings
                </Link>
              </div>
            </div>
        </div>
        <div className='flex flex-col bg-white rounded-lg shadow-lg'>
            <div className='flex w-full h-32 rounded-t-lg items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
              <div className='flex flex-row gap-2 '>
                <div className='flex rounded-lg text-lg font-semibold bg-white px-6 py-2'>
                  your-website.com
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-2 p-4 h-36 justify-between'>
              <h1 className='text-lg font-semibold'>
                You can change your social media links in settings.
              </h1>
              <div className='flex w-full p-2 items-end justify-end text-lg font-semibold text-blue-500'>
              <Dialog open={isOpen2} onOpenChange={(v) => {
                if(!v) {
                    setIsOpen2(v)
                  }
                }}>
                <DialogTrigger onClick={() => setIsOpen2(true)} asChild>
                  <h1 className='cursor-pointer'>Add your link</h1>
                </DialogTrigger>
                <DialogContent>
                  <LinkEditor />
                </DialogContent>
              </Dialog>
              </div>
            </div>
        </div>
        <div className='flex flex-col bg-white rounded-lg shadow-xl'>
          <div className='flex w-full h-32 rounded-t-lg items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='flex flex-row justify-end items-end gap-2 '>
              <BsCashCoin  className="w-12 h-12 text-white" />
              <BsCashCoin  className="w-16 h-16 text-white" />
              <BsCashCoin  className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className='flex flex-col w-full gap-2 p-4 h-36 justify-between'>
              <h1 className='text-lg font-semibold'>
                You can choose any product from our store.
              </h1>
              <div className='flex w-full p-2 items-end justify-end text-lg font-semibold text-blue-500'>
                <Link href={"/seller"}>
                  Seller panel
                </Link>
              </div>
            </div>
        </div>
      </div>
    ]} 
     </>           
  )
}

export default linksList