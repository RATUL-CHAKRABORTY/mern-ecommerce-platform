import {loginFormControls } from '@/config';
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { toast } from 'sonner';

const initialState={
  email:'',
  password:''
}
function AuthLogin() {
  const [formData,setFormData]=useState(initialState)
  const dispatch=useDispatch();
  function onSubmit(event){
         event.preventDefault();
         dispatch(loginUser(formData)).then(data=>{
          if(data?.payload?.success){
            toast.success(data.payload.message);
          }
          else{
            toast.error(data.payload.message);
          }
         }

         )
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to you account</h1>
        <p className='mt-2'>Don't have an account</p>
        <Link to='/auth/register' className='font-medium text-primary hover:underline ml-2'>Register</Link>
      </div>
      <CommonForm formControls={loginFormControls}
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin;