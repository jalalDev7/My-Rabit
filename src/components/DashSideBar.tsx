
import Link from 'next/link'
import {RiDashboardFill, RiLinksFill, RiSettings3Fill} from "react-icons/ri"
import {IoLogOut} from "react-icons/io5"
import { LogoutLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { db } from '@/db'
import { notFound, redirect } from 'next/navigation'
import {GrUserAdmin} from "react-icons/gr"
import {AiOutlineShop} from "react-icons/ai"
import {LiaCashRegisterSolid} from "react-icons/lia"
import { MdDesignServices } from 'react-icons/md'


const DashSideBar = async () => {
  
  const {getUser} = getKindeServerSession()
  const getUserInfo = getUser()

  if (!getUserInfo || !getUserInfo.id) redirect('/auth-callback?origin=dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: getUserInfo.id
    }
  })
  let gridNum = "grid-cols-5"
  if (dbUser && dbUser.userState == "designer") gridNum = "grid-cols-6"
  if (dbUser && dbUser.userRank == 0) gridNum = "grid-cols-6"
  return (
    
    <>
    <div className={`fixed grid ${gridNum} w-full bottom-0 bg-white  p-2 border-t-[1px] justify-center items-center z-10 shadow-[rgba(0,0,10,0.5)_0px_0px_20px_0px]`}>
        <Link href="/dashboard" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <RiDashboardFill className='h-[35px] w-[35px] '/>
          </div>
        </Link>
        <Link href="/settings" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg  hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <RiSettings3Fill className='h-[35px] w-[35px] '/>
          </div>
        </Link>
        <Link href="/seller" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg  hover:shadow-xl hover:bg-zinc-200 justify-center '>
            <AiOutlineShop className='h-[35px] w-[35px] '/>
            
          </div>
        </Link>
        <Link href="/orders" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center '>
            <LiaCashRegisterSolid className='h-[35px] w-[35px] '/>
          </div>
        </Link>
        {dbUser?.userRank == 0 ? (
          <Link href="/admin" >
            <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center '>
              <GrUserAdmin className='h-[35px] w-[35px] '/>
            </div>
          </Link>
        ): null}
        {dbUser?.userState == "designer" ? (
          <Link href="/designer" >
            <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center '>
              <MdDesignServices className='h-[35px] w-[35px] '/>
            </div>
          </Link>
        ): null}
        <LogoutLink>
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg  hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <IoLogOut className='h-[35px] w-[35px] '/>
          </div>
        </LogoutLink>
    </div>
    </>
  )
}

export default DashSideBar


