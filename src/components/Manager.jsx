import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()

    const [form, setform] = useState({ site: "", password: "", username: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/2.gif")) {
            toast.success('Show the Password', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            ref.current.src = "/1.gif"
            passwordRef.current.type = "text"
        } else {
            toast.success('Hide the Password', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            ref.current.src = "/2.gif"
            passwordRef.current.type = "password"
        }
    }
    const savePassword = () => {
        if(form.site.length >3 && form.username.length > 3 && form.password.length > 3){
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log([...passwordArray, form])
        setform({ site: "", password: "", username: "" })
        toast("password saved successfully")
    }
    else{
        toast("Error : password not saved")
    }
    }



    // delete password
    const deletePassword = (id) => {
        console.log("deleting password with id", id)
        let c = confirm("Do you want to delete the password")
        if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
        toast("Delete password successfully")
    }
   
    }
    const editPassword = (id) => {
        console.log("editing password with id", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-2 pt-3 md:mycontainer min-h-[88.2vh]">
                <h1 className='text-4xl text-center font-bold'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-center text-green-900 text-lg '>Your Own Password Manager</p>
                <div className='text-black flex flex-col items-center p-4 text-black gap-8'>
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='site' placeholder='Enter Website Name' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='username' id='username' placeholder='Enter UserName' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' id='password' placeholder='Enter Password' />
                            <span className="absolute  right-[12px] top-[3px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1 z-5000" width={30} src="../public/2.gif" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center text-black bg-green-500 hover:bg-green-300 rounded-full px-8 py-2 w-fit border-2 border-green-900' ><lord-icon
                        src="https://cdn.lordicon.com/zrkkrrpl.json"
                        trigger="hover"
                        stroke="bold"
                        state="hover-swirl"
                        colors="primary:#121331,secondary:#121331">
                    </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-green-900 text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div><h2 className='text-center text-green-400 text-xl'>No passwords to show</h2></div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 border border-white'>Site</th>
                                    <th className='py-2 border border-white'>Username</th>
                                    <th className='py-2 border border-white'>Password</th>
                                    <th className='py-2 border border-white'>Delete</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center w-32  '>
                                            <a href={item.site} target='_blank' className='text-l'><b>{item.site}</b></a>
                                            <i className="fa-regular fa-copy text-2xl px-10 cursor-pointer text-green-900 hover:text-green-900" onClick={() => { copyText(item.site) }}></i>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32 text-l  '><b>{item.username}</b>
                                            <i className="fa-regular fa-copy text-2xl px-10 cursor-pointer text-green-900 hover:text-green-500" onClick={() => { copyText(item.username) }}></i>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32 text-l'><b>{item.password}</b>
                                            <i className="fa-regular fa-copy text-2xl px-10 cursor-pointer text-green-900 hover:text-green-500" onClick={() => { copyText(item.password) }}></i>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32 cursor-pointer'>
                                            <span className=' cursor-pointer mx-4' onClick={()=>{editPassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="loop"
                                                    stroke="bold"
                                                    delay="1000"
                                                    colors="primary:#000000,secondary:#08a88a"
                                                >
                                                </lord-icon>
                                            </span>
                                            <span className=' cursor-pointer mx-4' onClick={()=>{deletePassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="click"
                                                    stroke="bold"
                                                    state="morph-trash-out"
                                                    colors="primary:#000000,secondary:#08a88a">
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>

                                })}



                            </tbody>
                        </table>}
                </div>


            </div >
        </>

    )
}

export default Manager
