import DashSideBar from '@/components/DashSideBar'
import Orders from '@/components/Orders'
import DashboardTopBar from '@/components/dashboardTopBar'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {

const {getUser} = getKindeServerSession()
  const user = getUser()
  
  if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

  return (
    <>
    <div className="flex flex-row bg-zinc-100 min-h-screen pb-24">
      
      <DashSideBar />
      <div className="flex flex-col w-full 2xl:pl-[280px] lg:pl-[260px]">
        <DashboardTopBar />
        <Orders />
      </div>
    </div>
  </>
  )
}

export default page