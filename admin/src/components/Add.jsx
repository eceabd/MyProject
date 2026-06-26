import React, { useState } from 'react'
import axios from "axios"
const Add = () => {
    const [image,SetImage] = useState()
    const [data,setData] = useState({name:"", description:"", price:"", category:""})
    const url = "http://localhost:7777"
    const OnChangeHandler = (event) => {
        const {name , value} = event.target
        setData((prev)=>({...prev , [name]:value}))
    }

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]){
            SetImage(event.target.files[0])
        }
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name" , data.name)
        formData.append("description" , data.description)
        formData.append("category" , data.category)
        formData.append("price" , Number(data.price))

        if(image) {
            formData.append("image" , image)
        }

        try{
            const res = await axios.post(`${url}/api/product/add` ,formData)

            if(res.data.success){
                setData({name:"",description:"", price:"", category:""})
                SetImage(null)
                alert("تم إضافة المنتج بنجاح")
            }else{
                alert(res.data.message)
            }

        }catch(error){
            console.log(error)
            alert("حدث خطأ إضافة المنتج")

        }

    } 
  return (
    <section className='relative w-full min-h-screen flex items-center justify-center
    bg-linear-to-r from-red-500 via-orange-500 to-yellow-500
     text-white py-24 sm:px-10'>
        <form onSubmit={onSubmitHandler}>
            <div className='relative z-10 max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-xl'>
                <h2 className='text-3xl font-bold mb-6 text-center'>اضافة منتج جديد</h2>
                <div className='space-y-4'>
                    <input type="text" name="name" placeholder='اسم المنتج'  value={data.name} onChange={OnChangeHandler} className="w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"/>
                    <input type="text" name="description" placeholder='وصف المنتج'  value={data.description} onChange={OnChangeHandler} className="w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"/>
                    <input type="number" name="price" placeholder='سعر المنتج'  value={data.price} onChange={OnChangeHandler} className="w-full px-4 py-3 rounded-xl bg-white/15 text-white placeholder-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none"/>
                    <select name="category" value={data.category} onChange={OnChangeHandler} className="w-full px-4 py-3 rounded-xl bg-white/15 text-black placeholder-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none">
                    <option className='bg-orange-300'>سندويش غربي</option>
                    <option className='bg-orange-300'>وجبات غربي</option>
                    <option className='bg-orange-300'>دجاج</option>
                    <option className='bg-orange-300'>شاورما</option>
                    <option className='bg-orange-300'>بيتزا</option>
                    <option className='bg-orange-300'>مقبلات</option>
                    <option className='bg-orange-300'>مشروبات</option>
                    </select>

                    <input type="file" accept='image/*' onChange={onImageChange} className='w-full text-white'/>  اضافة صورة
                    {image && (
                        <img src={URL.createObjectURL(image)} className='w-full h-64 object-cover rounded-2xl mt-2' />
                    )}

                    <button type='submit' className='w-full bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all shadow-lg mt-4 hover:scale-105'>إضافة منتج</button>
                  
                </div>
            </div>
        </form>
    </section>

  )
}

export default Add