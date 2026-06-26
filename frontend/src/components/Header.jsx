import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {ChefHat, Menu, X} from 'lucide-react'
import MenuItem from './MenuItem'

const Header = () => {
    const [sidebarOpen,setSidebarOpen]=useState(false)

    //close sidebar in large screen
    useEffect(()=>{
        const handleResize=()=>{
            if(window.innerWidth>=640){
                setSidebarOpen(false)
            }
        }
        window.addEventListener("resize",handleResize)
        handleResize()
        return ()=> window.removeEventListener("resize", handleResize)
    },[])
    
  return (
    <>
    {/* header for pc */}
    <header className='hidden h-12 md:flex px-10 py-4 items-center
      w-full fixed top-0 left-0 backdrop-blur-md shadow-xl z-50'>
        <div className='items-center gap-4  lg:flex hidden'>
            <ChefHat className='w-10 h-10 text-white animate-pulse'/>
            <h1 className='text-white font-bold text-xl tracking-widest'>My Restaurant</h1>
        </div>
        <div className='flex-1 flex justify-center lg:justify-end'>
            <MenuItem isMobile={false}/>

        </div>
    </header>

    {/*header for Mobile*/}

    <header className='md:hidden h-12 flex justify-between px-4 py-4 items-center
      w-full fixed top-0 left-0  backdrop-blur-md shadow-xl z-50'>
        <div className='flex items-center gap-2'>
            <ChefHat className='w-10 h-10 text-white animate-pulse'/>
            <h1 className='text-white font-bold text-xl tracking-widest'>My Restaurant</h1>
        </div>

        <button onClick={()=>setSidebarOpen(true)} 
        className='text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-transform '>
            <Menu className='w-8 h-8 cursor-pointer'/>
        </button>
    </header>


    {/* sidebar */}
    <aside className={`md:hidden fixed top-12 right-0 h-full w-72 bg-linear-to-b from-red-500 via-orange-500 to-yellow-500 shadow-2xl backdrop-blur-md transform transition-transform duration-500 z-40
        ${sidebarOpen ? "translate-x-0" :"translate-x-full"}`}>
        <div>
            <button onClick={()=>setSidebarOpen(false)} 
            className='text-white p-3 hover:bg-white/20 rounded-xl transition-all duration-300'>
                <X className='w-7 h-7'/>
            </button>
        </div>

        <div className='mt-10 px-6 space-y-6'>
            <MenuItem setSidebarOpen={setSidebarOpen} isMobile={true}/>

        </div>
    </aside>

    {sidebarOpen && (
        <div className='sm:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30' onClick={()=>setSidebarOpen(false)}>

        </div>
    )}

 

    
</>
  )
}

export default Header