import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FiYoutube } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io5'
import { PiFacebookLogoBold, PiSnapchatLogoBold } from 'react-icons/pi'
import { TbBrandTiktok } from 'react-icons/tb'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { FaArrowRight } from 'react-icons/fa'

const page = () => {
  return (
    <div className='flex flex-col w-full items-center justify-center bg-zinc-200'>
        <div className='flex flex-col w-full 2xl:w-[720px] lg:w-[720px] h-screen relative  shadow-2xl'>
            <div className='fixed w-full h-full  '>
                <Image src={"/background1.jpg"} height={720} width={720} alt={"product image"}
                className='absolute h-full w-full 2xl:w-[720px] lg:w-[720px]] top-0 left-0 opacity-80  z-0' 
                />
            </div>
            <div className='flex flex-col w-full justify-center items-center p-[5px] mt-[10px] mb-[5px] 2xl:col-span-3 lg:col-span-2 z-10'>
                <Avatar className='h-[150px] w-[150px] shadow-2xl items-center'>
                    <AvatarImage src={"/avatar.jpg"}/>
                    <AvatarFallback><Loader2 className='h-[50px] w-[50px] animate-spin '/></AvatarFallback>
                </Avatar>
                <h1 className='text-2xl font-bold mt-2'>
                    Founder
                </h1>
                <h1 className='text-lg font-semibold '>
                    Founder of My-Rabit.com / Content creator
                </h1>
                <div className='flex flex-row gap-2 w-full items-center justify-center'>
                    <Link href={"props.user.youtubeLink"} 
                    className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                        <FiYoutube className="w-[35px] h-[35px]" />
                    </Link>
                    <Link href={"props.user.instagramLink"} 
                    className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                        <IoLogoInstagram className="w-[35px] h-[35px]" />
                    </Link>
                    <Link href={"props.user.facebookLink"} 
                    className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                        <PiFacebookLogoBold className="w-[35px] h-[35px]" />
                    </Link>
                    <Link href={"props.user.snapchatLink"} 
                    className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                        <PiSnapchatLogoBold className="w-[35px] h-[35px]" />
                    </Link>
                    <Link href={"props.user.tiktokLink"} 
                    className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                        <TbBrandTiktok className="w-[35px] h-[35px]" />
                    </Link>
                    <Link href={"props.user.linkedLink"} 
                    className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                        <AiOutlineLinkedin className="w-[35px] h-[35px]" />
                    </Link>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 w-full'>
                    <Link  href={"link.linkUrl"} >
                        <div className="flex flex-row border-[2px] rounded-full items-center mx-[10px] my-[2px] px-2 py-3 shadow-xl hover:shadow-2xl hover:mx-5 transition-all duration-200 ease-in-out border-black bg-zinc-200 bg-opacity-25 ">
                            <div className='flex flex-col items-center justify-center w-full relative'>
                                <div className='absolute right-1 px-2'>
                                    <FaArrowRight className="h-[20px] w-[20px] " />
                                </div>
                                <h1 className={`flex w-full h-full items-center justify-start pl-[10px] text-xl font-semibold text-black`}>
                                    Link 1
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <Link  href={"link.linkUrl"} >
                        <div className="flex flex-row border-[2px] rounded-full items-center mx-[10px] my-[2px] px-2 py-3 shadow-xl hover:shadow-2xl hover:mx-5 transition-all duration-200 ease-in-out border-black bg-zinc-200 bg-opacity-25 ">
                            <div className='flex flex-col items-center justify-center w-full relative'>
                                <div className='absolute right-1 px-2'>
                                    <FaArrowRight className="h-[20px] w-[20px] " />
                                </div>
                                <h1 className={`flex w-full h-full items-center justify-start pl-[10px] text-xl font-semibold text-black`}>
                                    Link 1
                                </h1>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default page