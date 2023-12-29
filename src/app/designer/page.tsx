import AddProduct from "@/components/AddProduct"
import DashSideBar from "@/components/DashSideBar"
import DesignerOrders from "@/components/DesignerOrders"
import DesignerProducts from "@/components/DesignerProducts"
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
    <div className="flex flex-row bg-zinc-100 min-h-screen pb-24">
      <div className="w-full bg-zinc-100">
      <DashboardTopBar />
      <div className="flex flex-col px-2 2xl:px-24 lg:px-36 pt-10">
        <AddProduct />
        <DesignerProducts />
        <DesignerOrders />
      </div>
      
      </div>
      <DashSideBar />
    </div>
  )
}

export default page