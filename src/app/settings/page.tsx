import DashSideBar from "@/components/DashSideBar"
import Settings from "@/components/Settings"
import DashboardTopBar from "@/components/dashboardTopBar"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { notFound, redirect } from "next/navigation"


const Page = async () => {
  const {getUser} = getKindeServerSession()
  const user = getUser()
  
  if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id
    }
  })

  if (!dbUser) redirect('/auth-callback?origin=dashboard')

  const getAllOthers = await db.user.findMany({
    select: {
      username: true,
    },
    where: {
      id: {
        not: user.id,
      }
    }
  })
  if (!getAllOthers) return notFound()
  

  
  return (<>
    <div className="flex flex-row bg-zinc-100 min-h-screen pb-24">
      <div className="w-full">
      <DashboardTopBar />
      <Settings userData={dbUser} others={getAllOthers} />
      </div>
      <DashSideBar />
    </div>

  </>
  
  )
}

export default Page