"use client"

import Analytics from "./Analytics"
import LinksList from "./LinksList"
import SellerChoosenProducts from "./SellerChoosenProducts"

  
const Dashboard = () => {
  document.title = `My-Rabit.com | Dashboard`
  return (<>
      <Analytics />
      <LinksList />
      <SellerChoosenProducts />
  </>
  )
}

export default Dashboard