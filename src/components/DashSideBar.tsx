
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
  if (dbUser && dbUser.userRank == 0 && dbUser.userState == "designer") gridNum = "grid-cols-7"
  return (
    
    <>
    <div className={`fixed left-0 top-0 z-40 lg:flex 2xl:flex hidden flex-col w-[250px] h-screen pb-6 gap-6 bg-zinc-100 border-l-[1px] justify-start items-start shadow-[rgba(0,0,10,0.5)_0px_0px_20px_0px]`}>
        <Link href="/" className='flex w-full pl-4 py-6 mb-6 font-semibold text-2xl border-b border-zinc-200'>
          <span>My<span className='text-blue-600'>-Rabit</span></span>
        </Link>
        <Link href="/dashboard" className='group flex w-full pl-4 py-2' >
          <div className='flex flex-row w-full justify-center gap-4 items-center text-black group-hover:text-blue-600'>
            <div className='flex justify-start p-2 bg-white border-2 border-zinc-500 rounded-lg shadow-xl'>
              <RiDashboardFill className=' h-[25px] w-[25px] '/> 
            </div>
            <h1 className='flex w-full h-full justify-start items-center font-semibold text-2xl group-hover:text-blue-600'>
              Dashboard
            </h1>
          </div>
        </Link>
        <Link href="/settings" className='group flex w-full pl-4 py-2 ' >
          <div className='flex flex-row w-full justify-center gap-4 items-center text-black group-hover:text-blue-600'>
            <div className='flex justify-start items-center p-2 bg-white border-2 border-zinc-500 rounded-lg shadow-xl'>
              <RiSettings3Fill className=' h-[25px] w-[25px] '/> 
            </div>
            <h1 className='flex w-full justify-start items-center font-semibold text-2xl group-hover:text-blue-600'>
              Settings
            </h1>
          </div>
        </Link>
        <Link href="/seller" className='group flex w-full pl-4 py-2'>
          <div className='flex flex-row w-full justify-center gap-4 items-center text-black group-hover:text-blue-600'>
            <div className='flex justify-start items-center  p-2 bg-white border-2 border-zinc-500 rounded-lg shadow-xl'>
              <AiOutlineShop className=' h-[25px] w-[25px] '/> 
            </div>
            <h1 className='flex w-full justify-start items-center font-semibold text-2xl '>
              Shop
            </h1>
          </div>
        </Link>
        <Link href="/orders" className='group flex w-full pl-4 py-2'>
          <div className='flex flex-row w-full justify-center gap-4 items-center text-black group-hover:text-blue-600'>
            <div className='flex justify-start items-center p-2 bg-white border-2 border-zinc-500 rounded-lg shadow-xl'>
              <LiaCashRegisterSolid className=' h-[25px] w-[25px] '/> 
            </div>
            <h1 className='flex w-full justify-start items-center font-semibold text-2xl'>
              Orders
            </h1>
          </div>
        </Link>
        {dbUser?.userRank == 0 ? (
          <Link href="/admin" className='group flex w-full pl-4 py-2 '>
            <div className='flex flex-row w-full justify-center gap-4 items-center text-black group-hover:text-blue-600'>
              <div className='flex justify-start items-center p-2 bg-white border-2 border-zinc-500 rounded-lg shadow-xl'>
                <GrUserAdmin className=' h-[25px] w-[25px] '/> 
              </div>
              <h1 className='flex w-full justify-start items-center font-semibold text-2xl'>
                Admin
            </h1>
            </div>
          </Link>
        ): null}
        {dbUser?.userState == "designer" ? (
          <Link href="/designer" className='group flex w-full pl-4 py-2'>
            <div className='flex flex-row w-full justify-center gap-4 items-center text-black group-hover:text-blue-600'>
              <div className='flex justify-start items-center p-2 bg-white border-2 border-zinc-500 rounded-lg shadow-xl'>
                <MdDesignServices className=' h-[25px] w-[25px] '/> 
              </div> 
              <h1 className='flex w-full justify-start items-center font-semibold text-2xl'>
                Workshop
            </h1>
            </div>
          </Link>
        ): null}
        <LogoutLink className="group flex w-full h-full justify-end items-end pl-4 ">
          <div className='flex flex-row w-full justify-center gap-4 items-center text-black group-hover:text-blue-600'>
            <div className='flex justify-start items-center p-2 bg-white border-2 border-zinc-500 rounded-lg shadow-xl'>
                <IoLogOut className=' h-[25px] w-[25px] '/> 
              </div> 
            <h1 className='flex w-full justify-start items-center font-semibold text-2xl'>
              Log out
            </h1>
          </div>
        </LogoutLink>
    </div>





    <div className={`fixed lg:hidden 2xl:hidden grid ${gridNum} w-full bottom-0 bg-white  p-2 border-t-[1px] justify-center items-center z-10 shadow-[rgba(0,0,10,0.5)_0px_0px_20px_0px]`}>
        <Link href="/dashboard" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <RiDashboardFill className='h-[35px] w-[35px]'/>
          </div>
        </Link>
        <Link href="/settings" >
          <div className='flex items-center 2xl:p-2 lg:p-2 p-1 text-balck rounded-lg  hover:shadow-xl hover:bg-zinc-200 justify-center'>
            <RiSettings3Fill className='h-[35px] w-[35px]'/>
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


