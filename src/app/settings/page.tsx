import DashSideBar from "@/components/DashSideBar"
import Footer from "@/components/Footer"
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
  if (dbUser.username == dbUser.id) redirect('/setup')

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
    <div className="flex flex-row bg-zinc-100 min-h-screen pb-24 lg:pb-8 2xl:pb-8">
      <DashSideBar />
      <div className="flex flex-col w-full 2xl:ml-[250px] lg:ml-[250px]">
        <DashboardTopBar />
        <Settings userData={dbUser} others={getAllOthers} />
        <Footer />
      </div>
    </div>

  </>
  
  )
}

export default Page