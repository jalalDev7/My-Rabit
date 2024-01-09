"use client"

import { z } from "zod"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { trpc } from "@/app/_trpc/Client"
import { useEffect, useState } from "react"
import { useToast } from "./ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Cloud, Loader2,  File } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import Dropzone from "react-dropzone"
import { useUploadThing } from "@/lib/uploadthing"
import { Progress } from "./ui/progress"
import { FaLock, FaRegCopy } from "react-icons/fa"
import { FiYoutube } from "react-icons/fi"
import { FaFacebookSquare } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"
import { CiLinkedin } from "react-icons/ci"
import { PiSnapchatLogoBold } from "react-icons/pi"
import { TbBrandTiktok } from "react-icons/tb"


interface typeOb   {
    id: string,
    email: string,
    username: string,
    createdAt: Date,
    avatar: string,
    userDesc: string,
    theme: number,
    youtubeLink: string,
    facebookLink: string,
    instagramLink: string,
    tiktokLink: string,
    snapchatLink: string,
    linkedLink: string,
    userPhone: string,
    
}
type typeOthers = {username: string}[]

const Setup = (props: {userData: typeOb, others: typeOthers}) => {

    document.title = `My-Rabit.com | Profile first setup`

    const [step, setStep] = useState(1)

    const [isUploadng, setIsUploading] = useState<boolean>(true)

    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const [isOpen,setIsOpen] = useState<boolean>()

    const [prevAvatar, setPrevAvatar] = useState(props.userData.avatar)

    const {mutate: deletephoto} = trpc.deletePhoto.useMutation()

    const { startUpload} = useUploadThing("avatarUploader")

    const {toast} = useToast()

    const {mutate: editProfile} = trpc.editProfile.useMutation({
        onSuccess: () => {
          window.location.replace("/dashboard");
          toast({
            title: "Done",
            description: "",
            variant: "success",
          })
        },
        onError: () => {
          toast({
            title: "The new username is not valid or already taken",
            description: "Please choose another username",
            variant: "destructive",
          })
    }})
    const bannedUsernames = ['admin','orders','seller','designer','dashboard','settings','setup','product','auth-callback']
    const formSchema = z.object({
        username: z.string().max(15, "Over 15 letter is not allowed.").min(4, {
          message: "please enter a valide username contain plus than 4 caracters",
        }).refine(s => !s.includes(' '), 'Space between words is not allowed.')
        .refine(s => {
          const checkNewUesr = props.others.filter((user) => {return user.username == s})
          if (checkNewUesr.length == 0) return true
          if (checkNewUesr.length > 0) return false
        }, 'Username is already used please choose another one.').refine(s => !bannedUsernames.includes(s), "This username is not allowed please choose another one."),
        avatar: z.string(),
        userDesc: z.string(),
        youtube: z.string(),
        instagram: z.string(),
        facebook: z.string(),
        snapchat: z.string(),
        linked: z.string(),
        tiktok: z.string(),
        userPhone: z.string(),
      })
      let prevUserName = ""
      if (props.userData.username != props.userData.id) prevUserName = props.userData.username
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: prevUserName,
          avatar: prevAvatar,
          userDesc: props.userData.userDesc,
          youtube: props.userData.youtubeLink,
          instagram: props.userData.instagramLink,
          facebook: props.userData.facebookLink,
          snapchat: props.userData.snapchatLink,
          linked: props.userData.linkedLink,
          tiktok: props.userData.tiktokLink,
          userPhone: props.userData.userPhone,
          },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        editProfile({
          username: form.getValues("username"),
          avatar: prevAvatar,
          userDesc: form.getValues("userDesc"),
          youtube: form.getValues("youtube"),
          facebook: form.getValues("facebook"),
          instagram: form.getValues("instagram"),
          linked: form.getValues("linked"),
          snapchat: form.getValues("snapchat"),
          tiktok: form.getValues("tiktok"),
          userPhone: form.getValues("userPhone")
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

      useEffect(() => {
        setIsOpen(false)
        
      }, [prevAvatar]);

  return (
    <>
    <div className='flex w-full items-center justify-center px-4 '>
        <div 
        className='flex flex-col w-full lg:w-[720px] 2xl:w-[720px] bg-white rounded-2xl border-zinc-200 border-[1px] justify-start items-start shadow-xl'>
          <div className="flex flex-col w-full items-center justify-center gap-4 text-white rounded-t-2xl pt-8 p-2 bg-gradient-to-r from-cyan-500 to-blue-500">
            <h1 className="text-2xl font-bold ">
              Quick setup
            </h1>
            <div className="grid grid-cols-2 w-full justify-between items-center gap-4 px-4">
              <div className={`flex flex-col gap-2 w-full items-center justify-center ${step == 2 ? "opacity-50": null} `}>
                <h3>
                  Step 1
                </h3>
                <div className="flex w-full bg-white h-2 rounded-2xl" />
              </div>
              <div className={`flex flex-col gap-2 w-full items-center justify-center ${step == 1 ? "opacity-50": null} `}>
                <h3>
                  Step 2
                </h3>
                <div className="flex w-full bg-white h-2 rounded-2xl" />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center py-4 ">
            <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} onChange={() => (form.reset)} className="flex flex-col w-full items-center justify-center">
                {step == 1 ? (
                  <>
                  <FormField control={form.control} name="avatar" render={({ field }) => (
                    <FormItem className="flex flex-col p-2 w-full">
                      <div className="flex flex-row w-full items-center justify-center">
                        <Avatar className='h-[150px] w-[150px] items-center'>
                          <AvatarImage src={prevAvatar}/>
                          <AvatarFallback>
                            <Loader2 className='h-[100px] w-[100px] animate-spin '/>
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    <FormControl>
                      <div className="flex flex-col justify-center items-start w-full">
                        <Input placeholder="Put your link here" className="hidden" {...field}  disabled={true}/>
                        <Dialog open={isOpen} onOpenChange={(v) => {
                              if(!v) {
                                  setIsOpen(v)
                              }
                          }}>
                            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                              <h3 className="flex w-full items-center justify-center text-lg font-semibold text-blue-500 cursor-pointer">
                                Click here to change your avatar
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
                              setPrevAvatar(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${fileResponse.key}`)
                              deletephoto({imgName: prevAvatar})
                              clearInterval(progressInterval)
                              setUploadProgress(100)
  
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
                      </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                  )}/>
  
                <FormField control={form.control} name="username" render={({ field }) => (
                    <FormItem className="flex w-full px-4 mt-8">
                        
                        <div className="flex flex-col w-full">
                          
                          <FormControl>
                            <Input  placeholder="username" {...field} width="301" 
                            className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-lg font-semibold text-blue-500 px-1 " />
                          </FormControl>
                          <FormLabel  className="flex flex-row gap-2 text-sm py-2 text-blue-500">
                            Your link : https://my-rabit.com/{form.getValues("username")}
                            <FaRegCopy className="w-[15px] h-[15px] cursor-pointer " alt="Copy link"
                            onClick={() => (navigator.clipboard.writeText(`https://my-rabit.com/${form.getValues("username")}`))}
                            />
                          </FormLabel>
                          <FormMessage />
                        </div>
  
                      
                    </FormItem>
                )}/>
        
                <FormField
                  control={form.control}
                  name="userDesc"
                  render={({ field }) => (
                    <FormItem className="flex w-full px-4 py-8 ">
                      <div className="flex flex-col w-full">
                      <FormControl>
                        <Input placeholder="Your description" {...field} width="301"
                        className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-lg font-semibold text-blue-500 px-1 " />
                      </FormControl>
                      <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                  
                <FormField
                  control={form.control}
                  name="userPhone"
                  render={({ field }) => (
                    <FormItem  className="flex w-full p-4 mt-2 ">
                      <div className="flex flex-col w-full">
                      <FormControl>
                        <Input placeholder="Number phone" {...field} width="301" 
                        className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-lg font-semibold text-blue-500 px-1 "/>
                      </FormControl>
                      <FormLabel  className="flex flex-row gap-2 items-center text-sm py-2 text-blue-500">
                        <FaLock />No one can see this information, For business enquiries only.                
                      </FormLabel>
                      <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                  </>
                ): step == 2 ? (
                  <>
                  
                  <div className="flex flex-col w-full px-6 pt-8 gap-4">
                    <FormField
                      control={form.control}
                      name="youtube"
                      render={({ field }) => (
                        <FormItem className="flex flex-row gap-2 w-full items-start justify-start">
                          <FormLabel className="flex pr-2 py-4 text-blue-600">
                          <FiYoutube className="w-10 h-10" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Youtube link" {...field} width="301" 
                            className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-md font-semibold text-blue-500 px-1 "/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem className="flex flex-row gap-2 w-full items-start justify-start">
                          <FormLabel className="flex pr-2 py-4 text-blue-600">
                          <FaFacebookSquare  className="w-10 h-10" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Facebook link" {...field} width="301" 
                            className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-md font-semibold text-blue-500 px-1 "/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem className="flex flex-row gap-2 w-full items-start justify-start">
                          <FormLabel className="flex pr-2 py-4 text-blue-600">
                          <FaInstagram  className="w-10 h-10" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Instagram link" {...field} width="301" 
                            className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-md font-semibold text-blue-500 px-1 "/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linked"
                      render={({ field }) => (
                        <FormItem className="flex flex-row gap-2 w-full items-start justify-start">
                          <FormLabel className="flex pr-2 py-4 text-blue-600">
                          <CiLinkedin className="w-10 h-10" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="LinkedIn link" {...field} width="301" 
                            className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-md font-semibold text-blue-500 px-1 "/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="snapchat"
                      render={({ field }) => (
                        <FormItem className="flex flex-row gap-2 w-full items-start justify-start">
                          <FormLabel className="flex pr-2 py-4 text-blue-600">
                          <PiSnapchatLogoBold className="w-10 h-10" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Snapchat link" {...field} width="301" 
                            className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-md font-semibold text-blue-500 px-1 "/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tiktok"
                      render={({ field }) => (
                        <FormItem className="flex flex-row gap-2 w-full items-start justify-start">
                          <FormLabel className="flex pr-2 py-4 text-blue-600">
                          <TbBrandTiktok className="w-10 h-10" />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Tiktok link" {...field} width="301" 
                            className="border-t-0 border-l-0 border-r-0 border-b-4 border-blue-500 text-md font-semibold text-blue-500 px-1 "/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  </>
                ): null}
                
                {step == 1 ? (
                  <>
                  <div className="flex flex-row gap-2 w-full items-center justify-end px-4 mt-8 mb-2">
                    <div className="flex bg-blue-500 rounded-lg text-white font-semibold px-6 py-2 cursor-pointer"
                    onClick={() => setStep(2)}>
                      Next step
                    </div>
                  </div>
                  </>             
                ): [
                  <>
                  <div className="flex flex-row w-full items-center justify-between ">
                    <div className="flex px-8 mt-8 mb-2 items-end rounded-lg text-blue-500 font-semibold  cursor-pointer"
                    onClick={() => setStep(1)}>
                      Back
                    </div>
                    <div className="flex flex-row gap-2 w-full items-center justify-end px-4 mt-8 mb-2 ">
                      <button className="flex  rounded-lg text-blue-500 font-semibold px-4 py-2 cursor-pointer">
                        Setup later
                      </button>
                      <Button type="submit" className="bg-blue-500 text-white">
                        Finish and save
                      </Button>
                    </div>
                  </div>
                  
                  </>
                  
                ]}               
            </form>
            </Form>
          </div>
        
        </div>
    </div>
    </>
  )
}

export default Setup