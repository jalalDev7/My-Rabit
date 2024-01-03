"use client"
import Link from 'next/link'
import { useState } from "react"
import AddProduct from "./AddProduct"
import AdminProducts from "./AdminProducts"
import DeleteCat from "./DeleteCat"
import NewCat from "./NewCat"
import AdminOrders from "./AdminOrders"
import AdminDemandePay from "./AdminDemandePay"
import AdminThemes from "./AdminThemes"
import AdminMem from "./AdminMem"
import { useParams, useSearchParams } from 'next/navigation'
import AdminProductEdit from './AdminProductEdit'

  
const AdminTools = () => {

  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const productId = searchParams.get('product')

  
  window.document.title = `My-Rabit.com | Admin`

  return (<>
    <div className="flex flex-row p-4 w-full">
      <div className="flex flex-row w-full bg-white border-zinc-300 border-2 rounded-lg p-2 ">
        <ul className='flex flex-row gap-1 2xl:gap-4 lg:gap-4 w-full items-center justify-center'>
          <Link href="admin">
            <li className='flex w-full cursor-pointer text-sm lg:text-lg 2xl:text-lg font-semibold items-center justify-center hover:bg-zinc-200 rounded-lg py-2'>
              Products
            </li>
          </Link>
          <Link href="admin?mode=orders">
            <li className='flex w-full cursor-pointer text-sm lg:text-lg 2xl:text-lg font-semibold items-center justify-center hover:bg-zinc-200 rounded-lg py-2'>
              Orders
            </li>
          </Link>
          <Link href="admin?mode=demandePay">
            <li className='flex w-full cursor-pointer text-sm lg:text-lg 2xl:text-lg font-semibold items-center justify-center hover:bg-zinc-200 rounded-lg py-2'>
              Paiment
            </li>
          </Link>
          <Link href="admin?mode=themes">
            <li className='flex w-full cursor-pointer text-sm lg:text-lg 2xl:text-lg font-semibold items-center justify-center hover:bg-zinc-200 rounded-lg py-2'>
              Themes
            </li>
          </Link>
          <Link href="admin?mode=members">
            <li className='flex w-full cursor-pointer text-sm lg:text-lg 2xl:text-lg font-semibold items-center justify-center hover:bg-zinc-200 rounded-lg py-2'>
              Members
            </li>
          </Link>
        </ul>
      </div>
    </div>
    <div className="flex flex-col w-full p-4">
      {mode === "orders" ? (
        <AdminOrders />
      ): mode === "demandePay" ? (
        <AdminDemandePay />
      ): mode === "themes" ? (
        <AdminThemes />
      ): mode === "edit" && productId  ? (
        <AdminProductEdit productId={productId} />
      ): mode === "members" ? (
        <AdminMem />
      ): [
        <>
        <AddProduct />
        <div className='flex flex-col lg:flex-row 2xl:flex-row gap-4'>
          <NewCat />
          <DeleteCat />
        </div>
        
        <AdminProducts />
        </>
      ]}
    </div>
    
    
      
  </>
  )
}

export default AdminTools