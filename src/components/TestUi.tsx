"use client"


import {isMobile} from 'react-device-detect'
import SliderShow from './SliderShow';
import { Loader2 } from 'lucide-react';
import { trpc } from '@/app/_trpc/Client';
import Link from 'next/link';
import { FaArrowRight} from 'react-icons/fa';
import { notFound } from 'next/navigation';
import ProductTopBar from './ProductTopBar';
import Image from 'next/image'

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

const  TestUi = (props: {username: typeOb}) => {

  

  const {mutate: addNewVisitGo} = trpc.addNewVisit.useMutation({})
  const {data: links, isLoading, isError} = trpc.getLinkById.useQuery({user: props.username.id})
  const theme = trpc.getThemeData.useQuery({themeNum: props.username.theme})

  if (theme.isLoading) return(<div className='w-full mt-24 flex justify-center'>
    <div className='flex flex-col items-center gap-2'>
      <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
    </div>
  </div>)
  if (!theme.data) return notFound()
  const themeBg = theme.data.themeBg
  
  function handleClick (reserveLink: string, urlToGo: string, getLinkId: string, getLinkUserId: string | null, event: React.MouseEvent<HTMLElement>) {
    
    addNewVisitGo({linkType: "LINK",linkId: getLinkId,userId: getLinkUserId})
    
      var request = new XMLHttpRequest();  
      request.open('GET', urlToGo, true);  
      request.send(); 

      if (request.status) {
        request.open('GET', reserveLink, true);  
        request.send();  
      }  
  }
 
  
    window.document.title = `My-Rabit.com |  ${props.username.username}`
  
    
  return (
  <>
    
    <div className={`flex items-center justify-end w-full h-full relative`}>
      <div className='absolute w-screen h-screen rounded-full blur-2xl z-0 opacity-75 '>
        <Image src={props.username.avatar} className='absolute h-full w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0' 
        height={1} width={1} alt={"product image"}/>

      </div>
      

      <div className="flex flex-col rounded-2xl h-screen w-full justify-start relative">

        <ProductTopBar user={props.username} />
        
        <div className='grid lg:px-32 2xl:px-52 lg:grid-cols-2 2xl:grid-cols-2 w-full transition-all duration-700 ease-in-out'>
        {links && links?.length !== 0  ? (
        links.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((link) => {
          
          
          let urlVer = link.linkUrl
          if (isMobile) {urlVer = link.linkUrlApp}
          
          return <Link key={link.id} href={link.linkUrl} >

            <div onClick={(event) =>{event.stopPropagation(); handleClick(link.linkUrl,urlVer,link.id,link.userId,event)}} 
            className="flex flex-row border-[2px] rounded-full items-center mx-[10px] my-[2px] px-2 py-3 shadow-xl hover:shadow-2xl hover:mx-5 transition-all duration-200 ease-in-out border-black bg-zinc-200 bg-opacity-25 ">
              <div className='flex flex-col items-center justify-center w-full relative'>
                <div className='absolute right-1 px-2'>
                  <FaArrowRight className="h-[20px] w-[20px] " />
                </div>
                <h1 className={`flex w-full h-full items-center justify-start pl-[10px] text-xl font-semibold text-black`}>
                {link.linkTitle}
                </h1>
              </div>
            </div>
          </Link>
          
        })
        ):  null} 
    </div>

    <div className='flex flex-row items-center justify-center mx-[10px]  p-[2px]'>
      <SliderShow userId={props.username.id} username={props.username.username} />
    </div>
      
    </div>
      
    </div>
    
    </>
  )
}

export default TestUi