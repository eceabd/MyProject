import React from 'react'
import { Pizza, Bike, Star } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-linear-to-b from-black to-orange-500 text-white flex flex-col items-center overflow-hidden font-sans">
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'></div>
      <div className="relative w-full h-[45vh] sm:h-[50vh] md:h-[55vh] overflow-hidden rounded-b-[50px] sm:rounded-b-[80px] md:rounded-b-[120px] shadow-2xl">
        <img 
          src="HeroImage.webp" 
           
          className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-1000"
        />
        
        <div className="absolute inset-0 bg-linear-to-t "></div>

        <div className="absolute top-12 left-6 bg-stone-950 text-amber-400 border border-amber-400/20 px-5 py-2 rounded-full font-black text-sm shadow-xl tracking-wide animate-pulse">
          خصم حتى %20 🔥
        </div>
      </div>

      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-80 h-80 bg-linear-to-t from-black to-red-500 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex-1 max-w-4xl mx-auto px-6 py-8 md:py-12 flex flex-col items-center text-center space-y-6 w-full">
        
        <div className="inline-flex items-center gap-1.5 bg-stone-950/40 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-yellow-300 text-xs font-bold shadow-sm">
          <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
          <span>الخيار الأول في المنطقة</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-md">
          عروضنا{' '}
          <span className="text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            بلا حدود
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-amber-50/90 max-w-2xl leading-relaxed font-medium drop-shadow-sm">
          اطلب الآن واستمتع بأفضل الوجبات الساخنة المحضّرة من أجود المكونات الطازجة، لتوصلك لعند باب بيتك بأسرع وقت وبأعلى جودة.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2">
          
          <button 
            onClick={() => window.location.href = "/categories"}  
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white hover:bg-amber-50 text-red-600 font-black px-10 py-4 rounded-2xl text-lg shadow-2xl shadow-black/20 transition-all duration-300 transform hover:scale-[1.03]"
          > 
            <Bike className="w-5 h-5 text-red-600" />
            <span>اطلب الآن</span>
          </button>
          
          <button 
            onClick={() => window.location.href = "/"} 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/40 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-300"
          >
            <Pizza className="w-5 h-5 text-yellow-300" />
            <span>تصفح الأصناف</span>
          </button>

        </div>
      </div>


    </section>
  )
}

export default Hero