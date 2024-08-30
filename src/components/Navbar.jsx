import React from 'react'
import logo from "../assets/Todoicon.png"

const Navbar = ({ showHome, showCompleted }) => {
    return (
        <nav className=' bg-[#070F2B] h-12 flex items-center justify-between p-7 max-sm:flex-col max-sm:h-28 max-sm:p-2 max-sm:justify-center'>

            <div className=" mx-12 logo flex gap-4 items-center">
                <img src={logo} alt="logo" className='h-12' />
                <h1 className='font-bold font-serif  text-2xl text-[#C9A7F7] cursor-default' >hyper TODO</h1>
            </div>
            <ul className='flex gap-10 font-serif text-xl font-semibold items-center mx-20 '>
                <button className='cursor-pointer text-[#C9A7F7] p-2  hover:text-[#E4CCFF] active:text-[#5E2F9C]' onClick={() => showHome()}>Home</button>
                <button className='cursor-pointer text-[#C9A7F7] p-2  hover:text-[#E4CCFF] active:text-[#5E2F9C]' onClick={() => showCompleted()}>Completed</button>
            </ul>

        </nav>
    )
}

export default Navbar