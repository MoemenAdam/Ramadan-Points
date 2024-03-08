import React from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Login() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Signup</title>
      </Helmet>
      <LoginLayout>
        <form className='flex flex-col justify-center py-40 px-8 fold2:px-16 fold3:px-20 gap-5'>
          <h1 className='loginColor w-fit text-4xl text-center font-bold pb-5 self-center px-5 fold2:px-10 fold3:px-20'> إنشاء حساب </h1>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>الاسم ثلاثي</label>
            <input className='loginInput' type="text" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>رقم الهاتف (واتساب)</label>
            <input className='loginInput' type="text" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>البريد الإلكتروني</label>
            <input className='loginInput' type="email" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>كلمة المرور</label>
            <input className='loginInput' type="password" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>تأكيد كلمة السر</label>
            <input className='loginInput' type="password" />
          </div>
          <div className='text-center w-full text-2xl font-bold py-3 loginColor2 text-black rounded-[4px]'>
            <button>إنشاء حساب</button>
          </div>
          <div className='flex justify-center gap-5 items-center mt-5'>
            <p>لديك حساب؟<Link to='/login' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>تسجيل الدخول</Link></p>
          </div>
        </form>
      </LoginLayout>
    </HelmetProvider>
  )
}
