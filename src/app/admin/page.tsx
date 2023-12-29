import AdminTools from "@/components/AdminTools"
import DashSideBar from "@/components/DashSideBar"
import DashboardTopBar from "@/components/dashboardTopBar"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, redirect } from "next/navigation"


const page = async () => {

  const {getUser} = getKindeServerSession()
  const user = getUser()
  
  if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id
    }
  })
  if (!dbUser || dbUser.userRank > 0) return notFound()
  return (
    <>
      <div className="flex flex-row bg-zinc-100 min-h-screen pb-24">
        <div className="w-full">
          <DashboardTopBar />
          <AdminTools />
        </div>
        <DashSideBar />
      </div>
    </>
  )
}

export default page