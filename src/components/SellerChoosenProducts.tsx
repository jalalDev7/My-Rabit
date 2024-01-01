import { trpc } from "@/app/_trpc/Client"
import Link from "next/link"
import {  AiOutlineShoppingCart } from "react-icons/ai"
import {CiBookmarkRemove} from "react-icons/ci"
import { toast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import Image from 'next/image'
import { FaEye } from "react-icons/fa6"

const SellerChoosenProducts = () => {
    
    const utils = trpc.useContext()

    const {data: getUser} = trpc.getUserInfo.useQuery()
    const {data: getUserProducts, isLoading} = trpc.getUserChoosenProducts.useQuery()


    const {mutate: deleteUserProductT} = trpc.deleteUserProduct.useMutation({
        onSuccess: () => {
            utils.getUserChoosenProducts.invalidate()
            utils.getAllShowenProduct.invalidate()
            utils.getUserProducts.invalidate()
            //window.location.reload();
            return toast({
                title: "Prodect deleted from your page",
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

      const deleteUserProduct = (productId: string) => {
        deleteUserProductT({id: productId})
    }

  return (
    <>
    <h1 className='text-xl mt-5 px-5'>
        Choosen Products
    </h1>
    <div className='flex flex-col w-full items-start justify-center p-4'>
    <div className='grid lg:grid-cols-3 2xl:grid-cols-4 bg-white rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-center items-center gap-4  w-full'>
        {getUserProducts && getUserProducts.length > 0 ? (

            getUserProducts.map((item) => {

                return (                    
                        <div key={item.id} className='flex flex-col bg-zinc-50 rounded-lg shadow-md border-zinc-200 border-[1px] w-full'>
                            <div className="flex flex-row relative w-full ">
                            <div className='flex flex-col justify-between items-start w-full m-1'>
                                <div className="flex flex-col w-full">
                                    <div className="flex items-center justify-center border-2 border-zinc-200 rounded-lg bg-gradient-to-t from-slate-300 to-slate-500 p-1">
                                        <Image src={item.productImg[0]} className='h-[250px] w-[250px] rounded-lg' 
                                        height={250} width={250} alt={"product image"}/>
                                    </div>
                                    <div className="p-2 flex flex-col w-full justify-between items-start">
                                       <h1 className="text-lg font-bold flex items-start ml-2">
                                        {item.productTitle.slice(0,50)}...
                                        </h1> 
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <h3 className="flex items-center justify-start w-full text-md font-semibold py-1 border-r-2 border-zinc-200 ml-4">
                                                Price: <br />{item.productPrice} MAD
                                            </h3>
                                            <h3 className="flex items-center justify-start w-full text-sm font-semibold ml-4">
                                                Commision: <br />{item.productCommision} MAD
                                            </h3>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='flex flex-row border-t-2 w-full border-zinc-200 items-center justify-between h-full p-1 relative'>
                                    
                                    <div className='flex flex-row gap-2 justify-center items-center font-semibold'>
                                        <AiOutlineShoppingCart className="h-[30px] w-[30px] text-green-700 " />
                                        {item.orders.length}
                                    </div>
                                    <div className='flex flex-row items-center '>
                                        <Link href={`/product/${item.id}/${getUser?.username}`} target="_blank">
                                            <FaEye  className=" text-4xl bg-zinc-200 hover:bg-zinc-300 rounded-lg p-1 m-1 " />
                                        </Link>

                                        <Link href="">
                                            <CiBookmarkRemove className=" text-4xl bg-red-200  hover:bg-red-300 rounded-lg p-1 m-1 " 
                                            onClick={() => (deleteUserProduct(item.id))}
                                            />
                                        </Link>
                                    </div>
                                </div>
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
        ): [
            <div className='flex justify-center w-full items-center lg:col-span-3 2xl:col-span-4'>
                <div className='flex flex-col items-center gap-2 w-full justify-center '>
                    <h3 className='font-semibold text-xl'>
                        Please choose some products to sell.
                    </h3>
                </div>
            </div>
        ] }
        </div>
    </div>
    </>
  )
}

export default SellerChoosenProducts