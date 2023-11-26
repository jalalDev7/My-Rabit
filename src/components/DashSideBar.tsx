
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
    <div className='fixed bg-white h-screen p-4 border-r-[1px] flex flex-col justify-start w-[80px] '>
        <Link href="/dashboard" >
          <div className='flex flex-col items-center bg-zinc-900 p-2 text-white rounded-lg mb-5 hover:shadow-xl '>
            <RiDashboardFill className='h-[30px] w-[30px] '/>
          </div>
        </Link>
        <Link href="/settings" >
          <div className='flex flex-col items-center bg-zinc-200 p-2 text-black rounded-lg mb-5 hover:shadow-xl '>
            <RiSettings3Fill className='h-[30px] w-[30px] '/>
            
          </div>
        </Link>
        <Link href="/seller" >
          <div className='flex flex-col items-center bg-zinc-200 p-2 text-black rounded-lg mb-5 hover:shadow-xl '>
            <AiOutlineShop className='h-[30px] w-[30px] '/>
            
          </div>
        </Link>
        <Link href="/orders" >
          <div className='flex flex-col items-center bg-zinc-200 p-2 text-black rounded-lg mb-5 hover:shadow-xl '>
            <LiaCashRegisterSolid className='h-[30px] w-[30px] '/>
            
          </div>
        </Link>
        {dbUser?.userRank == 0 ? (
          <Link href="/admin" >
            <div className='flex flex-col items-center bg-zinc-200 p-2 text-black rounded-lg mb-5 hover:shadow-xl '>
              <GrUserAdmin className='h-[30px] w-[30px] '/>
            </div>
          </Link>
        ): []}
        

        <LogoutLink>
          <div className='flex flex-col items-center bg-zinc-900 p-2 text-white rounded-lg mb-5 hover:shadow-xl absolute bottom-2 '>
            <IoLogOut className='h-[30px] w-[30px] '/>
          </div>
          </LogoutLink>
    </div>
    </>
  )
}

export default DashSideBar


