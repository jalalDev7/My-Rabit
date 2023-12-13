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
import { FaRegCopy } from "react-icons/fa"


interface typeOb   {
    id: string,
    email: string,
    username: string,
    createdAt: Date,
    avatar: string,
    theme: number,
    youtubeLink: string,
    facebookLink: string,
    instagramLink: string,
    tiktokLink: string,
    snapchatLink: string,
    linkedLink: string,
    
}
type typeOthers = {username: string}[]

const Setup = (props: {userData: typeOb, others: typeOthers}) => {

    document.title = `My-Rabit.com | Profile first setup`

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

    const formSchema = z.object({
        username: z.string().max(15, "Over 15 letter is not allowed.").min(4, {
          message: "please enter a valide username contain plus than 4 caracters",
        }).refine(s => !s.includes(' '), 'Space between words is not allowed.')
        .refine(s => {
          const checkNewUesr = props.others.filter((user) => {return user.username == s})
          if (checkNewUesr.length == 0) return true
          if (checkNewUesr.length > 0) return false
        }, 'Username is already used please choose another one.').refine(s => {
          if (
            s == "admin" || 
            s == "dashboard" || 
            s == "seller" || 
            s == "designer" || 
            s == "auth-callback" || 
            s == "orders" || 
            s == "product" || 
            s == "settings" || 
            s == "setup") return false
        }, "This username is not allowed please choose another one."),
        avatar: z.string(),
        youtube: z.string(),
        instagram: z.string(),
        facebook: z.string(),
        snapchat: z.string(),
        linked: z.string(),
        tiktok: z.string(),
      })
      let prevUserName = ""
      if (props.userData.username != props.userData.id) prevUserName = props.userData.username
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: prevUserName,
          avatar: prevAvatar,
          youtube: props.userData.youtubeLink,
          instagram: props.userData.instagramLink,
          facebook: props.userData.facebookLink,
          snapchat: props.userData.snapchatLink,
          linked: props.userData.linkedLink,
          tiktok: props.userData.tiktokLink,
          },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        editProfile({
          username: form.getValues("username"),
          avatar: prevAvatar,
          youtube: form.getValues("youtube"),
          facebook: form.getValues("facebook"),
          instagram: form.getValues("instagram"),
          linked: form.getValues("linked"),
          snapchat: form.getValues("snapchat"),
          tiktok: form.getValues("tiktok")
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
    <div className='flex w-full h-full items-center justify-center bg-zinc-100 py-24 '>
        <div 
        className='bg-white rounded-lg shadow-md p-5 border-zinc-200 border-[1px] justify-start items-start w-fit lg:row-span-2 2xl:row-span-2'>
          <h1 className="text-2xl font-bold mb-4">
            Quick setup
          </h1>
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={() => (form.reset)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold p-2">Customize your user name :</FormLabel>
                <FormControl>
                  <Input  placeholder="username" {...field} width="301" />
                </FormControl>
                <FormLabel  className="flex flex-row gap-2 text-sm p-2">
                  https://my-rabit.com/{form.getValues("username")}
                  <FaRegCopy className="w-[15px] h-[15px] cursor-pointer " alt="Copy link"
                  onClick={() => (navigator.clipboard.writeText(`https://my-rabit.com/${form.getValues("username")}`))}
                  />
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="w-full p-1"></hr>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold p-2">Change your profile picture :</FormLabel>
                <FormControl>
                  <div className="flex flex-row h-full w-full">
                    <div className="flex w-fit border-r-2 border-zinc-200 p-2">
                    <Avatar className='h-[50px] w-[50px] items-center'>
                      <AvatarImage src={prevAvatar}/>
                      <AvatarFallback>
                        <Loader2 className='h-[50px] w-[50px] animate-spin '/>
                      </AvatarFallback>
                    </Avatar>
                    </div>
                    <div className="flex flex-col justify-start h-full items-center w-full ml-2">
                      <Input placeholder="Put your link here" {...field} disabled={true} className="hidden"/>
                      <Dialog open={isOpen} onOpenChange={(v) => {
                          if(!v) {
                              setIsOpen(v)
                          }
                      }}>
                        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                        <h3 className="text-md text-blue-500 cursor-pointer ml-2">
                            click here to change your avatar
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
                          deletephoto({imgName: prevAvatar})
                          clearInterval(progressInterval)
                          setUploadProgress(100)

                          setPrevAvatar(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${fileResponse.key}`)

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
                  </div>
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="w-full p-1"></hr>
          <p className="text-2xl font-semibold p-2 ">
            Social media links :
          </p>
          
          <FormField
            control={form.control}
            name="youtube"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold p-2">Your youtube link :</FormLabel>
                <FormControl>
                  <Input placeholder="Youtube link" {...field} width="301" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold p-2">Your facebook link :</FormLabel>
                <FormControl>
                  <Input placeholder="Facebook link" {...field} width="301" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold p-2">Your instagram link :</FormLabel>
                <FormControl>
                  <Input placeholder="Instagram link" {...field} width="301" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linked"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold p-2">Your LinkedIn link :</FormLabel>
                <FormControl>
                  <Input placeholder="LinkedIn link" {...field} width="301" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="snapchat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold p-2">Your snapchat link :</FormLabel>
                <FormControl>
                  <Input placeholder="Snapchat link" {...field} width="301" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tiktok"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold p-2">Your tiktok link :</FormLabel>
                <FormControl>
                  <Input placeholder="Tiktok link" {...field} width="301" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-center">
            <Button type="submit">
                  Save changes
              </Button>
          </div>                
          
        </form>
      </Form>
        </div>
    </div>
    </>
  )
}

export default Setup