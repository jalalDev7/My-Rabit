import React, { useState } from 'react'
import { toast } from './ui/use-toast'
import { trpc } from '@/app/_trpc/Client'
import { Skeleton } from './ui/skeleton'

const NewCat = () => {

    const utils = trpc.useContext()

    const [catId, setCatId] = useState("No")

    const {data: getCats, isLoading, isError} = trpc.getAllCats.useQuery()

    const {mutate: deleteCat} = trpc.deleteCat.useMutation({
        onSuccess: () => {
            utils.getAllCats.invalidate()
            return toast({
                title: "Category deleted",
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
        if (catId == "No") {
            return toast({
                title: "Please type a title for the new category",
                description: "The title field is empty",
                variant: "destructive",
              })
        }
        deleteCat({id: catId})
        
    }

  return (<>
        <div className='flex flex-col w-full'>
        <h1 className='text-2xl mt-10 px-5 mb-2'>
            Delete Category
        </h1>
        <div className='flex w-full flex-col items-center justify-center p-5 bg-white border-zinc-300 border-2 rounded-lg hover:shadow-xl'>
        {getCats && getCats.length > 0 ? (<>
            <select name="parentCat" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'
            onChange={(event) => (setCatId(event.currentTarget.value))}
            >
                <option value="No">
                    Please choose a category to delete
                </option>
                
                {getCats.map((cat) => {
                    return (<option key={cat.id} value={cat.id}>
                        {cat.catTitle}
                    </option>)

                })}
                
            </select>
            <button className='bg-black text-white font-semibold rounded-lg py-2 px-5 my-1'
            onClick={addNewCat}
            >
                Delete
            </button>
            </>
            ): isLoading ? (
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
                </div>
              ):  (
                <div className='text-xl text-red-600 font-bold bg-red-300 rounded-md p-2'>
                    Please add new category
                </div>
              )} 
        </div>
        </div>
        
    </>
  )
}

export default NewCat