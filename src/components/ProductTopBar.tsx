import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Loader2 } from 'lucide-react'
import {FiYoutube} from 'react-icons/Fi'
import Link from 'next/link'
import { IoLogoInstagram } from 'react-icons/io5'
import { PiFacebookLogoBold, PiSnapchatLogoBold } from 'react-icons/pi'
import {TbBrandTiktok } from 'react-icons/tb'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { FaArrowLeft } from 'react-icons/fa'

interface typeOb   {
  id: string,
  email: string,
  username: string,
  createdAt: Date,
  avatar: string,
  theme: number,
  isSeller: string
  youtubeLink: string,
  facebookLink: string,
  instagramLink: string,
  tiktokLink: string,
  snapchatLink: string,
  linkedLink: string,
  
}

const productTopBar = (props: {user: typeOb}) => {
  return (
    <div className='flex flex-col w-full justify-center items-center p-[5px] mt-[10px] mb-[5px] 2xl:col-span-3 lg:col-span-2'>
          <Avatar className='h-[150px] w-[150px] items-center'>
            <AvatarImage src={props.user.avatar}/>
            <AvatarFallback><Loader2 className='h-[50px] w-[50px] animate-spin '/></AvatarFallback>
          </Avatar>
          <h1 className='text-2xl font-bold mt-2'>
            @{props.user.username}
          </h1>
          <div className='flex flex-row gap-2 w-full items-center justify-center'>
            {props.user.youtubeLink ? (
              <Link href={props.user.youtubeLink} 
              className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                <FiYoutube className="w-[35px] h-[35px]" />
              </Link>
            ): null}

            {props.user.instagramLink ? (
              <Link href={props.user.instagramLink} 
              className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                <IoLogoInstagram className="w-[35px] h-[35px]" />
              </Link>
            ): null}

            {props.user.facebookLink ? (
              <Link href={props.user.facebookLink} 
              className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                <PiFacebookLogoBold className="w-[35px] h-[35px]" />
              </Link>
            ): null}

            {props.user.snapchatLink ? (
              <Link href={props.user.snapchatLink} 
              className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                <PiSnapchatLogoBold className="w-[35px] h-[35px]" />
              </Link>
            ): null}

            {props.user.tiktokLink ? (
              <Link href={props.user.tiktokLink} 
              className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                <TbBrandTiktok className="w-[35px] h-[35px]" />
              </Link>
            ): null}

            {props.user.linkedLink ? (
              <Link href={props.user.linkedLink} 
              className='flex p-1 hover:bg-zinc-100/25 rounded-full transition-all duration-700 ease-in-out '>
                <AiOutlineLinkedin className="w-[35px] h-[35px]" />
              </Link>
            ): null}
          </div>
        </div>
        
  )
}

export default productTopBar