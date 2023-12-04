
import Link from 'next/link'
import {RiDashboardFill, RiLinksFill, RiSettings3Fill} from "react-icons/ri"
import {IoLogOut} from "react-icons/io5"
import { LogoutLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { db } from '@/db'
import { notFound, redirect } from 'next/navigation'
import {GrUserAdmin} from "react-icons/gr"
import {AiOutlineShop} from "react-icons/ai"
import {LiaCashRegisterSolid} from "react-icons/lia"


const DashSideBar = async () => {
  
  const {getUser} = getKindeServerSession()
  const getUserInfo = getUser()

  if (!getUserInfo || !getUserInfo.id) redirect('/auth-callback?origin=dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: getUserInfo.id
    }
  })
  
  return (
    
    <>
    <div className='fixed grid grid-cols-5 bottom-0 bg-white w-screen p-2 border-t-[1px] justify-center items-center z-10'>
        <Link href="/dashboard" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <RiDashboardFill className='h-[45px] w-[45px] '/>
          </div>
        </Link>
        <Link href="/settings" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg  hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <RiSettings3Fill className='h-[45px] w-[45px] '/>
          </div>
        </Link>
        <Link href="/seller" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg  hover:shadow-xl hover:bg-zinc-200 justify-center '>
            <AiOutlineShop className='h-[45px] w-[45px] '/>
            
          </div>
        </Link>
        <Link href="/orders" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center '>
            <LiaCashRegisterSolid className='h-[45px] w-[45px] '/>
          </div>
        </Link>
        {dbUser?.userRank == 0 ? (
          <Link href="/admin" >
            <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center '>
              <GrUserAdmin className='h-[45px] w-[45px] '/>
            </div>
          </Link>
        ): null}
        <LogoutLink>
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg  hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <IoLogOut className='h-[45px] w-[45px] '/>
          </div>
          </LogoutLink>
    </div>
    </>
  )
}

export default DashSideBar


