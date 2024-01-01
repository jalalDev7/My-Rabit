import Footer from '@/components/Footer'
import ProductTopBar from '@/components/ProductTopBar'
import ProductViewBuy from '@/components/ProductViewBuy'
import ProductViewDetails from '@/components/ProductViewDetails'
import ProductViewImg from '@/components/ProductViewImg'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
      productId: string,
      user: string
  }
}

const page = async ({params}: PageProps) => {

  
  const user = await db.user.findFirst({
    where: {
        username: params.user,
    }
  })

  if (!user) notFound()

  
  const product = await db.products.findFirst({
    where: {
        id: params.productId,
    }
  })

  if (!product) notFound()

  const {getUser} = getKindeServerSession()
  const checkSess = getUser()

  if (!checkSess) {

    const checkProductSelect = await db.userProducts.findFirst({
      where: {
        productId: params.productId,
        userId: user.id,
      }
    })

    if (!checkProductSelect) notFound()
  }
  
 
  return (<>
    <ProductTopBar user={user} />
    <div className='flex flex-col lg:flex-row 2xl:flex-row w-full lg:px-32 2xl:px-32 items-center justify-center'>
        <div className='flex w-full lg:w-[650px] 2xl:w-[650px]'>
          <ProductViewImg productImg={product.productImg} username={params.user}/>
        </div>
        <div className='flex flex-col items-start justify-start w-full 2xl:px-2 lg:px-2 px-2 '>
            <ProductViewDetails productDesc={product.productDesc} productTitle={product.productTitle} productPrice={product.productPrice}/>
            <ProductViewBuy productPrice={product.productPrice} productVar={product.productVar} productId={product.id} user={user.id} />
        </div>
    </div>
    <div className='flex w-full lg:px-52 2xl:px-52 py-8'>
      <Footer />
    </div>
    </>
  )
}

export default page