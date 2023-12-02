
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
    <div className='fixed bg-white h-screen p-4 border-r-[1px] flex flex-col justify-start 2xl:w-[80px] lg:w-[80px] w-[45px] '>
        <Link href="/dashboard" >
          <div className='flex flex-col items-center 2xl:bg-zinc-900 lg:bg-zinc-900 2xl:p-2 lg:p-2 p-1 2xl:text-white lg:text-white rounded-lg mb-5 hover:shadow-xl '>
            <RiDashboardFill className='lg:h-[30px] 2xl:h-[30px] lg:w-[30px] 2xl:w-[30px] h-[25px] w-[25px] '/>
          </div>
        </Link>
        <Link href="/settings" >
          <div className='flex flex-col items-center 2xl:bg-zinc-200 lg:bg-zinc-200 2xl:p-2 lg:p-2 p-1 text-black rounded-lg mb-5 hover:shadow-xl '>
            <RiSettings3Fill className='lg:h-[30px] 2xl:h-[30px] lg:w-[30px] 2xl:w-[30px] h-[25px] w-[25px] '/>
            
          </div>
        </Link>
        <Link href="/seller" >
          <div className='flex flex-col items-center 2xl:bg-zinc-200 lg:bg-zinc-200 2xl:p-2 lg:p-2 p-1 text-black rounded-lg mb-5 hover:shadow-xl '>
            <AiOutlineShop className='lg:h-[30px] 2xl:h-[30px] lg:w-[30px] 2xl:w-[30px] h-[25px] w-[25px] '/>
            
          </div>
        </Link>
        <Link href="/orders" >
          <div className='flex flex-col items-center 2xl:bg-zinc-200 lg:bg-zinc-200 2xl:p-2 lg:p-2 p-1 text-black rounded-lg mb-5 hover:shadow-xl '>
            <LiaCashRegisterSolid className='lg:h-[30px] 2xl:h-[30px] lg:w-[30px] 2xl:w-[30px] h-[25px] w-[25px] '/>
            
          </div>
        </Link>
        {dbUser?.userRank == 0 ? (
          <Link href="/admin" >
            <div className='flex flex-col items-center 2xl:bg-zinc-200 lg:bg-zinc-200 2xl:p-2 lg:p-2 p-1 text-black rounded-lg mb-5 hover:shadow-xl '>
              <GrUserAdmin className='lg:h-[30px] 2xl:h-[30px] lg:w-[30px] 2xl:w-[30px] h-[25px] w-[25px] '/>
            </div>
          </Link>
        ): []}
        

        <LogoutLink>
          <div className='flex flex-col items-center 2xl:bg-zinc-900 lg:bg-zinc-900 2xl:p-2 lg:p-2 p-1 text-white rounded-lg mb-5 hover:shadow-xl absolute bottom-2 left-2'>
            <IoLogOut className='lg:h-[30px] 2xl:h-[30px] lg:w-[30px] 2xl:w-[30px] h-[25px] w-[25px] '/>
          </div>
          </LogoutLink>
    </div>
    </>
  )
}

export default DashSideBar


