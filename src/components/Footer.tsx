import Link from "next/link"
import {BsTelephoneInbound, BsWhatsapp} from "react-icons/bs"
import { FaHeart } from "react-icons/fa"
import { MdOutlineMarkEmailUnread } from 'react-icons/md'

const Footer = () => {
  return (

        <div className='w-full flex flex-col lg:flex-row 2xl:flex-row gap-4 justify-between items-center text-zinc-700 mt-12 px-8 '>
          <div className='flex flex-col w-full items-center lg:items-start 2xl:items-start gap-2'>
            <div className='flex '>
                <Link href="/" className='flex font-semibold text-2xl'>
                    <span>My<span className='text-blue-600'>-Rabit</span></span>
                </Link>
            </div>
            <div className='flex flex-row gap-2'>
              <Link href="/" >
                <h1 className='text-sm font-semibold'>
                  Terms and conditions
                </h1>
              </Link>
              <Link href="/">
                <h1 className='text-sm font-semibold'>
                  Privacy policy
                </h1>
              </Link>
            </div>
            <div className='flex flex-row gap-2'>
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
            <div className='flex flex-row gap-2 '>
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

          <div className="flex lg:justify-end 2xl:justify-end lg:items-end 2xl:items-end 2xl:h-full lg:h-full 2xl:w-full lg:w-full ">
            <h1 className='flex flex-row gap-1 text-sm font-semibold'>
            © 2024, made with <FaHeart className="h-4 w-4 text-red-500" /> by JalalHiTech.
            </h1>
          </div>

        </div>

    
  )
}

export default Footer