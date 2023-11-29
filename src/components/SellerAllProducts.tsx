import { trpc } from "@/app/_trpc/Client"
import Link from "next/link"
import {  AiOutlineShoppingCart } from "react-icons/ai"
import { MdAddTask } from "react-icons/md"
import {CiBookmarkRemove} from "react-icons/ci"
import { GrOverview } from "react-icons/gr"
import { toast } from "./ui/use-toast"
import { Loader2 } from "lucide-react"
import Image from 'next/image'



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
    <div className='flex flex-col w-full items-start justify-start gap-4 p-4'>
        {allShowenProducts && allShowenProducts.length > 0 ? (           
            
            allShowenProducts.map((item) => {

                if (!item.Product || item.Product.length == 0) return null

                        const filteredArray  = item.Product.filter(function(full){

                            return getUserProducts?.filter(function(choosen){
                            return choosen.productId == full.id;
                            }).length == 0
                        });
                        if (!filteredArray || filteredArray.length == 0) return null
                return (
                    <>
                    <div key={item.id} className="flex flex-col w-full gap-2">
                           <h1 className='text-lg font-semibold mt-5 px-5'>
                                {item.catTitle}
                            </h1> 
                        
                            <div className='grid lg:grid-cols-3 2xl:grid-cols-4 bg-white rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-center items-center  w-full'>
                        {filteredArray.map((product) => {
                            
                            return (<>
                                
                                    <div key={product.id}  className='flex flex-col bg-zinc-50 rounded-lg shadow-md border-zinc-200 border-[1px] w-full'>
                                        <div className="flex flex-row relative w-full ">
                                        <div className='flex flex-row justify-between items-start w-full m-1'>
                                            <div className="flex flex-col w-full">
                                                <div className="flex items-center justify-center border-2 border-zinc-200 rounded-lg  p-1">
                                                    <Image src={product.productImg[0]} className='h-[250px] w-[250px] rounded-lg'
                                                    height={250} width={250} alt={"product image"}  />
                                                </div>
                                                <div className="p-2 flex flex-col w-full justify-between items-start">
                                                   <h1 className="text-lg font-bold flex items-start ml-2">
                                                    {product.productTitle}
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
                                            <div className='flex flex-col border-l-2 border-zinc-200 items-center justify-start h-full p-3 relative'>
                                                
                                                <div className='flex flex-col justify-center items-center font-semibold'>
                                                    <AiOutlineShoppingCart className="h-[30px] w-[30px] text-green-700 " />
                                                    {product.orders.length}
                                                </div>
                                                <div className='justify-end items-center absolute bottom-2 '>
                                                    <Link href={`/product/${product.id}/${getUser?.username}`}>
                                                        <GrOverview className=" text-4xl bg-zinc-200 hover:bg-zinc-300 rounded-lg p-1 m-1 " />
                                                    </Link>
                                                        <MdAddTask className=" text-4xl bg-blue-200 hover:bg-blue-300 rounded-lg p-1 m-1 cursor-pointer " 
                                                        onClick={() => (addUserProduct(product.id))}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                
                            </>)
                            

                        })}
                        </div>
                    </div>
                    </>
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