import DashSideBar from "@/components/DashSideBar"
import Dashboard from "@/components/Dashboard"
import DashboardTopBar from "@/components/dashboardTopBar"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"


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

  return (<>
    <div className="flex flex-row bg-zinc-100 min-h-screen pb-24">
      <DashSideBar />
      <div className="flex flex-col w-full 2xl:ml-[250px] lg:ml-[250px]">
        <DashboardTopBar />
        <Dashboard/>
      </div>
      
    </div>
  </>
  
  )
}

export default Page