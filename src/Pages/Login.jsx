import React from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';


export default function Login() {
  return (
    <LoginLayout>
      <form className='flex flex-col justify-center py-40 px-5 fold2:px-10 fold3:px-20 gap-5'>
        <h1 className='loginColor w-fit text-4xl font-bold pb-5 self-center'> تسجيل الدخول </h1>
        <div className='flex flex-col'>
          <label className='loginColor w-fit'>البريد الإلكتروني</label>
          <input className='loginInput' type="text" />
        </div>
        <div className='flex flex-col'>
          <label className='loginColor w-fit'>كلمة المرور</label>
          <input className='loginInput' type="password" />
        </div>
        <div className='flex justify-between gap-20 mb-5'>
          <div className='flex justify-center items-center gap-3'>
            <input className='w-4 h-4' type="checkbox" />
            <label className='text-[#bababa]'>احفظ بياناتي</label>
          </div>
          <Link to='#forgotpass' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1'>نسيت كلمة المرور</Link>
        </div>
        <div className='text-center w-full text-2xl font-bold py-3 loginColor2 text-black rounded-[4px]'>
          <button>تسجيل الدخول</button>
        </div>
        <div className='flex justify-center items-center mt-5'>
          <p>ليس لديك حساب؟ <Link to='/signup' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>إنشاء حساب</Link></p>
        </div>
      </form>
    </LoginLayout>
  )
}
