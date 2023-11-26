import Link from "next/link"
import {BsTelephoneInbound, BsWhatsapp} from "react-icons/bs"
import { MdOutlineMarkEmailUnread } from 'react-icons/md'

const Footer = () => {
  return (

        <div className='w-full flex flex-row gap-2 justify-between items-cente bg-zinc-800 text-white mt-32 p-4 '>
          <div className='flex flex-col items-start gap-2 lg:px-52 2xl:px-52'>
            <div className=''>
                <Link href="/" className='flex z-40 font-semibold text-2xl'>
                    <span>My<span className='text-blue-600'>-Rabit</span></span>
                </Link>
            </div>
            <div className='flex flex-row gap-2'>
              <Link href="/" >
                <h1 className='text-sm'>
                  Terms and conditions
                </h1>
              </Link>
              <Link href="/">
                <h1 className='text-sm '>
                  Privacy policy
                </h1>
              </Link>
            </div>
            <div className='flex flex-row gap-2 items-center justify-center'>
              <div className='flex flex-row gap-2'>
                <BsWhatsapp />
                <Link href="/">
                  <h1 className='text-sm '>
                    +212676235348
                  </h1>
                </Link>
              </div>
              <div className='flex flex-row gap-2'>
                <BsTelephoneInbound />
                <Link href="/">
                  <h1 className='text-sm '>
                    +212676235348
                  </h1>
                </Link>
              </div>
            </div>
            <div className='flex flex-row gap-2 items-center justify-center '>
              <div className='flex flex-row gap-2 items-center'>
                <MdOutlineMarkEmailUnread  />
                <Link href="/">
                  <h1 className='text-sm '>
                    contact.jalalhitech@gmail.com
                  </h1>
                </Link>
              </div>
            </div>
            
          </div>
          <div className="flex lg:px-52 2xl:px-52 ">
            <h1 className='text-sm font-semibold flex items-end h-full justify-center'>
              All right reserved 2023-2024
            </h1>
          </div>
        </div>

    
  )
}

export default Footer