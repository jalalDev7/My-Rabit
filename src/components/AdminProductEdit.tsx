import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
import {  useState } from "react"
import { Switch } from "./ui/switch"

const AdminProductEdit = (params: {productId: string}) => {

    const {data: getProduct, isLoading} = trpc.getProductsById.useQuery({query: params.productId})

    

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [vars, setVars] = useState("")
    const [imgs, setImgs] = useState<String[]>()
    const [price, setPrice] = useState("")
    const [userComm, setUserComm] = useState(0)
    const [authorComm, setAuthComm] = useState(0)
    const [src, setSrc] = useState("")
    const [state, setState] = useState(false)
    const [cat, setCat] = useState("")

  return (<>
        {getProduct ? () => {

            setTitle(getProduct.productTitle)
            setDesc(getProduct.productDesc)
            setVars(getProduct.productVar)
            setImgs(getProduct.productImg)
            setPrice(getProduct.productPrice)
            setUserComm(getProduct.productCommision)
            setAuthComm(getProduct.productAuthCommision)
            setSrc(getProduct.productSrc)
            setState(getProduct.productState)
            
            
            return (
            <div className='flex w-full p-4 items-center justify-center'>
                <div className='flex flex-col w-full bg-white border-2 border-zinc-400 p-2 gap-2'>
                    <h1 className='flex text-2xl font-semibold'>
                        Edit product
                    </h1>
                    <input type="text" value={title} placeholder='Product title' onChange={(event) => (setTitle(event.target.value))} 
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    <input type="text" value={vars} placeholder='Product variables' onChange={(event) => (setVars(event.target.value))} 
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    <textarea onChange={(event) => setDesc(event.target.value)}
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'>{desc}</textarea>
                    <input type="text" value={price} placeholder='User commision' onChange={(event) => (setVars(event.target.value))} 
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    <div className='flex flex-row items-center justify-between w-full'>
                        <input type="text" value={userComm} placeholder='User commision' onChange={(event) => (setVars(event.target.value))} 
                        className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                        <input type="text" value={authorComm} placeholder='Author commision' onChange={(event) => (setVars(event.target.value))} 
                        className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    </div>
                    <div className="flex w-full justify-start items-center text-md font-semibold">
                        <Switch className="m-1"
                        checked={state}
                        onCheckedChange={() => (setState(!state))}
                        /> Hidden product
                    </div>
                </div>
            </div>
        )
        }: isLoading ? (
            <div className='flex w-full mt-2 justify-center items-center'>
                <div className='flex flex-col w-full justify-center items-center gap-2'>
                    <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                    <h3 className='font-semibold text-xl'>
                    Getting Products from database
                    </h3>
                </div>
            </div>
        ): null}
        
       
    </>)
}

export default AdminProductEdit