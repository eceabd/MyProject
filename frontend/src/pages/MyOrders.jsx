import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { CheckCircle, Loader, Loader2, XCircle } from 'lucide-react'

const MyOrders = () => {
  const [orders,setOrders] = useState([])
  const [loading,setLoading] = useState(true)
  const {url,token} = useContext(ShopContext)
  console.log(orders)
  
  const fetchOrders = async () =>{
    const token = localStorage.getItem('token');
    try{
      const res =await axios.post(`${url}/api/order/userorders` ,{} , {headers:{token}})
      const data = res.data.data;

      const orderData = Array.isArray(data) ? data :[data]
      setOrders(orderData)
      setLoading(false)
    }catch(error){
      console.log(error)
      setOrders([])

    }
  }

  useEffect(()=>{
    const getOrders = async () => {
      if(token){
        await fetchOrders()
      }

    }
    getOrders()
  },[token])


  if(loading){
    return(
      <section className='min-h-screen flex items-center justify-center bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-6 '>
        <div className='flex flex-col items-center'>
          <Loader className='w-20 h-20 animate-spin text-white mb-4'/>
          <h2 className='text-2xl font-semibold'>......جاري تحميل طلباتك</h2>
          <p className='text-gray-100 mt-2'>..... يرجى الإنتظار</p>
        </div>
      </section>
    )
  }
  return (
    <section className='bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 min-h-screen px-6 py-10'>
      <h1 className='text-3xl font-bold text-white mt-10 mb-8 text-center'>طلباتي</h1>

      {orders.length === 0 ? (
        <p className='text-center'>! لا يوجد طلبات بعد</p>
      ):(
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 '>
          {orders.map((order)=>{
            return (
              <div key={order._id} className='p-4 bg-linear-to-r from-red-500 to-transparent rounded-2xl shadow-lg flex flex-col justify-between hover:scale-105 transform transition-all duration-300'>
                <div>
                  <h2 className='text-lg font-semibold mb-2 text-white'>order ID : {order._id.slice(-6).toUpperCase()}</h2>
                  <p className="mb-4 text-white">
                    {order.items?.length || 0 }
                    {order.items && order.items.length > 1 ? "عناصر" : "عنصر"}
                  </p>                  

                  <div className='space-y-2 '>
                    {order.items?.map((item)=>(
                      <div key={item._id} className='flex justify-between items-center border-b border-gray-200'>
                        <div className='flex items-center gap-2'>
                          {item.image && (
                            <img src={`${url}/image/${item.image}`} className='w-12 h-12 object-cover rounded' />

                          )}
                          <p className='text-white'>
                            {item.name} x {item.quantity || 1}
                          </p>

                          
                        </div>
                        <p className='font-semibold text-white'>
                          s.p{item.price * (item.quantity || 1)}

                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='mt-4 flex justify-between items-center '>
                  <span className={`flex items-center gap-2 font-semibold ${order.status === "delivered" ?"text-green-400" :order.status === "pending" ? "text-yellow-400" : "text-red-500"}`}>
                    {order.status === "delivered" && <CheckCircle/>}
                    {order.status === "pending" && <Loader2 className='animate-spin'/>}
                    {order.status === "canceled" && <XCircle/>}
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    
                  </span>
                  <span className='font-bold text-white'>s.p{order.amount}</span>
                </div>
              </div>
            )
            
            
            })}
          

        </div>
      )}
      
    </section>
  )
}

export default MyOrders