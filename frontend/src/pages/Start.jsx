import React from 'react'
import { Link } from 'react-router-dom'
import lightninglogo from '../assets/lightninglogo.svg'
import swiftridemain from '../assets/swiftridemain.svg'

const Start = () => {
    console.log('Start page rendered');
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(/swiftride.png)] h-screen pt-6 flex justify-between flex-col w-full'>
            <div className='w-50 ml-4 flex items-center' >
                <Link to='/' className='flex items-center'>
                         <img src={lightninglogo} alt='Swift Ride Logo' className=' w-10 object-contain' />

                 <img src={swiftridemain} alt='Swift Ride Logo' className=' w-28  object-contain' /> </Link>
        
</div>
            <div className='bg-white pb-8 py-4 px-4'>
                <h2 className='text-[28px] font-semibold'>Get Started with Swift Ride</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start