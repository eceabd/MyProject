import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { ShoppingBag } from "lucide-react";

const Offer = () => {
  const { addToCart, all_products, url } = useContext(ShopContext);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);
  const product = all_products ? all_products.slice(0, 6) : [];

  useEffect(() => {
    const targetDate = new Date("2026-06-29T23:59:59");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative w-full min-h-screen bg-linear-to-r from-red-700 via-orange-500 to-yellow-400 text-white py-24 sm:px-10">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          {" "}
          My Restaurant أفضل العروض من مطعم
        </h2>
        <p className="text-gray-300 mb-12 text-lg sm:text-xl">
         {isExpired ? "للأسف لا توجد عروض متاحة حالياً" : " اغتنم التخفيضات قبل انتهاء الوقت"}
        </p>
        {!isExpired &&(
        <div className="flex justify-center items-center gap-6 mb-12 text-center">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 w-24 sm:w-28 shadow-lg"
            >
              <span className="block text-3xl sm:text-4xl font-bold text-amber-900">
                {timeLeft?.[unit] ?? 0}
              </span>
              <span className="block mt-2 text-gray-200 capitalize">
                {unit}
              </span>
            </div>
          ))}
        </div>
      )}

      {isExpired ? (
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl max-w-md mx-auto border border-white/20 shadow-2xl">
          <p className="text-gray-300 text-lg mt-2">نعتذر منك، لقد انتهت العروض.</p>
          <p className="text-gray-200 mt-2">انتظر العروض القادمة!</p>
        </div>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {product.map((product) => (
            <div
              key={product._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl
                           hover:sclae-105 hover:shadow-amber-700 transition-all duration-500"
            >
              <div className="relative w-full h-64 flex items-center justify-center bg-linear-to-b from-orange-800 to-transparent">
                <img
                  src={`${url}/image/${product.image}`}
                  alt={product.name}
                  className="object-contain w-56 h-56 rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-amber-300 line-through">
                    {product.price.toFixed(2)}s.p
                  </span>
                  <br />
                  <br />
                  <span className="text-xl font-bold text-amber-300 relative px-4">
                    {product.price.toFixed(2) - 5000}s.p
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex w-full justify-center items-center gap-2 bg-linear-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  أضف
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default Offer;
