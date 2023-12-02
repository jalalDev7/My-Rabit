"use client"

import { useState } from "react"
import AddProduct from "./AddProduct"
import AdminProducts from "./AdminProducts"
import DeleteCat from "./DeleteCat"
import NewCat from "./NewCat"
import AdminOrders from "./AdminOrders"
import AdminDemandePay from "./AdminDemandePay"
import AdminThemes from "./AdminThemes"


  
const AdminTools = () => {

  

  const [uiChooser, setUiChooser] = useState("products")
  window.document.title = `My-Rabit.com | Admin`

  return (<>
    <div className="flex flex-row py-2 w-full items-center justify-center gap-2">
      <button className="font-semibold text-lg bg-blue-200 p-2 rounded-lg border-blue-400 border-2"
      onClick={() => (setUiChooser("products"))}
      >
        Products Settings
      </button>
      <button className="font-semibold text-lg bg-blue-200 p-2 rounded-lg border-blue-400 border-2"
      onClick={() => (setUiChooser("orders"))}
      >
        Orders
      </button>
      <button className="font-semibold text-lg bg-blue-200 p-2 rounded-lg border-blue-400 border-2"
      onClick={() => (setUiChooser("demandePay"))}
      >
        Demande pay
      </button>
      <button className="font-semibold text-lg bg-blue-200 p-2 rounded-lg border-blue-400 border-2"
      onClick={() => (setUiChooser("themes"))}
      >
        Themes
      </button>
    </div>
    {uiChooser === "products" ? (
      <>
      <NewCat />
      <DeleteCat />
      <AddProduct />
      <AdminProducts />
      </>
    ): uiChooser === "orders" ? (
      <AdminOrders />
    ): uiChooser === "demandePay" ? (
        <AdminDemandePay />
    ): uiChooser === "themes" ? (
        <AdminThemes />
    ): []}
    
      
  </>
  )
}

export default AdminTools