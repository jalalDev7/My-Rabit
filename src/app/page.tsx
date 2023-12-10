import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';



export default function Home() {
  return (
    <>
    <NavBar/>
    <MaxWidthWrapper className='mb-12 mt-12 sm:mt-40 flex flex-col items-center justify-center'>
      <h1 className='max-w4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
        Get more <span className='text-blue-600'>Money</span> from your links.
      </h1>
      <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
        With My-Rabit you can earn more money from your traffic
      </p>
      <RegisterLink className={buttonVariants({
        size: 'lg',
        className: "mt-5",
      })}>
        Get Started <ArrowRight className='ml-2 h-5 w-5 ' />
      </RegisterLink>
    </MaxWidthWrapper>

    <div>
      <div className='relative isolate'>
        <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-20 transform-gpu -z-10 overflow-hidden blur-3xl sm;-top-80'>
          <div 
            style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} 
            className='relative left-[calc(50%-11rem)] aspect-[1115/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
        </div>
        <div>
          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='mt-16 flow-root sm:mt-24'>
              <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                <Image 
                src='/dashboard-preview.jpg' 
                alt='Product preview' 
                width={1364} 
                height={866}
                quality={100}
                className='rounded-md p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 bg-white'
                 />
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm;-top-80'>
          <div 
            style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} 
            className='relative left-[calc(50%-13rem)] aspect-[1115/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]' />
        </div>
      </div>
    </div>

    <div className='mx-auto mt-32 max-w-5xl sm:mt-56'>
      <div className='mb-12 px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <h2 className='mt-2 font-bold text-gray-900 sm:text-5xl '>
            Start earning easy money now
          </h2>
          <p className='mt-4 text-lg text-gray-600'>
            Turn your personal link to an online store
          </p>
        </div>
      </div>

      <ol className='m-y8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0 mb-10'>
        <li className='md:flex-1'>
          <div className='flex flex-col space-y-2 border-1-4 border-zinc-300 py-2 pl-4 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
            <span className='text-small font-meduim text-blu-600'>
              Step 1
            </span>
            <span className='text-xl font-semibold'>
              Sign up for an account
            </span>
            <span className='mt-2 text-zinc-700'>
              Create a new account and set up your profile an your links.
            </span>
          </div>
        </li>
        <li className='md:flex-1'>
          <div className='flex flex-col space-y-2 border-1-4 border-zinc-300 py-2 pl-4 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
            <span className='text-small font-meduim text-blu-600'>
              Step 2
            </span>
            <span className='text-xl font-semibold'>
              Choose some products to sell
            </span>
            <span className='mt-2 text-zinc-700'>
              We will complete the confirmation, sale and sending process 
            </span>
          </div>
        </li>
        <li className='md:flex-1'>
          <div className='flex flex-col space-y-2 border-1-4 border-zinc-300 py-2 pl-4 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
            <span className='text-small font-meduim text-blu-600'>
              Step 3
            </span>
            <span className='text-xl font-semibold'>
              Share your link
            </span>
            <span className='mt-2 text-zinc-700'>
            Share the link with your audience and encourage them to buy the products
            </span>
          </div>
        </li>
      </ol>
      


      
      
    </div>
    </>
  )
}
