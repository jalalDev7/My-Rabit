import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import { trpc } from '@/app/_trpc/Client'

const AdminThemes = () => {

    const [themeType, setThemeType] = useState("COLOR")

    const [themeBgLink, setThemeBgLink] = useState("")

    const [themeBgColor, setThemeBgColor] = useState("")

    const [themeNumber, setThemeNumber] = useState(0)

    const {mutate: addTheme} = trpc.addNewTheme.useMutation({
        onSuccess: () => {

            return toast({
                title: "New theme added",
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

    const addNewTheme = () => {
        if (!themeBgColor || !themeNumber || !themeType) {
            return toast({
                title: 'Please check all fields',
                description: 'Some fields is empty',
                variant: 'destructive',
            })
        } 
        
        addTheme({
            themeType: themeType,
            themeBgLink: themeBgLink,
            themeBgColor: themeBgColor,
            themeNumber: themeNumber,
        })
    }

  return (
    <>
    
        <h1 className='text-2xl mt-10 px-5 mb-2'>
             Add new Theme
        </h1>
        <div className='flex w-full flex-col items-center justify-center p-5 bg-white border-zinc-300 border-2 rounded-lg hover:shadow-xl'>
            <select className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'
            onChange={(event) => (setThemeType(event.currentTarget.value))}
            >
            <option value="COLOR">
                    Theme Type
                </option>
                <option value="COLOR">
                    Color
                </option>
                <option value="IMG">
                    image
                </option>
            </select>
            <input type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Background link'
            onChange={(event) => (setThemeBgLink(event.currentTarget.value))}
            />
            <input type="text" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Background color' 
            onChange={(event) => (setThemeBgColor(event.currentTarget.value))}
            />
            <input type="number" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Theme number'
            onChange={(event) => (setThemeNumber(event.currentTarget.valueAsNumber))}
            />
            <button className='bg-black text-white font-semibold rounded-lg py-2 px-5 my-1'
            onClick={() => (addNewTheme())}
            >
                Add new Theme
            </button>
        </div>
    </>
  )
}

export default AdminThemes