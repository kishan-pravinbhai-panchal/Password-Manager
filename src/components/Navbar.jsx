import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white  ">
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-14 '>
        <div className='logo font-bold text-white text-2xl'>
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        <button className='flex items-center justify-center  bg-green-800 px-4 py-1 rounded-full border border-white'>
          <lord-icon
            src="https://cdn.lordicon.com/uvqdhrsk.json"
            trigger="loop"
            stroke="bold"
            colors="primary:#000000,secondary:#08a88a"
          >
          </lord-icon>
          <a href="https://github.com/kishan-pravinbhai-panchal" target='_blank'><span className='font-bold text-white px-2'>GitHub</span></a>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
