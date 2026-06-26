import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

const Product = () => {
  const {addToCart, all_products ,url}=useContext(ShopContext)
  const {productId}= useParams()
  const product = all_products.find((p)=>p._id === productId)
  const [quantity, setQuantity]= useState(1)

  if(!product){
    return(
      <section className='min-h-screen flex items-center justify-center bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white'>
        <p className='text-2xl font-bold'>المنتج غير موجود</p>
      </section>
    )
  }

  const handleAddToCart = ()=>{
    addToCart(product._id,quantity)
    alert(`تم إضافة ${quantity} قطعة من ${product.name} إلى السلة`)
  }

  return (
   <section className='relative w-full min-h-screen bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-24 sm:px-10'>
      <div className='max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 flex flex-col md:flex-row gap-10 shadow-2xl'>
        <div className='md:w-1/2 flex items-center justify-center bg-white/5 rounded-3xl p-6'>
          <img src={`${url}/image/${product.image}`} className='w-64 h-64 object-contain rounded-2xl'/>
        </div>
        <div className='flex flex-col gap-6'>
          <h2 className='text-white text-3xl font-bold'>{product.name}</h2>
          <p className='text-white text-xl font-bold py-9'>{product.desc}</p>
          <p className='text-yellow-300 text-xl font-bold'>{product.price} : السعر</p>
          <p className='text-yellow-300 text-xl font-bold'> {product.category} : الصنف </p>
          <div className='flex items-center gap-4'>
            <h4 className='font-semibold'> : العدد</h4>
            <button onClick={()=>setQuantity(Math.max(1,quantity - 1))} className='bg-white/20 px-3 py-1 rounded-xl hover:bg-white/30 transition-all'>-</button>
            <span>{quantity}</span>
            <button onClick={()=>setQuantity(quantity +1)} className='bg-white/20 px-3 py-1 rounded-xl hover:bg-white/30 transition-all'>+</button>
          </div>
          <button onClick={handleAddToCart} className='w-full md:w-auto bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg '>
            أضف إلى السلة

          </button>
          
        </div>
      </div>
      
    </section>
  )
}

export default Product