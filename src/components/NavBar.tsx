import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import {LoginLink, LogoutLink, RegisterLink, getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight, LogOut } from 'lucide-react'


const NavBar = () => {
    const {getUser} = getKindeServerSession()
    const checkUser = getUser()


  return (
    <nav>
        <MaxWidthWrapper>
            <div className='flex h-14 items-center justify-between border-b border-zinc-300'>
                <Link href="/" className='flex z-40 font-semibold text-xl'>
                    <span>My<span className='text-blue-600'>-Rabit</span></span>
                </Link>
                {/* to do : add mobile navbar*/}
                <div className='flex items-center space-x-4 '>
                    <>
                        {checkUser && 
                        <Link href="/dashboard" className={buttonVariants({variant: "ghost",size: "sm"})}> 
                            Dashboard
                        </Link>
                        }
                        {!checkUser && 
                        <LoginLink className={buttonVariants({variant: "ghost",size: "sm"})}> 
                            Log in
                        </LoginLink>
                        }
                        {!checkUser && 
                        <RegisterLink className={buttonVariants({size: "sm"})}> 
                            Get started <ArrowRight className='ml-1.5 h-5 w-5' />
                        </RegisterLink>
                        }
                        {checkUser && 
                        <LogoutLink className={buttonVariants({size: "sm"})}>
                            <LogOut className='w-5 h-5' />
                        </LogoutLink>
                        }
                    </>
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}

export default NavBar