import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser=asyncHandler(async(req,res)=>{
    console.log("register")

    res.send("successfull")
})



export {
    registerUser
}