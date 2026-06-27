import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AdminLogin = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()
    const url = "https://myproject-o6u3.onrender.com"
    useEffect(()=>{
      const token = localStorage.getItem("adminToken")
      if(token){
        navigate("/admin/list")
      }
    },[navigate])

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
        const {data} = await axios.post(url , {email, password})
        if(data.success){
          localStorage.setItem("adminToken" , data.token)
          navigate("/admin/list")
        }
      }catch(error){
        console.log(error)
      }
    }

  return (
    <div className='relative w-full min-h-screen flex items-center justify-center
    bg-linear-to-r from-red-500 via-orange-500 to-yellow-500
     text-white py-24 sm:px-10'>
      <div className='absolute w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-20 top-20 left-30 animate-pulse'></div>        
      <div className='absolute w-72 h-72 bg-red-800 rounded-full blur-3xl opacity-20 bottom-20 right-20 animate-pulse'></div>
      
      <form onSubmit={handleSubmit} className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-2xl text-white w-96 flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">تسجيل دخول المشرفين</h2>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="البريد الالكتروني" className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/20 placeholder-black-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white required:"/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="كلمة المرور" className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/20 placeholder-black-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white required:"/>
        <button type="submit" className="w-full bg-linear-to-r from-red-500 via-orange-500 to-yellow-500
     text-white p-3 mb-4 rounded-lg font-semibold shadow-lg hover:shadow-amber-500/30 transition-all duration- vnn66gx hover:scale-[1.03]">تسجيل الدخول</button>
       </form>  
    </div>
  )
}

export default AdminLogin