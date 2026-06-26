import React, { useContext, useEffect,  useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Order = () => {
  const {cartItems, all_products, getTotalCartAmount,token , url} = useContext(ShopContext)
  const navigate= useNavigate()
  const total= getTotalCartAmount();


  const cartProduct= Object.keys(cartItems).map((id)=>{
    const product = all_products.find((p)=>p._id===id)
    return product ? {...product, quantity: cartItems[id]}:null
  }).filter(Boolean)

  const [shopping,setShopping]= useState({name:"",address:"", city:"" , phone:""})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange= (e)=>{
    setShopping({...shopping, [e.target.name] :e.target.value})
  }
 
  const placeOrder = async (e)=> {
    e.preventDefault()
    if(isSubmitting) return;
    if(!shopping.name||!shopping.address||!shopping.city||!shopping.phone){
      alert("يرجى ملئ جميع بيانات الشحن")
      return;
    }

    let orderItems =[]
    all_products.map((item) =>{
      if(cartItems[item._id] > 0){
        let itemInfo =item;
        itemInfo["quantity"] =cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address:shopping,
      items:orderItems,
      amount: getTotalCartAmount() +2
    }

    console.log(orderData)
    setIsSubmitting(true)
    try{
      let res = await axios.post(url + "/api/order/place" , orderData , {headers:{token}})

      if(res.data.success) {
        const {session_url} = res.data;
        window.location.replace(session_url)
        return
      }
      alert (res.data.message || "error")
    }catch(error){
      console.log(error)
      alert("حدث خطأ أثناء إرسال الطلب");

    } finally {
      setIsSubmitting(false)
      
    }
  }

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token , navigate, getTotalCartAmount])



  return (
    <section className='relative w-full min-h-screen bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-24 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'></div>
      <div className='relative z-10 max-w-5xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl font-extrabold mb-12 text-center'>اتمام الطلب</h2>
        {cartProduct.length ===0 ? (
          <div className='text-center text-gray-100 mt-20 space-y-6'>
            <p className='text-xl'>السلة فارغة الآن</p>
            <button onClick={()=>navigate("/")} className='bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-8 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all'>العودة للتسوق</button>
          </div>
        ):(
          <div className='grid md:grid-cols-2 gap-10'>
            <div className='space-y-6'>
              {cartProduct.map((item)=>(
                <div key={item._id} className='flex items-center gap-4 bg-white/10 p-4 rounded-2xl shadow-lg border border-white/20 '>
                  <img src={`${url}/image/${item.image}`} className='w-20 h-20 object-contain rounded-2xl' />
                  <div>
                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                    <p className='text-sm text-gray-100'>الكمية : {item.quantity}</p>
                    <p className='text-yellow-300 font-bold'>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className='text-xl font-bold mt-6'>
                <span className='text-yellow-300 ml-2'>المجموع الكلي : ${total.toFixed(2)}</span>
              </div>

            </div>

            <div className='bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl'>
              <h3 className='text-2xl font-semibold mb-6 text-center'>بيانات الدفع</h3>
              <form onSubmit={placeOrder} className='space-y-4'>
                  <input type="text" name="name" placeholder='الاسم' value={shopping.name} onChange={handleChange} className='bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none w-full focus:ring-2 focus:ring-yellow-400'/>
                  <input type="text" name="city" placeholder='المدينة' value={shopping.city} onChange={handleChange} className='bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none w-full focus:ring-2 focus:ring-yellow-400'/>
                  <input type="text" name="phone" placeholder='الهاتف' value={shopping.phone} onChange={handleChange} className='bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none w-full focus:ring-2 focus:ring-yellow-400'/>
                  <input type="text" name="address" placeholder='العنوان' value={shopping.address} onChange={handleChange} className='bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none w-full focus:ring-2 focus:ring-yellow-400'/>

                  <button type='submit' disabled={isSubmitting} className='w-full bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed '>
                    {isSubmitting ? 'جارٍ معالجة الطلب...' : 'تأكيد الطلب'}
                  </button>
              </form>
            </div>


          </div>
        )}
      </div>
    </section>
  )
}

export default Order