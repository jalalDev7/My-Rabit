import { trpc } from '@/app/_trpc/Client'
import React from 'react'

const AdminProductEdit = (params: {productId: string}) => {

    const {data: product, isLoading} = trpc.getProductsById.useQuery({query: params.productId})


  return (<>
        {product ? (
            <div>
                
            </div>
        ): isLoading ? (
            <div>

            </div>
        ): null}
    </>)
}

export default AdminProductEdit