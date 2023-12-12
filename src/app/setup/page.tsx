import { notFound, redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from '@/db'
import Setup from "@/components/Setup"


const page = async () => {

    
    const {getUser} = getKindeServerSession()
    const user = getUser()
  
    if (!user || !user.id) redirect('/auth-callback?origin=setup')

    const dbUser = await db.user.findFirst({
        where: {
        id: user.id
        }
    })

    if (!dbUser) redirect('/auth-callback?origin=setup')

    const getAllOthers = await db.user.findMany({
      select: {
        username: true,
        createdAt: false,
        userRank: false,
      },
      where: {
        id: {
          not: user.id,
        }
      }
    })
    if (!getAllOthers) return notFound()
    
  return (
    <>
    <Setup userData={dbUser} others={getAllOthers}/>
    </>
  )
}

export default page

