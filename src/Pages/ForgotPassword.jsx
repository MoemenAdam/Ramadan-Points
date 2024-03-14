import {useState} from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
const url = 'https://ramadan-points.onrender.com/api/';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './ResetPassword';
import ResetToken from './ResetToken';
import { AnimatePresence } from 'framer-motion';
export default function ForgotPassword() {

  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');
  const [btn, setBtn] = useState(false);
  const statusBtn = 'pointer-events-none select-none cursor-default';
  const [token, setToken] = useState('');

  // page1
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtn(true);

    if (email === '') {
      ToastERR('الرجاء ادخال البريد الالكتروني');
      setBtn(false);
      return;
    }

    fetch(`${url}v1/users/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    }).then(response => response.json()).then(res => {
      if (res.status === 'success') {
        setPage(2);
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
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Forgot Password </title>
      </Helmet>
      <LoginLayout>
        <AnimatePresence>
          {
            page === 1 ?
              <form className='flex flex-col justify-center pb-20 pt-32 px-5 fold2:px-10 fold3:px-[80px] gap-5'
              >
                <h1 className='loginColor w-fit text-2xl fold3:text-3xl font-bold pb-5 self-center'>
                  تغيير كلمة المرور
                </h1>
                <div className='flex flex-col'>
                  <label className='loginColor w-fit'>البريد الإلكتروني</label>
                  <input onChange={handleEmail} className='loginInput' type="text" value={email} placeholder='ادخل بريدك الالكتروني' />
                </div>
                
                <div className='flex flex-wrap justify-center gap-y-5 gap-x-20 mb-5' style={{visibility:'hidden',height:'1px'}}>
                  <div className='flex justify-center items-center gap-3'>
                    <input className='w-4 h-4' type="checkbox" />
                    <label className='text-[#bababa]'>احفظ بياناتي</label>
                  </div>
                  <Link to='/forgot-password' className='text-[#9B7D24] text-center border-b-2 border-b-[#9B7D24] pb-1'>نسيت كلمة المرور</Link>
                </div>

                <div onClick={handleSubmit} className={`cursor-pointer text-center w-full text-2xl font-bold loginColor2 text-black rounded-[4px] ${btn && statusBtn}`}>
                  <button className={`h-[56px] ${btn && statusBtn}`}>
                    {btn && <SurahLoader />}
                    {!btn && 'ارسال'}
                  </button>
                </div>

                <div className='flex justify-center text-center items-center mt-5' style={{visibility:'hidden',height:'1px'}}>
                  <p>ليس لديك حساب؟ <Link to='/signup' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>إنشاء حساب</Link></p>
                </div>
                
              </form>
              : page === 2 ?
                <ResetToken token={token} setToken={setToken} setPage={setPage} />
                :
                <ResetPassword token={token} setPage={setPage} />
          }
        </AnimatePresence>
      </LoginLayout>
      <ToastContainer />
    </HelmetProvider>
  )
}
