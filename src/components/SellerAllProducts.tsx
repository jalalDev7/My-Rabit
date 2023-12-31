import { trpc } from "@/app/_trpc/Client"
import Link from "next/link"
import {  AiOutlineShoppingCart } from "react-icons/ai"
import { MdAddTask } from "react-icons/md"
import { toast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import Image from 'next/image'
import { FaEye } from "react-icons/fa6"



const SellerAllProducts = () => {
    document.title = `My-Rabit.com | Products`

    const utils = trpc.useContext()

    const {data: allShowenProducts, isLoading} = trpc.getAllShowenProduct.useQuery()

    const {data: getUserProducts} = trpc.getUserProducts.useQuery()

    const {data: getUser} = trpc.getUserInfo.useQuery()


    

    const {mutate: addaddUserProduct} = trpc.addNewUserProduct.useMutation({
        onSuccess: () => {
            utils.getUserChoosenProducts.invalidate()
            utils.getAllShowenProduct.invalidate()
            utils.getUserProducts.invalidate()

            //window.location.reload();
            return toast({
                title: "New product added",
                description: "Thanks you",
                variant: "success",
              })
        },
        onError: () => {
            return toast({
                title: "Somethings wrong",
                description: "Please retry",
                variant: "destructive",
              })
        }
        
      })

    const addUserProduct = (productId: string) => {
        addaddUserProduct({productId: productId})
    }

  return (
    <>
    <h1 className='text-xl mt-5 px-5'>
        All other products
    </h1>
    <div className='flex flex-col w-full items-start justify-start gap-4 p-4 lg:p-4 2xl:p-4'>
        {allShowenProducts && allShowenProducts.length > 0 ? (           
            
            allShowenProducts.map((item) => {

                if (!item.Product || item.Product.length == 0) return null

                const filteredArray  = item.Product.filter(function(full){
                    return getUserProducts?.filter(function(choosen){return choosen.productId == full.id}).length == 0
                });

                if (!filteredArray || filteredArray.length == 0) return null
                
                return (
                    <div key={item.id} className="flex flex-col w-full bg-white border-zinc-200 border-2 shadow-lg rounded-lg p-4">
                        <div className="flex flex-col w-full p-4 ">
                            <h1 className='text-lg font-semibold'>
                                {item.catTitle}
                            </h1> 
                        </div>
                        <div className="flex flex-col w-full">
                            <div className='grid grid-col-1 lg:grid-cols-3 2xl:grid-cols-4  justify-center items-center gap-4'>
                            {filteredArray.map((product) => {
                                return (
                                    <div key={product.id}  className='flex flex-col w-full rounded-lg shadow-md p-2 border-zinc-200 border '>
                                        <div className='flex flex-col w-full'>
                                            <div className="flex flex-col w-full items-center justify-center ">
                                                <div className="flex w-full items-center justify-center border-2 border-zinc-200 rounded-lg bg-gradient-to-t from-slate-300 to-slate-500 p-2">
                                                    <Image src={product.productImg[0]} height={200} width={200} alt={"product image"} />
                                                </div>
                                                <div className="p-2 flex flex-col w-full justify-between items-start">
                                                    <h1 className="text-md lg:text-lg 2xl:text-lg font-bold items-start px-2 truncate">
                                                        {product.productTitle.slice(0,32)}...
                                                    </h1> 
                                                    <div className="flex flex-row justify-between items-center w-full">
                                                        <h3 className="flex items-center justify-start w-full text-md font-semibold py-1 border-r-2 border-zinc-200 ml-4">
                                                                Price: <br />{product.productPrice} MAD
                                                        </h3>
                                                        <h3 className="flex items-center justify-start w-full text-sm font-semibold ml-4">
                                                                Commision: <br />{product.productCommision} MAD
                                                        </h3>
                                                    </div>
                                                </div>     
                                            </div>
                                            <div className='flex flex-row border-t-2 w-full border-zinc-200 items-center justify-between h-full px-2 relative'>
                                                <div className='flex flex-row gap-2 justify-center items-center font-semibold'>
                                                    <AiOutlineShoppingCart className="h-[30px] w-[30px] text-green-700 " />
                                                    {product.orders.length}
                                                </div>
                                                    <div className='flex flex-row items-center '>
                                                        <Link href={`/product/${product.productLinkTitle}/${getUser?.username}`} target="_blank">
                                                            <FaEye  className=" text-4xl bg-zinc-200 hover:bg-zinc-300 rounded-lg p-1 m-1 " />
                                                        </Link>
                                                            <MdAddTask className=" text-4xl bg-blue-200 hover:bg-blue-300 rounded-lg p-1 m-1 cursor-pointer " 
                                                            onClick={() => (addUserProduct(product.id))}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                )
                                

                            })}
                            </div>
                        </div>
                    </div>

                )
            })
        ): isLoading ? (
            <div className='mt-10 flex justify-center w-full items-center lg:col-span-3 2xl:col-span-4'>
                <div className='flex flex-col items-center gap-2 w-full justify-center '>
                    <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                    <h3 className='font-semibold text-xl'>
                    Getting your products from database...
                    </h3>
                </div>
            </div>
        ): []}
        </div>
        
    </>
  )
}

export default SellerAllProducts