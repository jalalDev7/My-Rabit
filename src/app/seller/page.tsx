import DashSideBar from "@/components/DashSideBar"
import Seller from "@/components/Seller"
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

  
  return (<>
    <div className="flex flex-row bg-zinc-100 min-h-screen pb-24">
      
      <DashSideBar />
      <div className="w-full">
        <DashboardTopBar />
        <Seller />
      </div>
    </div>

  </>
  
  )
}

export default Page