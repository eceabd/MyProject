import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { categories } from '../assets/data'
import { Plus, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const navigate= useNavigate()
  const [selectedCategory,setSelectedCategory]=useState("All")
  const {addToCart,all_products,url}=useContext(ShopContext)
  console.log(all_products)
  

  const filterProduct= selectedCategory==="All"
  ?all_products
  :all_products.filter((p)=>p.category ===selectedCategory)
  return (
    <section className='relative w-full min-h-screen bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-24 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'></div>
      <div className='relative z-10 max-w-7xl mx-auto text-center'>
        <h2 className='text-4xl sm:text-5xl font-extrabold mb-12'>تسوق حسب الفئة</h2>
        <div className='flex flex-wrap justify-center gap-6 mb-16'>
          <button onClick={()=>setSelectedCategory("All")}
            className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all shadow-lg gap-8
            ${selectedCategory === "All" 
            ?"bg-linear-to-r from-orange-400 to-yellow-400 text-white shadow-yellow-400 scale-105"
            :"bg-white/10 hover:bg-white/20 text-gray-200"}`}>
            الكل

          </button>
          {categories.map((cat)=>{
            const isActive =selectedCategory === cat.name;
            return(
            <button key={cat.name} 
            onClick={()=>setSelectedCategory(cat.name)}
            className={`relative pb-2 text-lg font-semibold transition-all duration-300 whitespace-nowrap 
              ${isActive 
                ?"text-white font-bold  scale-105"
                :"text-gray-300 hover:text-white "
              }`}>{cat.name} 
              <span className={`absolute bottom-0 left-0 h-[3px] bg-linear-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-300 ease-out
                ${isActive ? "w-full opacity-100":"w-0 opacity-0"}
                `}>
                
              </span>
              </button>
             
)})}
        </div>


        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
          {filterProduct.map((product)=>(
            <div key={product._id}
            className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl
            hover:sclae-105 hover:shadow-amber-700 transition-all duration-500' >
              <div className='relative w-full h-64 flex items-center justify-center bg-linear-to-b from-orange-800 to-transparent' onClick={()=>navigate(`/product/${product._id}`)}>
                <img src={`${url}/image/${product.image}`} alt={product.name} 
                className='object-contain w-56 h-56 rounded-2xl hover:scale-105 transition-transform duration-500' />
              </div>

              <div className='p-5 text-left' >
                <h3 className='text-lg font-semibold mb-2 truncate'>{product.name}</h3>
                <div className='flex justify-between items-center'>
                  <span className='text-xl font-bold text-amber-300'>{product.price.toFixed(2)} s.p</span>
                  <button onClick={()=>addToCart(product._id)} 
                    className='flex items-center gap-2 bg-linear-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-all'>
                      <Plus/>
                    </button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
      
    </section>
  )
}

export default Categories