import userModel from "../models/userModel.js"


export const addToCart = async (req,res)=>{
    try{
        const userId = req.userId;
        const {id: itemId} = req.body;
        console.log("user id inside cntroller", userId)
        let userData = await userModel.findById(userId)

        if(!userData){
            return res.status(404).json({success :false , message :"User Not Found"})
        }

        let cartData = userData.cartData || {}

        if(!cartData[itemId]){
            cartData[itemId] = 1
        }
        else{       
            cartData[itemId] += 1
        }

        await userModel.findByIdAndUpdate(userId , {cartData})
        res.json({success:true , message:"Added To Cart"})
    }catch(error){
        console.log(error)
        res.json({success:false , message:error.message})

    }
} 


export const removeFromCart = async (req,res)=>{
    try{
        const userId = req.userId;
        const {id:itemId} = req.body;
        let userData = await userModel.findById(userId)
        if(!userData){
            return res.status(404).json({success:false  , message: "User Not Found"})
        }

       

        if(itemId){
            if(userData.cartData?.[itemId]){
                userData.cartData[itemId] -=1
            }
            if(userData.cartData[itemId] <= 0){
                delete userData.cartData[itemId]
            }
        }else{
            userData.cartData = {}
        }
        await userData.save();

        res.status(200).json({success:true , message: itemId ? "item removed from cart" : "cart cleared successfuly" })
    }catch(error){
        console.log(error)
        res.json({success:false , message:error.message})

    }
}


export const getCart = async (req ,res) => {
    try{
        const userId = req.userId;
        let userData = await userModel.findById(userId)
        if(!userData){
            return res.status(404).json({success:false , message : "user not found"})
        }
        res.json({success:true , cartData : userData.cartData || {}})
    }catch(error){
        console.log(error);
        res.json({success:false , message :error.message})

    }
}

export const clearCart = async (req , res) => {
    try{
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({success:false , message:"user not found"}) 
        }

        user.cartData = {}
        await user.save();
        res.json({success:true ,message:"cart cleared successfuly",cartData:user.cartData})
    }catch(error){
        console.log(error);
        res.json({success:false , message: error.message})
    }
}