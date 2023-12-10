import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import Dropzone from "react-dropzone"
import { Cloud,  File } from "lucide-react"
import { Progress } from "./ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from "./ui/use-toast"
import { Switch } from "./ui/switch"
import {MdDelete} from "react-icons/md"
import { trpc } from "@/app/_trpc/Client"
import Image from 'next/image'


const AddProduct = () => {

    const utils = trpc.useContext()

    const {data: getCats, isLoading, isError} = trpc.getAllCats.useQuery()

    const [productTitle, setProductTitle] = useState("")

    const [productDesc, setProductDesc] = useState("")

    const [productVar, setProductVar] = useState("S,M,L,XL")

    const [productCat, setProductCat] = useState("")

    const [productPrice, setProductPrice] = useState("")

    const [productCommision, setProductCommision] = useState(0)

    const [productImg, setProductImg] = useState<string[]>([])

    const [prodcutSrc, setProductSrc] = useState("")

    const [isOpen,setIsOpen] = useState<boolean>()

    const [isOpen2,setIsOpen2] = useState<boolean>()

    const [isUploadng, setIsUploading] = useState<boolean>(true)

    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const uploadImg = useUploadThing("productImage").startUpload

    const uploadZip = useUploadThing("productSrc").startUpload

    const [hiddenProduct , setHiddenProduct] = useState<boolean>(false)

    const {mutate: deletephoto} = trpc.deletePhoto.useMutation()

    const {mutate: addProduct} = trpc.addNewProduct.useMutation({
        onSuccess: () => {
            utils.getAllCats.invalidate()
            setProductTitle("")
            setProductDesc("")
            setProductVar("")
            setProductImg([])
            setProductCat("")
            setHiddenProduct(false)
            setProductSrc("")
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

    const addNewProduct = () => {
        if (!productTitle || !productDesc || !productVar || !productCat || !productImg) {
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
            productTitle: productTitle,
            productDesc: productDesc,
            productVar: productVar,
            productCatId: productCat,
            productImg: productImg,
            productState: hiddenProduct,
            productPrice: productPrice,
            productCommision: productCommision,
            productSrc: prodcutSrc,
        })

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
            <select 
            onChange={(event) => (setProductCat(event.currentTarget.value))}
            name="parentCat" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'>
                <option value="">
                    Please choose a category
                </option>
                {getCats && getCats.length > 0 ? (
                
                getCats.map((cat) => {
                    return (<option key={cat.id} value={cat.id}>
                        {cat.catTitle}
                    </option>)

                })): []}
            </select>
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
                                <Image width={250} height={250} className=" h-[250px] w-[250px] rounded-lg " src={img} alt={"Product image"}/>
                                
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

            <div className="flex flex-col w-full items-start justify-start border-zinc-200 border-2 rounded-lg p-2 ml-1">
                <Dialog open={isOpen2} onOpenChange={(v) => {
                          if(!v) {
                              setIsOpen2(v)
                          }
                      }}>
                        <DialogTrigger onClick={() => setIsOpen2(true)} asChild>
                        <h3 className="text-md text-blue-500 cursor-pointer ml-2">
                            Add product source file
                        </h3>
                        </DialogTrigger>
                        <DialogContent>
                        <Dropzone multiple={false} 

                          onDrop={async (acceptedFile) => {
                          setIsUploading(true)
                          const progressInterval = startSimilatedProgress()

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
                                  description: 'Please choose another image',
                                  variant: 'destructive',
                              })
                          }

                          clearInterval(progressInterval)
                          setUploadProgress(100)
                          
                            setProductSrc(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${fileResponse.key}`)
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
                                              <p className="text-xs text-zinc-500">File up to (4mb)</p>
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
                {prodcutSrc ? (                 
                    <h1 className="text-lg text-green-700 font-medium px-2">
                        Done
                    </h1>
                ): null }
                </div>  
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

export default AddProduct