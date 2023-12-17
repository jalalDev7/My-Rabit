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
    <div className="flex flex-row pb-52 bg-zinc-100 h-screen">
      <div className="w-full bg-zinc-100 pb-32">
        <DashboardTopBar />
        <Orders />
      </div>
      <DashSideBar />
    </div>
  </>
  )
}

export default page