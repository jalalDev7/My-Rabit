import AddProduct from "@/components/AddProduct"
import DashSideBar from "@/components/DashSideBar"
import DesignerOrders from "@/components/DesignerOrders"
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

  if (!dbUser) redirect('/auth-callback?origin=dashboard')

  if (dbUser.userState != "designer") redirect('/dashboard')

  return (
    <div className="flex flex-row mb-20">
      <div className="w-full bg-zinc-100">
      <DashboardTopBar />
      <div className="flex flex-col px-4 mb-10">
        <AddProduct />
        <DesignerOrders />
      </div>
      
      </div>
      <DashSideBar />
    </div>
  )
}

export default page