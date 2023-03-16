import React from 'react'
import{useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import StudentApi from './api/StudentApi'
const Login = () => {
    const {register , handleSubmit}=useForm()
    const navigate = useNavigate()
   const onSubmit = async (data)=>{
       const res = await StudentApi.login(data)
       console.log(res);
       if(res?.data?.status === 200){
        toast.success('dang nhap thanh cong')
        localStorage.setItem('accessoken',res?.data?.data?.access_token)
        localStorage.setItem('user',JSON.stringify(res?.data?.data?.data_user))
        navigate('/teacher')
       } else{
        toast.error('dang nhap dep dc')
       }
    }
  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <input
          className='form-control'
          {...register('user_name')}
        />
        </div>
       <div>
       <input
          className='form-control'
          {...register('password')}
        />
       </div>
           <div>
            <button type='submit'>Dang nhap cmm di</button>
           </div>
        </form> 

    </div>
  )
}

export default Login