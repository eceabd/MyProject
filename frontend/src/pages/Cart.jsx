import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

const Cart = () => {
  const navigate= useNavigate();
  const {cartItems, all_products, addToCart,removeFromCart, getTotalCartAmount ,url}=useContext(ShopContext)
  const total = getTotalCartAmount()

  const cartProducts =Object.keys(cartItems).map((id)=>{
    const product= all_products.find((p)=>p._id=== id)
    return{...product, _id: product?._id || id, quantity: cartItems[id]}
  }) 
  return (
<section className='relative w-full min-h-screen bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-24 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'></div>
      <div className='relative z-10 max-w-6xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl font-semibold mb-12 text-center'>سلة المشتريات الخاصة بك</h2>
        {cartProducts.length ===0 ?(
          <div className='text-center text-gray-200 mt-20 space-y-6'>
            <p className='text-xl'>السلة فارغة الآن</p>
            <button onClick={()=>navigate("/")} className='bg-linear-to-r from-orange-400 to-yellow-400 text-white px-8 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all'>اطلب الآن</button>
          </div>
        ):(<>
          <div className='space-y-6 mb-12'>
            {cartProducts.map((item)=>(
              <div key={item._id} className='flex flex-col sm:flex-row items-center justify-between bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-amber-400 transition-all'>
                <div className='flex items-center gap-6'>
                  <img src={`${url}/image/${item.image}`} className='w-24 h-24 object-contain rounded-xl' />
                  <div>
                    <h3 className='text-xl font-semibold'>{item.name}</h3>
                    <p className='text-yellow-200 text-lg font-bold mt-2'>{(item?.price ||0).toFixed(2)} s.p</p>
                  </div>
                </div>
                <div className='flex items-center gap-4 mt-6 sm:mt-10'>
                  <button onClick={()=>removeFromCart(item._id)} className='bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all'>
                    <Minus className="w-5 h-5"/>
                  </button>
                  <span className='text-lg font-semibold'>{item.quantity}</span>
                  <button onClick={()=>addToCart(item._id)} className='bg-white/20 p-2 rounded-full hover:bg-white/30 transition-all'>
                    <Plus className="w-5 h-5"/>
                  </button>
                  <button onClick={()=>removeFromCart(item._id ,true)} className='bg-red-500 p-2 rounded-full hover:bg-white/30 transition-all'>
                    <Trash2 className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-3xl shadow-xl flex flex-col  sm:flex-row justify-between gap-8 items-center '>
            <div className='text-2xl font-bold'>المجموع الكلي 
              <span className='text-yellow-400'>  {total.toFixed(2)}</span>
            </div>
            <button onClick={()=>navigate("/order")} className='flex items-center gap-3 bg-linear-to-r from-orange-500 to-yellow-500 py-4 rounded-2xl font-semibold hover:opacity-90 transition-all text-white shadow-lg p-2'>
              <ShoppingBag/>
              متابعة الشراء
            </button>
          </div>
          </>
        )}
      </div>      
    </section>
  )
}

export default Cart