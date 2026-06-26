import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'



const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url ,clearCart , removeFromCart, token, getTotalCartAmount}=useContext(ShopContext)
  const navigate = useNavigate()

  const [status, setStatus] = useState("loading")

  useEffect(()=>{
    if(!token) return
    const verifyPayment = async ()=>{
      try{
        const res= await axios.post(`${url}/api/order/verify` ,{success,orderId} ,{headers:{token}})
        if(res.data.success){
          await clearCart()
          setStatus("success")
          setTimeout(()=>navigate("/myorders"),2000)
        }else{
          setStatus("error")
          setTimeout(()=>navigate("/"),2000)
        }
      }catch(error){
        console.log(error)
        setStatus("error")
        setTimeout(()=>navigate("/"),2000)

      }
    }
    verifyPayment()
  },[success,orderId,url,navigate,token])
  return (
    <section className='relative w-full min-h-screen bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-24 sm:px-10'>
      <div className='text-center flex flex-col items-center'>
        {status === "loading" && (
          <div className='flex flex-col items-center animate-pulse'>
            <Loader2 className='w-20 h-20 animate-spin mb-6'/>
            <h2 className='text-2xl font-semibold'>....... جاري التحقق من عملية الدفع</h2>
            <p className='text-gray-100 mt-2'>يرجى الانتظار قليلاً</p>
            
          </div>
        )}
        {status === "success" && (
          <div className='flex flex-col items-center animate-pulse'>
            <CheckCircle className='w-20 h-20  mb-6 text-green-400'/>
            <h2 className='text-2xl font-semibold'> ! تم الدفع بنجاح</h2>
            <p className='text-gray-100 mt-2'>...... سيتم نقلك إلى طلباتك الآن</p>
            
          </div>
        )}
        {status === "error" && (
          <div className='flex flex-col items-center animate-pulse'>
            <XCircle className='w-20 h-20 text-red-600 mb-6'/>
            <h2 className='text-2xl font-semibold'>فشلت عملية الدفع</h2>
            <p className='text-gray-100 mt-2'>..... حدث خطأ أثناء عملية الدفع  , سيتم نقلك إلى الصفحة الرئيسية</p>
            
          </div>
        )}
      </div>
      
    </section>
  )
}

export default Verify