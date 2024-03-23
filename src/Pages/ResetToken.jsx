import {useState} from 'react'
import { Link } from 'react-router-dom';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import { motion } from 'framer-motion';
import { IoIosArrowBack } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = 'https://ramadan-points-backend.onrender.com/api/';



export default function ResetToken(params) {

  const [btn, setBtn] = useState(false);
  const statusBtn = 'pointer-events-none select-none cursor-default';
  
  const ToastERR = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }
  const ToastAcc = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }

  const handleBackTo1 = () => {
    params.setPage(1);
  }

  // const 
  const handleToken = (e) => {
    params.setToken(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtn(true);

    if (params.token === '') {
      ToastERR('الرجاء ادخال البريد الالكتروني');
      setBtn(false);
      return;
    } 

    fetch(`${url}v1/users/resetToken`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: params.email,
        token: params.token,
      })
    }).then(response => response.json()).then(res => {
      if (res.status === 'success') {
        params.setPage(3);
        ToastAcc(res.message);
        setBtn(false);
      } else {
        ToastERR(res.message);
        setBtn(false);
      }
      return;
    }).catch(err => {
      setBtn(false);
      ToastERR(err.message);
      return;
    });
  }

  return (
    <>
        <form className='flex flex-col justify-center py-40 px-5 fold2:px-10 fold3:px-20 gap-5'
          >
            {/* div to return back */}
            <div onClick={handleBackTo1} className='cursor-pointer w-fit  self-end bg-[#CBA947] p-3 rounded-lg'>
                <IoIosArrowBack color='black' size={30}/> 
            </div>


          <div className='flex flex-col'>
            <label className='loginColor w-fit'>رمز التحقق</label>
            <input onChange={handleToken} className='loginInput' type="text" value={params.token} placeholder='ادخل الرمز المرسل في بريدك الالكتروني' />
          </div>
          <div onClick={handleSubmit} className={`text-center w-full text-2xl font-bold loginColor2 text-black rounded-[4px] cursor-pointer ${btn&&statusBtn}`}>
            <button className={`h-[56px] ${btn&&statusBtn}`}> 
            {btn && <SurahLoader/>}
            {!btn && 'تحقق'}  
            </button>
          </div>
          <div className='flex flex-col justify-center gap-3  text-justify '>
            <p>ليس لديك حساب؟ <Link to='/signup' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>إنشاء حساب</Link></p>
            <p>هل تريد تسجيل الدخول؟ <Link to='/login' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>تسجيل الدخول</Link></p>
          </div>
        </form>
        </>
  )
}
