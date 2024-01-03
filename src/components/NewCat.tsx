import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import { trpc } from '@/app/_trpc/Client'

const NewCat = () => {

    const utils = trpc.useContext()

    const [catTitle, setCatTitle] = useState("")

    const [catDesc, setCatDesc] = useState("")

    const [catParent, setCatParent] = useState("first")

    const {data: getCats, isLoading} = trpc.getAllCats.useQuery()

    const {mutate: addCat} = trpc.addNewCat.useMutation({
        onSuccess: () => {
            utils.getAllCats.invalidate()
            setCatTitle("")
            setCatDesc("")
            return toast({
                title: "New Category added",
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
    
    const addNewCat = () => {
        if (catTitle.length == 0) {
            return toast({
                title: "Please type a title for the new category",
                description: "The title field is empty",
                variant: "destructive",
              })
        }
        addCat({catTitle: catTitle, catParent: catParent, catDesc: catDesc})
        

    }

  return (<>
        <div className='flex flex-col w-full'>
        <h1 className='text-2xl mt-10 px-5 mb-2'>
             Add new category
        </h1>
        <div className='flex w-full flex-col items-center justify-center p-5 bg-white border-zinc-300 border-2 rounded-lg hover:shadow-xl'>
            <input type="text" value={catTitle} className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Category title'
            onChange={(event) => (setCatTitle(event.currentTarget.value))}
            />
            <input type="text" value={catDesc} className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1' placeholder='Category Description'
            onChange={(event) => (setCatDesc(event.currentTarget.value))}
            />
            <select name="parentCat" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'
            onChange={(event) => (setCatParent(event.currentTarget.value))}
            >
                <option value="first">
                    No parent
                </option>
                {getCats && getCats.length > 0 ? (
                getCats.map((cat) => {
                    return (<option key={cat.id} value={cat.id}>
                        {cat.catTitle}
                    </option>)

                })): []}
                
            </select>
            <button className='bg-black text-white font-semibold rounded-lg py-2 px-5 my-1'
            onClick={addNewCat}
            >
                Add new category
            </button>
        </div>
        </div>
        
    </>
  )
}

export default NewCat