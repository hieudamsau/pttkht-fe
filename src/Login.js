import React from 'react'
import{useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StudentApi from './api/StudentApi'
import "./login.css"
const Login = () => {
    const {register , handleSubmit}=useForm()
    const navigate = useNavigate()
   const onSubmit = async (data)=>{
       const res = await StudentApi.login(data)
       console.log(res);
       if(res?.data?.status === 200){
        toast.success('dang nhap thanh cong')
        localStorage.setItem('access_token',res?.data?.data?.access_token)
        localStorage.setItem('user',JSON.stringify(res?.data?.data?.data_user))
        if(res?.data?.data?.data_user?.role === 1){
          navigate('/teacher')
        }
        else if(res?.data?.data?.data_user?.role === 2){
          navigate('/students')
        }
        else{
          navigate('/marks')
        }
        
       } else{
        toast.error('Dang nhap that')
       }
    }
  return (
    <div className={"container"} style={{display:'flex',justifyContent:'center'}}>
       <form onSubmit={handleSubmit(onSubmit)} 
        style={{
          margin:"0 auto",
          top:'45%',
          width:'20%',
          position:'absolute'
        }}
       >
        <div style={{textAlign:"center",marginBottom:'10px'}}><span>LOGIN</span></div>
        <div>
          <input
            className='form-control input'
            {...register('user_name')}
          />
        </div>
       <div>
       <input
          className='form-control input'
          {...register('password')}
        />
       </div>
           <div>
            <button type='submit'>Dang nhap</button>
           </div>
        </form> 

    </div>
  )
}

export default Login