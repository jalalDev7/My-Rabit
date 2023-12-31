import { trpc } from "@/app/_trpc/Client"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "./ui/use-toast"


const BalanceEditor = () => {
    const utils = trpc.useContext()

    const {data: user, isLoading} = trpc.getUserInfo.useQuery()


    const [demandeValue, setDemandeValue] = useState<number>()

    const {mutate: addDemande} = trpc.demandePay.useMutation({
        onSuccess: () => {
            utils.getUserPayHistory.invalidate()

            return toast({
                title: "Demande accepted",
                description: "We will contact you soon. Make sure that you have already write your phone number in your profile.",
                variant: "success",
              })
        },
        onError: (error) => {
            if (error.data?.code == "TOO_MANY_REQUESTS" ) {
                return toast({
                    title: "Sorry, you have a previous withdrawal request",
                    description: "If we have not contacted you within two days, please contact customer service",
                    variant: "destructive",
                })
            }
            return toast({
                title: "Somethings wrong",
                description: "Check your Balance",
                variant: "destructive",
            })
        }
        
      })

      const handleDemande = () => {
        if (!user || !demandeValue || demandeValue > user.userBalance || demandeValue < 200 ) {
            return toast({
                title: "Demande rejected",
                description: "You must have at least 200 MAD.",
                variant: "destructive",
            })
        }
            
        addDemande({userId: user.id, value: demandeValue})
      }
    
  return (
    user ? (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between">
                <h1 className="text-lg font-semibold p-2">
                    Manage your balance:
                </h1>
                <h1 className="text-lg font-semibold p-2">
                    {user.userBalance} MAD
                </h1>
            </div>
            <div className="flex flex-col w-full gap-2">
                <input type="number" className='w-full border-zinc-200 border-2 rounded-lg p-2 my-1'
                onChange={(event) => (setDemandeValue(event.currentTarget.valueAsNumber))}
                 placeholder="How much you want to withdraw ?" />
                <button className='bg-black text-white font-semibold rounded-lg py-2 px-5 my-1'
                onClick={() => (handleDemande())}
                >
                    Demande payment
                </button>
            </div>
        </div>
    ): isLoading ? (
        <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        </div>
        </div>
    ): []
    
  )
}

export default BalanceEditor