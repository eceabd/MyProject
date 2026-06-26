import { useEffect, useState } from "react"
import axios from "axios"
import { ShopContext } from "./ShopContext"



const ShopContextProvider = ({children}) => {
    const [cartItems, setCartItems]= useState(()=>{
      try{
        return JSON.parse(localStorage.getItem("cartItems")) || {}
      }catch(error){
        console.log(error)

      }
    })
    const url ="https://myproject-o6u3.onrender.com"
    const [token,setToken]=useState("")
    const [products,setProducts] = useState([])
    
    
    
    useEffect(()=>{
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    },[cartItems])
    
    

    
    const addToCart = async (id, qty = 1) => {
      setCartItems((prev) => ({
        ...prev,
      [id]: prev[id] ? prev[id] + qty : qty,
    }));
    if(token){
      
      await axios.post(`${url}/api/cart/add` ,{id:id} ,{headers:{token}})

    }
  }

  const removeFromCart= async (id, removeAll= false)=>{
  setCartItems((prev)=>{
    const updated= {...prev}
    if(removeAll ||updated[id]=== 1 ) delete updated[id]
    else updated[id]--
    return updated
  })
  if(token){
    try{
      await axios.post(`${url}/api/cart/remove` ,{id:id} ,{headers:{token}})
    }catch(error){
      console.log(error)
    }
    
  }

}


const clearData = async()=>{
  if(!token){
    console.log("error")
  }
  try{
    await axios.post(`${url}/api/cart/clear` , {} , {headers:{token}})
    setCartItems({})
  }catch(error){
    console.log(error)
  }
}

const getTotalCartAmount = ()=>{
  return Object.entries(cartItems).reduce((total,[id,qty])=>{
    const product = products.find((p)=>p._id===id)
    return total + (product ?product.price * qty : 0)
  },0)
}


const fetchProductsList = async()=>{
  try{
    const res = await axios.get(`${url}/api/product/list`)
    setProducts(res.data.data || [])
  }catch(error){
    console.log(error)
    setProducts([])
    
  }
}

const loadcartData = async ()=>{
  try{
    await axios.post(`${url}/api/cart/get` , {} , {headers:{token}})
  }catch(error){
    console.log(error)
    
  }
}

useEffect(() => {
  async function loadData() {
    await fetchProductsList()
    
    if(localStorage.getItem("token")){
    setToken(localStorage.getItem("token"))
    await loadcartData(localStorage.getItem("token"))
  }
}
  loadData()
}, [])

const value={
  all_products:products,
  cartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  token,
  setToken,
  setCartItems,
  clearCart: clearData,
  clearData,
  url
}



console.log(products)


return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>

}

export default ShopContextProvider