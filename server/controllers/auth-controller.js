import bcrypt from 'bcryptjs' //to hash your password
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

//register
const registerUser= async(req , res)=>{
  const {userName,email,password}=req.body;

  try{

     const checkUser= await User.findOne({email});
     if(checkUser) return res.json({
      success:false,
      message:'User Already exists with same email! Please try again.'
     })
     const hashPassword=await bcrypt.hash(password,12);
     const newUser= new User(
        {userName,email, password: hashPassword}
     )
     await newUser.save() //to save in mongodb database
     res.status(200).json({
        success:true,
        message:'Registration successfull'
     })
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      success:false,
      message:"Some error occured"
    });
    
  }
}


//login
const loginUser=async(req , res)=>{
  const {email,password}=req.body;
  try{
    //check whether the user exist or not.
    const checkUser= await User.findOne({email});
    if(!checkUser) return res.json(
     {
      success:false,
      message:"User doesn't exist please register first"
     } 
    )

    const checkPasswordMatch= await bcrypt.compare(password,checkUser.password);
    
    if(!checkPasswordMatch) return res.json({
      success:false,
      message:"Incorrect password! Please try again." ,
    })
    
    //create jwt token
    const token= jwt.sign(
      {
        id:checkUser._id,
        role:checkUser.role,
        email:checkUser.email
      }, 'ClIENT_SECRET_KEY',{expiresIn:'60m'}
    )
    
    res.cookie('token',token,{httpOnly:true,secure:false}).json({
      success:true,
      message:'Logged in  successfully',
      user:{
        email:checkUser.email,
        role:checkUser.role,
        id:checkUser._id
      }
    })
    
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      success:false,
      message:"Some error occured"
    });
    
  }
}

//logout
const logoutUser=(req,res)=>{
  res.clearCookie('token').json({
    success:true, 
    message:'Logged out successfully!',
  });
}

//auth middleware
const authMiddleware = async(req,res,next)=>{
  const token=req.cookies.token;
  if(!token) return res.status(401).json({
    success:false,
    message:'Unauthorised User!'
  })

  try{
    const decoded=jwt.verify(token,'ClIENT_SECRET_KEY');
    req.user= decoded;
    next();
  }catch(error){
    res.status(401).json({
      success:false,
      message:"Unauthorised User!"
    })
  }
}
export {registerUser,loginUser,logoutUser,authMiddleware};
