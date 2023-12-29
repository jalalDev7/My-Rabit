"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import Dropzone from "react-dropzone"
import { Cloud,  File } from "lucide-react"
import { Progress } from "./ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from "./ui/use-toast"
import {MdDelete} from "react-icons/md"
import { trpc } from "@/app/_trpc/Client"
import Image from 'next/image'
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"


const AddProduct = () => {
    
    const [productImg, setProductImg] = useState<string[]>([])

    const [prodcutSrc, setProductSrc] = useState("")

    const [isUploadng, setIsUploading] = useState<boolean>(true)

    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [uploadProgressZip, setUploadProgressZip] = useState<number>(0)

    const uploadImg = useUploadThing("productImage").startUpload

    const uploadZip = useUploadThing("productSrc").startUpload

    

    const {mutate: deletephoto} = trpc.deletePhoto.useMutation()

    const {mutate: addProduct} = trpc.addNewProduct.useMutation({
        onSuccess: () => {

            setProductImg([])
            setProductSrc("")
            setUploadProgressZip(0)

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
    const startSimilatedProgressZip = () => {
        setUploadProgressZip(0)

        const interval = setInterval(() => {
            setUploadProgressZip((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval)
                    return prevProgress
                }
                return prevProgress + 5
            })
        }, 500)
        return interval
    }

    const addNewProduct = () => {
        if (!prodcutSrc || !productImg) {
            return toast({
                title: 'Please check all fields',
                description: 'Some fields is empty',
                variant: 'destructive',
            })
        } 
        let imgList = ""
        productImg.map((item) => {
            imgList = imgList+","+item
        })
        
        addProduct({
            productImg: productImg,
            productSrc: prodcutSrc,
        })

    }
    const deleteImg = (imgIndex: string) => {
        const newListImg = productImg.filter(item => item !== imgIndex)
        setProductImg(newListImg)

        deletephoto({imgName: imgIndex})

    }


  return (<>
        <div className="flex w-full p-2">
            <div 
            className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 w-full gap-2 p-2 items-start justify-center bg-white border-2 border-zinc-400 rounded-lg">
                <div>
                    <Dropzone multiple={false} 

                        onDrop={async (acceptedFile) => {
                        setIsUploading(true)
                        const progressInterval = startSimilatedProgress()

                        const res = await uploadImg(acceptedFile)
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
                        description: 'You can add more images',
                        variant: 'success',
                        })
                        setUploadProgress(0)

                        }}>
                        {({getRootProps, getInputProps, acceptedFiles}) => (
                            <div {...getRootProps()} className="border h-64 border-dashed border-gray-300 rounded-lg">
                                <div className="flex items-center justify-center h-full w-full">
                                    <label htmlFor="dropezone-file" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="mb-2 text-md text-zinc-700 font-semibold">
                                                Upload product image one by one please
                                            </p>
                                            <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                            <p className="mb-2 text-sm text-zinc-700">
                                                <span className="font-semibold">
                                                    click to upload
                                                </span> {" "}
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-zinc-500">Image up to (4mb)</p>
                                        </div> 

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
                    <div className="grid grid-cols-3 w-full mt-2 items-center justify-center gap-2">
                        {productImg && productImg.length > 0 ? (
                            productImg.map((img, index) => {
                                return (
                                    <div key={index} className="flex relative w-full items-center justify-center">
                                        <Image width={100} height={120} className="h-[120px] w-[100px] rounded-lg " src={img} alt={"Product image"}/>
                                        
                                        <MdDelete 
                                        onClick={() => (deleteImg(img))}
                                        className="h-[40px] w-[40px] cursor-pointer px-1 text-zinc-800 bg-red-400 border-red-700 border-2 rounded-md absolute z-10 bottom-0 right-0 m-1 " />
                                    </div>
                                )
                            })
                        ): null }
                    </div>
                </div>
                <div>
                    <Dropzone multiple={false} 
                    onDrop={async (acceptedFile) => {
                        setIsUploading(true)
                        const progressIntervalZip = startSimilatedProgressZip()

                        const res = await uploadZip(acceptedFile)
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
                                description: 'Please choose another file',
                                variant: 'destructive',
                            })
                        }

                        clearInterval(progressIntervalZip)
                        setUploadProgressZip(100)

                        setProductSrc(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${fileResponse.key}`)
                        toast({
                        title: 'Uploading done',
                        variant: 'success',
                        })

                    }}>
                    {({getRootProps, getInputProps, acceptedFiles}) => (
                        <div {...getRootProps()} className="border h-full border-dashed border-gray-300 rounded-lg">
                            <div className="flex items-center justify-center h-64 w-full">
                                <label htmlFor="dropezone-file" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p className="mb-2 text-md text-zinc-700 font-semibold">
                                                Upload product file source ".zip"
                                            </p>
                                        <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                        <p className="mb-2 text-sm text-zinc-700">
                                            <span className="font-semibold">
                                                click to upload
                                            </span> {" "}
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-zinc-500">File up to (4mb)</p>
                                    </div> 

                                        

                                        {isUploadng ? (
                                            <div className="w-full mt-4 mx-w-xs mx-auto">
                                                <Progress value={uploadProgressZip} className="h-1 w-full bg-zinc-200" />
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
                    {prodcutSrc ? (
                        <div className="w-full h-full mt-2 bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                            <div className="px-3 py-2 h-full grid place-items-center">
                                <File className="h-full w-full text-blue-500" />
                            </div>
                            <div className="px-3 py-2 h-full text-lg truncate">
                                File uploaded
                            </div>
                            <MdDelete 
                                onClick={() => {
                                    deletephoto({imgName: prodcutSrc})
                                    setProductSrc("")
                                }}
                                className="h-[30px] w-[30px] cursor-pointer text-zinc-800 bg-red-400 border-red-700 border-2 rounded-md m-2 justify-end" />
                        </div>
                    ) : null}
                </div>
                <div 
                onClick={() => (addNewProduct())}
                className={cn(buttonVariants({size: "lg"}), "bg-blue-600 text-lg py-4 cursor-pointer mt-2 2xl:col-span-2 lg:col-span-2")}>
                    Add new product
                </div>
            </div>
        </div>

    </>
  )
}

export default AddProduct