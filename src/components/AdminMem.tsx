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
    const {mutate: editState} = trpc.editUserState.useMutation({
        onSuccess: () => {
            utils.getAllMem.invalidate()
            return toast({
                title: "State changed",
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
    
    const handleDesigner = (userId: string, newValue: string) => {
        editState({userId: userId, newValue: newValue})
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
                        <h1 className='text-md'>
                            <span className='font-semibold'>Username : </span> {mem.username}
                        </h1>
                        <h1 className='text-md'>
                            <span className='font-semibold'>Email : </span> {mem.email}
                        </h1>
                        <h1 className='text-md'>
                            <span className='font-semibold'>Balance : </span> {mem.userBalance} MAD
                        </h1>
                        <h1 className='text-md '>
                            <span className='font-semibold'>User state : </span> {mem.userState}
                        </h1>
                        <h1 className='text-md '>
                            <span className='font-semibold'>User phone : </span> {mem.userPhone}
                        </h1>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <button onClick={() => (handleDelete(mem.id))}
                        className='flex w-full text-lg items-center text-white justify-center bg-red-500 border-2 border-red-700 rounded-lg px-2 font-semibold'>
                            Delete
                        </button>
                        <button onClick={() => (handleDesigner(mem.id, "designer"))}
                        className='flex w-full text-lg items-center text-white justify-center bg-blue-500 border-2 border-blue-700 rounded-lg px-2 font-semibold'>
                            Designer
                        </button>
                        <button onClick={() => (handleDesigner(mem.id, "user"))}
                        className='flex w-full text-lg items-center text-white justify-center bg-black border-2 border-black rounded-lg px-2 font-semibold'>
                            User
                        </button>
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