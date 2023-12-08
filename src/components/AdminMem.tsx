import { trpc } from '@/app/_trpc/Client'
import React from 'react'
import { MdAddShoppingCart, MdDeleteSweep, MdOutlineDesignServices } from 'react-icons/md'
import { toast } from './ui/use-toast'

const AdminMem = () => {

    const utils = trpc.useContext()

    const {data: members, isLoading} = trpc.getAllMem.useQuery()

    const {mutate: deleteMem} = trpc.deleteMem.useMutation({
        onSuccess: () => {
            utils.getAllMem.invalidate()
            return toast({
                title: "Membre deleted",
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

    const handleDelete = (userId: string) => {
        deleteMem({id: userId})
    }
    const handleSeller = (userId: string) => {

    }
    const handleDesigner = (userId: string) => {

    }

  return (
    <>
    <h1 className='text-2xl mt-10 px-5 mb-2'>
        All members
    </h1>
    <div className='flex flex-col w-full items-start justify-start gap-2 bg-white rounded-lg border-2 border-zinc-400'>
    {members && members.length > 0 ? (
        members.map((mem) => {
            return (
                <div key={mem.id} className='flex flex-row items-start justify-between w-full gap-2 p-2 border-b-2 border-zinc-400'>
                    <div className='flex flex-col items-start justify-start'>
                        <h1 className='text-md font-semibold'>
                            username : {mem.username}
                        </h1>
                        <h1 className='text-md font-semibold'>
                            Email : {mem.email}
                        </h1>
                        <h1 className='text-md font-semibold'>
                            Balance : {mem.userBalance} MAD
                        </h1>
                        <h1 className='text-md font-semibold'>
                            User state : {mem.userState}
                        </h1>
                    </div>
                    <div className='grid grid-cols-2 items-center justify-center gap-2'>
                        <MdDeleteSweep className="h-[35px] w-[35px] cursor-pointer "
                        onClick={() => (handleDelete(mem.id))}
                        />
                        <MdAddShoppingCart className="h-[35px] w-[35px] cursor-pointer "
                        onClick={() => (handleSeller(mem.id))}
                        />
                        <MdOutlineDesignServices className="h-[35px] w-[35px] cursor-pointer "
                        onClick={() => (handleDesigner(mem.id))}
                        />
                    </div>
                </div>
            )
        })
        
    ): null}
        
    </div>
    </>
  )
}

export default AdminMem