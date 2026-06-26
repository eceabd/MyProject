import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'


const Login = () => {
  const navigate= useNavigate()
  const [state,setState]=useState("login")
  const {url, setToken}= useContext(ShopContext)
  const [formData,setFormData]= useState({name:"",email:"",password:""})

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setFormData((data)=>({...data,[name]:value}))
  }


  const onLogin = async (event) =>{
    event.preventDefault()
    let newUrl = url
    if(state === "login") {
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }

    try{
      const res = await axios.post(newUrl, formData)
      if(res.data.success) {
        setToken(res.data.token)
        localStorage.setItem("token" , res.data.token)
        navigate("/")

      }else{
        alert(res.data.message)
      }
    }catch(error){
      console.log(error)
      alert("Error")

    }
  } 

  
  return (
    <section className='relative w-full min-h-screen bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-24 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'></div>
      <div className='relative z-10 max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl'>
        <h2 className='text-3xl sm:text-4xl font-extrabold mb-6 text-center'>تسجيل الدخول</h2>
        <form onSubmit={onLogin} className='flex flex-col gap-6'>
          <input type="email" name="email" placeholder='البريد الالكتروني' value={formData.email} onChange={onChangeHandler} required className='w-full bg-white/30 p-4 rounded-xl text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all'/>
          <input type="password" name="password" placeholder='كلمة المرور' value={formData.password} onChange={onChangeHandler} required className='w-full bg-white/30 p-4 rounded-xl text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all'/>
          <button type='submit' className='bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg'>تسجيل الدخول</button>
        </form>
        <p className='mt-6 text-center text-gray-100'>
          ليس لديك حساب؟  {""}
          <span onClick={()=>navigate("/signup")} className='text-blue-800 font-semibold cursor-pointer hover:underline text-lg'>انشئ حساب</span>

        </p>
      </div>
      
    </section>
  )
}

export default Login