import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import Image from 'next/image'

interface productType {
    id: string,
    productTitle: string,
    productDesc: string,
    productVar: string,
    productCatId: string | null,
    productImg: string[],
    productState: boolean,
    productPrice: string,
    productCommision: number,
    productCatAdd: string,
}

const AdminProducts = () => {

    const [isOpen,setIsOpen] = useState<boolean>()

    const utils = trpc.useContext()

    const [searchQ, setSearchQ] = useState("")
    
    const {data: getProducts, isLoading, isError} = trpc.getProductsByTitle.useQuery({query: searchQ})

    
    const handleQuery = (query: string) => {
        setSearchQ(query)
        utils.getProductsByTitle.invalidate()
    }
    const {mutate: deleteProduct} = trpc.deleteProduct.useMutation({
        onSuccess: () => {
          utils.getProductsByTitle.invalidate()
          toast({
            title: "Product deleted",
            description: "Thank you",
            variant: "success",
          })
        },
    })

      
  return (
    <>
        <h1 className='text-2xl mt-10 px-5 mb-2'>
            All Products
        </h1>
        <div className='w-full p-4'>
            <div className='flex w-full shadow-md border-2 border-zinc-300 bg-white p-2 rounded-lg'>
                <div className='grid grid-cols-2 lg:grid-cols-8 2xl:grid-cols-8 gap-2 items-start justify-center w-full'>
                {getProducts && getProducts.length > 0 ? (

                getProducts.map((product, index) => {

                    return (
                    <div key={index} className='flex flex-col border-2 border-zinc-400 bg-zinc-100 rounded-lg relative '>
                        <div className='flex p-2'>
                            <div className='flex rounded-lg w-full justify-center bg-gradient-to-t from-slate-300 to-slate-500'>
                                <Image src={product.productImg[0]} height={150} width={150} alt={"Product image"} />
                            </div>
                        </div>
                        <div className='flex flex-row items-start justify-between w-full py-1 px-2 gap-1'>
                            <button
                            className='flex w-full text-lg text-white items-center justify-center bg-blue-500 border-2 border-blue-700 rounded-lg px-2 font-semibold'>
                                <Link href={`/admin?mode=edit&product=${product.id}`}>Edit</Link>
                            </button>
                            <button onClick={() => (deleteProduct({id: product.id}))}
                            className='flex w-full text-lg items-center text-white justify-center bg-red-500 border-2 border-red-700 rounded-lg px-2 font-semibold'>
                                Delete
                            </button>
                        </div>
                        {product.productState == "ACTIF" ? (
                            <div className='absolute top-0 left-0 bg-green-500 text-white px-4 py-1 shadow-lg text-sm font-bold rounded-br-lg rounded-tl-md'>
                                Accepted
                            </div>
                        ): product.productState == "HIDDEN" ? (
                            <div className='absolute top-0 left-0 bg-red-500 text-white px-4 py-1 shadow-lg text-sm font-bold rounded-br-lg rounded-tl-md'>
                                Rejected
                            </div>
                        ):product.productState == "PRIVATE" ? (
                            <div className='absolute top-0 left-0 bg-blue-500 text-white px-4 py-1 shadow-lg text-sm font-bold rounded-br-lg rounded-tl-md'>
                                Private
                            </div>
                        ): null }
                        
                    </div>
                    )
                    })
                    ): isLoading ? (
                        <div className='w-full mt-2 flex justify-center'>
                            <div className='flex flex-col items-center gap-2'>
                                <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                                <h3 className='font-semibold text-xl'>
                                Getting Products from database
                                </h3>
                            </div>
                        </div>
                    ): isError ? (
                        <div className='w-full mt-2 flex justify-center'>
                            <div className='flex flex-col items-center gap-2'>
                                <h3 className='font-semibold text-xl'>
                                0 Product found
                                </h3>
                            </div>
                        </div>
                    ): null}
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminProducts