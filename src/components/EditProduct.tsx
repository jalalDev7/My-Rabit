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
import Image from 'next/image'
import { string } from "zod"


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

const EditProduct = (getProductData: {productId: productType }) => {

    
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const { startUpload } = useUploadThing("productImage")

    const [productTitle, setProductTitle] = useState(getProductData.productId.productTitle)
    const [productDesc, setProductDesc] = useState(getProductData.productId.productDesc)
    const [productVar, setProductVar] = useState(getProductData.productId.productVar)
    const [productPrice, setProductPrice] = useState(getProductData.productId.productPrice)
    const [productCommision, setProductCommision] = useState(getProductData.productId.productCommision)
    const [hiddenProduct , setHiddenProduct] = useState<boolean>(getProductData.productId.productState)
    const [productImg , setProductImg] = useState<string[]>(getProductData.productId.productImg)

    const [isOpen,setIsOpen] = useState<boolean>()

    const [isUploadng, setIsUploading] = useState<boolean>(true)

    const {mutate: deletephoto} = trpc.deletePhoto.useMutation()

    const {mutate: editProduct} = trpc.editProduct.useMutation({
        onSuccess: () => {
            
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
            productId: getProductData.productId.id,
            productTitle: productTitle,
            productDesc: productDesc,
            productVar: productVar,
            productImg: productImg,
            productState: hiddenProduct,
            productPrice: productPrice,
            productCommision: productCommision
        })

    }
    
    const startSimilatedProgress = () => {
        setUploadProgress(0)

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval)
                    return prevProgress
                }
                return prevProgress + 5
            })
        }, 500)
        return interval
    }

    
    
    const deleteImg = (imgIndex: string) => {
        const newListImg = productImg.filter(item => item !== imgIndex)
        setProductImg(newListImg)

        deletephoto({imgName: imgIndex})

    }

    useEffect(() => {
        
        setIsOpen(false)

        return setUploadProgress(0)
    }, [productImg]);

      
      
  return (<>

        <h1 className='text-2xl mt-10 px-5 mb-2'>
            Add new product
        </h1>
        <div className='flex w-full flex-col items-center justify-center p-5 bg-white border-zinc-300 border-2 rounded-lg hover:shadow-xl'>
            <input
            value={productTitle}
            onChange={(event) => (setProductTitle(event.currentTarget.value))}
            type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Product title' />
            <textarea 
            value={productDesc}
            onChange={(event) => (setProductDesc(event.currentTarget.value))}
            className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1 h-[200px] resize-none' placeholder='Product description' ></textarea>
            <textarea 
            value={productVar}
            onChange={(event) => (setProductVar(event.currentTarget.value))}
            className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1 h-[100px] resize-none' placeholder='Product variables, exemple: Small,Meduim,large,...' ></textarea>
            <div className="flex flex-row w-full justify-between items-center py-1">
                <input
                value={productPrice}
                onChange={(event) => (setProductPrice(event.currentTarget.value))}
                type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 mr-1' placeholder='Product price' />
                <input
                value={productCommision}
                onChange={(event) => (setProductCommision(event.currentTarget.valueAsNumber))}
                type="number" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Product commision' />
            </div>
            <div className="flex flex-col w-full items-start justify-start border-zinc-200 border-2 rounded-lg p-2 ml-1">
                <Dialog open={isOpen} onOpenChange={(v) => {
                          if(!v) {
                              setIsOpen(v)
                          }
                      }}>
                        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                        <h3 className="text-md text-blue-500 cursor-pointer ml-2">
                            Add product image
                        </h3>
                        </DialogTrigger>
                        <DialogContent>
                        <Dropzone multiple={false} 

                          onDrop={async (acceptedFile) => {
                          setIsUploading(true)
                          const progressInterval = startSimilatedProgress()

                          const res = await startUpload(acceptedFile)
                          if(!res) {
                            
                              return toast({
                                  title: 'Uploading error',
                                  description: 'The type of file is not supported',
                                  variant: 'destructive',
                              })
                          }

                          const [fileResponse] = res

                          const key = fileResponse?.key

                          if (!key) {
                            
                              return toast({
                                  title: 'File error',
                                  description: 'Please choose another image',
                                  variant: 'destructive',
                              })
                          }

                          clearInterval(progressInterval)
                          setUploadProgress(100)
                          
                            setProductImg(prev => [...prev, `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${fileResponse.key}`])
                          toast({
                            title: 'Uploading done',
                            description: 'Youcan add more images',
                            variant: 'success',
                        })

                          }}>
                          {({getRootProps, getInputProps, acceptedFiles}) => (
                              <div {...getRootProps()} className="border h-64 m-4 border-dashed border-gray-300 rounded-lg">
                                  <div className="flex items-center justify-center h-full w-full">
                                      <label htmlFor="dropezone-file" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                              <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                              <p className="mb-2 text-sm text-zinc-700">
                                                  <span className="font-semibold">
                                                      click to upload
                                                  </span> {" "}
                                                  or drag and drop
                                              </p>
                                              <p className="text-xs text-zinc-500">Image up to (4mb)</p>
                                          </div> 

                                              {acceptedFiles && acceptedFiles[0] ? (
                                                  <div className="max-w-xs mt-2 bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                                                      <div className="px-3 py-2 h-full grid place-items-center">
                                                          <File className="h-4 w-4 text-blue-500" />
                                                      </div>
                                                      <div className="px-3 py-2 h-full text-sm truncate">
                                                          {acceptedFiles[0].name}
                                                      </div>
                                                  </div>
                                              ) : null}

                                              {isUploadng ? (
                                                  <div className="w-full mt-4 mx-w-xs mx-auto">
                                                      <Progress value={uploadProgress} className="h-1 w-full bg-zinc-200" />
                                                  </div>
                                              ) : null}
                                          
                                          <input 
                                          {...getInputProps()}
                                          type="file" id="dropzone-file" className="hidden"/>
                                      </label>
                                  </div>
                              </div>
                          )}
                          </Dropzone>
                        </DialogContent>
                      </Dialog>

                <div className="grid lg:flex 2xl:flex">
                {productImg && productImg.length > 0 ? (
                    productImg.map((img, index) => {
                        return (
                            <>
                            <div className="relative m-1" key={index}>
                                <Image width={250} height={250} className=" h-[250px] w-[250px] rounded-lg" src={img} alt={"Product image"}/>
                                
                                <MdDelete 
                                onClick={() => (deleteImg(img))}
                                className="h-[40px] w-[40px] cursor-pointer px-1 text-zinc-800 bg-red-400 border-red-700 border-2 rounded-md absolute z-10 bottom-0 right-0 m-1 " />
                            </div>
                            
                            </>
                        )
                        })
                    

                ): [] }
                </div>  
            </div>
            <div className="flex w-full justify-start items-center text-md font-semibold">
                <Switch className="m-1"
                      checked={hiddenProduct}
                      onCheckedChange={() => (setHiddenProduct(!hiddenProduct))}
                    /> Hidden product
            </div>
            <button 
            onClick={() => (addNewProduct())}
            className='bg-black text-white font-semibold rounded-lg py-2 px-5 my-1'>
                Edit product
            </button>
        </div>
    </>
  )
}

export default EditProduct