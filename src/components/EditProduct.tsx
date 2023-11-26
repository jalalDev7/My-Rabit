import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import Dropzone from "react-dropzone"
import { Cloud,  File, Loader2 } from "lucide-react"
import { Progress } from "./ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from "./ui/use-toast"
import { Switch } from "./ui/switch"
import {MdDelete} from "react-icons/md"
import { trpc } from "@/app/_trpc/Client"


const EditProduct = (props: {productId: string}) => {
    const utils = trpc.useContext()
    const [productTitle, setProductTitle] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [productVar, setProductVar] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productCommision, setProductCommision] = useState(0)
    const [hiddenProduct , setHiddenProduct] = useState<boolean>(false)

    const ref1 = useRef()    

    const {mutate: editProduct} = trpc.editProduct.useMutation({
        onSuccess: () => {
            utils.getAllCats.invalidate()
            setProductTitle("")
            setProductDesc("")
            setProductVar("")
            setHiddenProduct(false)
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

    const addNewProduct = () => {
        if (!productTitle || !productDesc || !productVar) {
            return toast({
                title: 'Please check all fields',
                description: 'Some fields is empty',
                variant: 'destructive',
            })
        } 
        
        editProduct({
            productId: props.productId,
            productTitle: productTitle,
            productDesc: productDesc,
            productVar: productVar,
            productState: hiddenProduct,
            productPrice: productPrice,
            productCommision: productCommision
        })

    }
    
    const getproduct = trpc.getProductsById.useQuery({query: props.productId})

    if (getproduct.isLoading) return(<Loader2 className='h-8 w-8 animate-spin text-zinc-800' />)
    if (getproduct.isError || !getproduct.data) return("error")

    




    
    
    
      
      
  return (<>

        <h1 className='text-2xl mt-10 px-5 mb-2'>
            Add new product
        </h1>
        <div className='flex w-full flex-col items-center justify-center p-5 bg-white border-zinc-300 border-2 rounded-lg hover:shadow-xl'>
            <input
            value={getproduct.data.productTitle}
            onChange={(event) => (setProductTitle(event.currentTarget.value))}
            type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Product title' />
            <textarea 
            value={getproduct.data.productDesc}
            onChange={(event) => (setProductDesc(event.currentTarget.value))}
            className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1 h-[200px] resize-none' placeholder='Product description' ></textarea>
            <textarea 
            value={getproduct.data.productVar}
            onChange={(event) => (setProductVar(event.currentTarget.value))}
            className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1 h-[100px] resize-none' placeholder='Product variables, exemple: Small,Meduim,large,...' ></textarea>
            <div className="flex flex-row w-full justify-between items-center py-1">
                <input
                value={getproduct.data.productPrice}
                onChange={(event) => (setProductPrice(event.currentTarget.value))}
                type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 mr-1' placeholder='Product price' />
                <input
                value={getproduct.data.productCommision || ""}
                onChange={(event) => (setProductCommision(event.currentTarget.valueAsNumber))}
                type="number" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Product commision' />
            </div>
            <div className="flex w-full justify-start items-center text-md font-semibold">
                <Switch className="m-1"
                      checked={getproduct.data.productState}
                      onCheckedChange={() => (setHiddenProduct(!hiddenProduct))}
                    /> Hidden product
            </div>
            <button 
            onClick={() => (addNewProduct())}
            className='bg-black text-white font-semibold rounded-lg py-2 px-5 my-1'>
                Add new product
            </button>
        </div>
    </>
  )
}

export default EditProduct