"use client"
import { trpc } from '@/app/_trpc/Client'
import React, { useState } from 'react'

const test = () => {

    const {mutate: deletephoto} = trpc.deletePhoto.useMutation()
    const [imgName, setImgName] = useState("")
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
        <input type="text" placeholder='image name' 
        onChange={(event) => (setImgName(event.currentTarget.value))}
        />
        <button
        onClick={() => (deletephoto({imgName: imgName}))}
        >
            delete
        </button>
    </div>
  )
}

export default test