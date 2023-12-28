import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
import {  useState } from "react"
import { Switch } from "./ui/switch"
import { format } from 'date-fns'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'

const AdminProductEdit = (params: {productId: string}) => {


    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [vars, setVars] = useState("")
    const [price, setPrice] = useState("")
    const [userComm, setUserComm] = useState(0)
    const [authorComm, setAuthComm] = useState(0)
    const [cat, setCat] = useState("")
    const [productCat, setProductCat] = useState("")

    const {data: getProduct, isLoading} = trpc.getProductsById.useQuery({query: params.productId})
    const {data: getCats } = trpc.getAllCats.useQuery()

    

    if (isLoading) {
        return (
            <div className='flex w-full mt-2 justify-center items-center'>
                <div className='flex flex-col w-full justify-center items-center gap-2'>
                    <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                    <h3 className='font-semibold text-xl'>
                    Getting Products from database
                    </h3>
                </div>
            </div>
        )
    }
    if (!getProduct) {
        return (
            <div className='flex w-full mt-2 justify-center items-center'>
                <div className='flex flex-col w-full justify-center items-center gap-2'>
                    <h3 className='font-semibold text-xl'>
                        There is no product with this ID
                    </h3>
                </div>
            </div>
        )
    }


  return (
            <div className='flex w-full p-4 items-center justify-center'>
                <div className='flex flex-col w-full bg-white border-2 border-zinc-400 p-2 gap-2 rounded-lg'>
                    <h1 className='flex text-2xl font-semibold'>
                        Edit product
                    </h1>
                    <h1 className='flex text-md font-semibold'>
                        User : {getProduct.User?.username} <br /> created at : {format(new Date(getProduct.createdAt), "dd MMM yyyy")}
                    </h1>
                    <input type="text" value={getProduct.productTitle} placeholder='Product title' onChange={(event) => (setTitle(event.target.value))} 
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    <input type="text" value={getProduct.productVar} placeholder='Product variables' onChange={(event) => (setVars(event.target.value))} 
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    <textarea onChange={(event) => setDesc(event.target.value)}
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1 h-40'>{getProduct.productDesc}</textarea>
                    <input type="text" value={getProduct.productPrice} placeholder='User commision' onChange={(event) => (setPrice(event.target.value))} 
                    className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    <div className='flex flex-row items-center justify-between w-full gap-2'>
                        <input type="text" value={getProduct.productCommision} placeholder='User commision' onChange={(event) => (setUserComm(event.target.valueAsNumber))} 
                        className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                        <input type="text" value={getProduct.productAuthCommision} placeholder='Author commision' onChange={(event) => (setAuthComm(event.target.valueAsNumber))} 
                        className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' />
                    </div>
                    <select 
                    onChange={(event) => (setProductCat(event.currentTarget.value))}
                    name="parentCat" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'>
                        <option value={getProduct.Category?.id}>
                            {getProduct.Category?.catTitle}
                        </option>
                        {getCats && getCats.length > 0 ? (
                        
                        getCats.map((cat) => {
                            return (<option key={cat.id} value={cat.id}>
                                {cat.catTitle}
                            </option>)

                        })): null}
                    </select>
                    <div className="grid grid-cols-3 w-full items-center justify-center gap-2">
                        {getProduct.productImg && getProduct.productImg.length > 0 ? (
                            getProduct.productImg.map((img, index) => {
                                return (
                                    <>
                                    <div className="relative w-full items-center justify-center" key={index}>
                                        <Image width={100} height={120} className="h-[120px] w-[100px] rounded-lg " src={img} alt={"Product image"}/>
                                    </div>
                                    
                                    </>
                                )
                            })
                        ): [] }
                    </div> 
                    
                    {getProduct.productSrc  ? (
                        <div className="flex text-green-700 w-full items-center justify-center text-lg font-semibold py-2">
                            File source uploaded
                        </div>
                    ): [
                        <div className="flex text-red-700 w-full items-center justify-center text-lg font-semibold py-2">
                            File source missing
                        </div>
                    ]}
                    <button 
                    
                    className='bg-black text-white font-semibold rounded-lg py-2 px-5 my-1'>
                        Add new product
                    </button>
                </div>
            </div>     
       
    )
}

export default AdminProductEdit