import { Mail, MapPin, Phone } from 'lucide-react'
import React, { useState } from 'react'
import{FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp} from 'react-icons/fa';

const FacebookIcon = () => <FaFacebook size={30} color="#3b5998" />;
const InstagramIcon = () => <FaInstagram size={30} color="#E1306C" />;
const LinkedInIcon = () => <FaLinkedin size={30} color="#0077B5" />;
const WhatsappIcon = () => <FaWhatsapp size={30} color="#25D366" />;


const Footer = () => {
  const [formData,setFormData]=useState({name:"", email:"", message:""})

  const handleChange= (e)=>{
    setFormData((prev)=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    alert(`شكراً لتواصلك معنا ${formData.name}!`)
    setFormData({name:"",email:"",message:""})
  }
  return (
    <section className='relative w-full min-h-screen bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-24 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'></div>
      <div className='relative z-10 max-w-7xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl font-extrabold mb-6 text-center'>تواصل معنا</h2>
        <p className='text-gray-300 mb-12 text-center text-lg sm:text-xl'>نحن هنا لمساعدتك في أي وقت ,أرسل لنا رسالة وسنعود إليك قريباً</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='space-y-8'>

            <div className='flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-yellow-700/10 transition-all'>
              <MapPin className='w-8 h-8 text-red-400'/>
              <div>
                <h4 className='font-semibold text-lg'>العنوان</h4>
                <p className='text-gray-300'>شارع الحمراء أول دخلة يمين</p>
              </div>
            </div>

            <div className='flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-yellow-700/10 transition-all'>
              <Phone className='w-8 h-8 text-green-600'/>
              <div>
                <h4 className='font-semibold text-lg'>الهاتف</h4>
                <p className='text-gray-300'>+963-997271754</p>
              </div>
            </div>


            <div className='flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-lg hover:shadow-yellow-700/10 transition-all'>
              <Mail className='w-8 h-8 text-yellow-500'/>
              <div>
                <h4 className='font-semibold text-lg'>البريد الإلكتروني</h4>
                <p className='text-gray-300'>abdoo@gmail.com</p>
              </div>
            </div>


          </div>
        </div>


        
        <footer className='mt-24 relative z-10 max-w-7xl mx-auto text-center text-gray-300'>
          <p className='mb-4'>
             <span className="text-lg">© </span>
             <span>جميع الحقوق محفوظة {new Date().getFullYear()}</span>
          </p>
          <div className='flex flex-col justify-center gap-6'>
            <p className='text-base text-gray-300'>Designed By Eng.Abdulrahman Aldully</p>
            <div className='flex items-center justify-center gap-6 mt-2'>
          <a href="https://www.facebook.com/abdulrahman.aldully" target="_blank" rel="noopener ">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/wadee3_almahmoud?igsh=b2tzcDR1eG52dms4" target="_blank" rel="noopener ">
            <InstagramIcon />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener">
            <LinkedInIcon />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener">
            <WhatsappIcon />
          </a>
            </div>
          </div>
        </footer>
        
      </div>
      
    </section>
  )
}

export default Footer