import React from 'react'

const Footer = () => {
  return (
    <div className='text-[#9290C3] w-screen p-2 fixed bottom-0 bg-[#070F2B] flex justify-evenly max-sm:flex-col max-sm:justify-center max-sm:items-center '>
        <h2 className='cursor-default'>Created By : Shubham Sharma</h2>
        <div className="social flex gap-2">
            <a href="https://github.com/ShubhamSharmax" className=' hover:text-[#E4CCFF] active:text-[#5E2F9C]'>Github</a><p>|</p>
            <a href="https://www.linkedin.com/in/shubham-sharma02/" className=' hover:text-[#E4CCFF] active:text-[#5E2F9C]'>LinkedIn</a>
        </div>
    </div>
  )
}

export default Footer