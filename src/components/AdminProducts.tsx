import { trpc } from '@/app/_trpc/Client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { toast } from './ui/use-toast'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import EditProduct from './EditProduct'

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
        <div className='flex w-full flex-col items-center justify-center p-5 bg-white border-zinc-300 border-2 rounded-lg hover:shadow-xl'>
            <input type="text" placeholder='Search by title' className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'
            onChange={(event) => (handleQuery(event.currentTarget.value))}
            />
            {getProducts && getProducts.length > 0 ? (
                getProducts.map((item) => {
                    return (

                        <div key={item.id} className='flex bg-zinc-50 rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-between items-center w-full my-1' >
                            <div className='flex text-lg font-semibold items-center justify-center'>
                                {item.productTitle}
                            </div>
                            <div className='flex flex-row'>
                            <Dialog open={isOpen} onOpenChange={(v) => {
                          if(!v) {
                              setIsOpen(v)
                          }
                      }}>
                                <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                                    <AiOutlineEdit className=" text-4xl bg-blue-200 hover:bg-blue-300 rounded-lg p-1 m-1 " />
                                </DialogTrigger>
                                <DialogContent>
                                    <EditProduct productId={item.id} />
                                </DialogContent>
                                </Dialog>

                                <AiOutlineDelete className=" text-4xl bg-red-200  hover:bg-red-300 rounded-lg p-1 m-1 cursor-pointer " 
                                onClick={() => (deleteProduct({id: item.id}))}
                                />
                            </div>
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
            ):[]}
            
        </div>
    </>
  )
}

export default AdminProducts