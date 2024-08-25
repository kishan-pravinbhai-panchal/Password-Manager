import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex  flex-col justify-center items-center w-full'>
            <div className='logo font-bold text-white text-2xl mt-2'>
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex'>
            <span className='mr-2 mb-2'>   Late nights, bright ideas — that's how I code  </span><lord-icon
                    src="https://cdn.lordicon.com/jjoolpwc.json"
                    trigger="loop"
                    delay="2000"
                    stroke="bold"
                    colors="primary:#c71f16,secondary:#08a88a"
                    state="morph-glitter"
                    >
                </lord-icon>
            </div>
        </div>
    )
}

export default Footer
