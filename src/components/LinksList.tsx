import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {AiOutlineDelete, AiOutlineEdit, AiFillEye} from "react-icons/ai"
import UploadButton from './UploadButton'


const linksList = () => {
  
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
    <div className='flex flex-col lg:flex-row 2xl:flex-row gap-2 justify-between w-full items-start px-4 mt-4'>
      <h1 className='text-2xl'>
          Your links
      </h1>
      <div>
        <UploadButton />
      </div>
    </div>
    {links && links.length > 0 ? (
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
            </div>)
})}
    </div> 
    ) : isLoading ? (
      <div className='w-full mt-4 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>
          Getting your links from database...
        </h3>
      </div>
    </div>
    ) : [
      <div className='w-full mt-4 flex justify-start px-4'>

        <h3 className='text-xl'>
          There is no links right now, you can add more links.
        </h3>
    </div>
    ]} 
     </>           
  )
}

export default linksList