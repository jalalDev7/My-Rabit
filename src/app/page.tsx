import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import Footer from '@/components/Footer';
import { FaInstagram, FaMoneyBillWave, FaTiktok } from "react-icons/fa6"
import { FiYoutube } from 'react-icons/fi';
import { PiSnapchatLogoBold } from 'react-icons/pi';
import { CiLinkedin } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";


export default function Home() {
  return (
    <>
    <div className='bg-zinc-200'>
    <NavBar/>
    <MaxWidthWrapper className='mt-24 mb-24 px-6 lg:mt-24 2xl:mt-24 lg:mb-8 2xl:mb-8 flex flex-col items-center justify-center '>
      <h1 className='text-5xl font-bold lg:text-7xl 2xl:text-7xl'>
        Get more <span className='text-blue-600'>Money</span> from your links.
      </h1>
      <p className='mt-5  text-zinc-700 sm:text-lg'>
        With My-Rabit you can earn more money from your traffic
      </p>
      <RegisterLink className={buttonVariants({
        className: "mt-5 text-3xl",
      })}>
        Get started <ArrowRight className='ml-2 h-5 w-5 ' />
      </RegisterLink>
    </MaxWidthWrapper>

    <div>
      <div className='relative isolate'>
        <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 -top-20 transform-gpu -z-10 overflow-hidden blur-3xl '>
          <div 
            style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} 
            className='relative 2xl:left-[calc(70%-30rem)] 2xl:w-[72.1875rem] lg:left-[calc(70%-30rem)] lg:w-[72.1875rem] left-[calc(50%-11rem)] aspect-[1115/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 ' />
        </div>
        
        <div className='flex flex-col lg:flex-row 2xl:flex-row w-full gap-16 items-center justify-center'>
          <div className='flex flex-col lg:pl-20 2xl:pl-20 px-4 w-full items-start justify-start gap-4'>
            <h1 className='lg:text-4xl 2xk:text-4xl text-2xl font-bold text-black '>
              Our <span className='text-blue-600'>platform</span> offers a package of free services to help you create your own online space.
            </h1>
            <h1 className='text-md lg:text-lg 2xl:text-lg'>
            With us, you can create a free page with your own name that includes all your social media links as well as any other links you have, and thats not all.
            </h1>
            <RegisterLink className={buttonVariants({
              className: "mt-5 text-2xl",
            })}>
              Create a free account<ArrowRight className='ml-2 h-5 w-5 ' />
            </RegisterLink>
          </div>
          <div className='flex w-full justify-end '>
            <Image 
                src='/show-1.png' 
                alt='Product preview' 
                width={750} 
                height={750}
                quality={100}
                className='rounded-md '
                 />
          </div>
        </div>


        <div className='flex flex-col lg:flex-row-reverse 2xl:flex-row-reverse w-full items-center justify-center 2xl:px-20 lg:px-20 mt-16 2xl:mt-24 lg:mt-24 gap-16'>
          <div className='flex flex-col w-full items-start justify-start gap-4 px-4'>
            <h1 className='lg:text-4xl 2xk:text-4xl text-2xl font-bold text-black '>
              <span className='text-blue-600'>Create</span> and customize your page in minutes
            </h1>
            <h1 className='text-md lg:text-lg 2xl:text-lg'>
              Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
            </h1>
            <RegisterLink className={buttonVariants({
              size: 'lg',
              className: "mt-5",
            })}>
              Create your own pge<ArrowRight className='ml-2 h-5 w-5 ' />
            </RegisterLink>
          </div>
          <div className='flex w-full 2xl:w-[50%] lg:w-[50%] items-center justify-center px-4 2xl:px-20 lg:px-20  '>
            <div className='flex flex-col gap-4 w-full bg-white px-6 pt-12 pb-6 rounded-3xl shadow-2xl '>
              <div className='flex flex-row w-full items-center gap-6 rounded-3xl py-2 px-8 bg-gradient-to-r from-fuchsia-600 to-purple-600'>
                <FaInstagram className="w-12 h-12 text-white" />
                <h1 className='text-3xl font-bold text-white'>
                  instagram
                </h1>
              </div>
              <div className='flex flex-row w-full items-center gap-6 rounded-3xl py-2 px-8 bg-gradient-to-r from-fuchsia-600 to-purple-600'>
                <FiYoutube  className="w-12 h-12 text-white" />
                <h1 className='text-3xl font-bold text-white'>
                  Youtube
                </h1>
              </div>
              <div className='flex flex-row w-full items-center gap-6 rounded-3xl py-2 px-8 bg-gradient-to-r from-fuchsia-600 to-purple-600'>
                <FaTiktok  className="w-12 h-12 text-white" />
                <h1 className='text-3xl font-bold text-white'>
                  Tiktok
                </h1>
              </div>
              <div className='flex w-full items-center justify-center mt-12'>
                <h1 className='text-lg font-semibold'>
                  All your social media in one single page
                </h1>
              </div>
            </div>
          </div>          
        </div>

        <div aria-hidden="true" className='pointer-events-none absolute inset-x-0 top-[700px] transform-gpu -z-10 overflow-hidden blur-3xl '>
          <div 
            style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} 
            className='relative left-[calc(50%-11rem)] w-[36.125rem] aspect-[1115/678]  -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' />
        </div>
      </div>
    </div>
    

    <div className='flex flex-col w-full items-center justify-center gap-4 my-24 lg:my-44 2xl:my-44'>
      <h1 className='text-3xl lg:text-5xl 2xl:text-5xl font-bold'>
        Start earning easy <span className='text-blue-600'>money</span> now
      </h1>
      <h2 className='text-lg'>
        Turn your personal link to an online store
      </h2>
    </div>

    <div className='flex flex-col lg:flex-row 2xl:flex-row w-full gap-16 2xl:gap-2 lg:gap-2 items-center justify-center'>
        <div className='flex flex-col lg:pl-20 2xl:pl-20 px-4 w-full items-start justify-start gap-4'>
          <h1 className='lg:text-4xl 2xk:text-4xl text-2xl font-bold text-black '>
            Now we talk about <span className='text-blue-600'>Business</span>, how you can earn money from My-rabit.com ?
          </h1>
          <h1 className='text-md lg:text-lg 2xl:text-lg'>
            After creating your account and editing your page, you can choose any product that suits you and your audience to be displayed on your page. Consequently, any follower who buys any product through your page earns you a good commission without having to worry about the sales process, order confirmation, and product distribution.
          </h1>
          <RegisterLink className={buttonVariants({
              size: 'lg',
              className: "mt-5",
            })}>
            Start earning money<ArrowRight className='ml-2 h-5 w-5 ' />
          </RegisterLink>
        </div>
        <div className='flex w-full justify-center '>
            <Image 
                src='/product-show.png' 
                alt='Product preview' 
                width={450} 
                height={450}
                quality={100}
                className='rounded-3xl shadow-2xl '
                 />
        </div>
    </div>

    <div className='flex flex-col w-full items-center justify-center px-4 2xl:px-20 lg:px-20 gap-16 my-24 lg:my-44 2xl:my-44'>
      <h1 className='text-3xl lg:text-5xl 2xl:text-5xl font-bold'>
        The best choice for <span className='text-blue-600'>link</span> in bio.
      </h1>
      <div className='grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-3 w-full gap-6'>
        <div className='flex flex-col bg-white rounded-3xl shadow-xl'>
            <div className='flex w-full h-32 rounded-t-3xl items-center justify-center bg-gradient-to-r from-fuchsia-600 to-purple-600'>
              <div className='flex rounded-3xl text-lg font-semibold bg-white px-6 py-2'>
                my-rabit.com/you
              </div>
            </div>
            <div className='flex flex-col w-full gap-2 p-4 h-36'>
              <h1 className='text-lg font-semibold'>
                Make your own short link.
              </h1>
              <p className=''>
                All your social media accounts and your personal links in one page
              </p>
            </div>
        </div>
        <div className='flex flex-col bg-white rounded-3xl shadow-xl'>
            <div className='flex w-full h-32 rounded-t-3xl items-center justify-center bg-gradient-to-r from-fuchsia-500 to-pink-500'>
              <div className='flex flex-row gap-2 '>
                <FaInstagram className="w-12 h-12 text-white" />
                <FiYoutube  className="w-12 h-12 text-white" />
                <PiSnapchatLogoBold   className="w-12 h-12 text-white" />
                <CiLinkedin className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className='flex flex-col w-full gap-2 p-4 h-36'>
              <h1 className='text-lg font-semibold'>
                Make it easy to share
              </h1>
              <p className=''>
                Get more traffic from link in bio, by collecting all your links in one page.
              </p>
            </div>
        </div>
        <div className='flex flex-col bg-white rounded-3xl shadow-xl'>
            <div className='flex w-full h-32 rounded-t-3xl items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500'>
              <div className='flex flex-row justify-end items-end gap-2 '>
                <BsCashCoin  className="w-12 h-12 text-white" />
                <BsCashCoin  className="w-16 h-16 text-white" />
                <BsCashCoin  className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className='flex flex-col w-full gap-2 p-4 h-36'>
              <h1 className='text-lg font-semibold'>
                Get more money from internet
              </h1>
              <p className=''>
                This is the easiest way to earn money, its your chance ta make more money now.
              </p>
            </div>
        </div>
      </div>
    </div>

    <div className='flex w-full mt-32 lg:px-12 2xl:px-12 py-8 '>
      <Footer />
    </div>
    </div>
    

    </>
  )
}
