import {useState} from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
const url = 'https://ramadan-points.onrender.com/api/';
import { AnimatePresence, motion } from 'framer-motion';
import ResetPassword from './ResetPassword';
import ResetToken from './ResetToken';

export default function ForgotPassword() {

  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');
  const [btn, setBtn] = useState(false);
  const statusBtn = 'pointer-events-none select-none cursor-default';
  const [Err, setErr] = useState('');
  const [Accept, setAccept] = useState('');
  const [token, setToken] = useState('');  

  // page1
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtn(true);

    if (email === '') {
      setAccept('');
      setErr('الرجاء ادخال البريد الالكتروني');
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
        setErr('');
        setPage(2);
        setBtn(false);
      } else {
        setAccept('');
        setErr(res.message);
        setBtn(false);
      }
      return;
    }).catch(err => {
      setBtn(false);
      setAccept('');
      setErr(err.message);
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
            <form className='flex flex-col justify-center pb-20 pt-32 px-5 fold2:px-10 fold3:px-24 gap-5'
            >
              <h1 className='loginColor w-fit text-3xl font-bold pb-5 self-center'> 
                تغيير كلمة المرور   
              </h1>
              <div className='flex flex-col'>
                <label className='loginColor w-fit'>البريد الإلكتروني</label>
                <input onChange={handleEmail} className='loginInput' type="text" value={email} placeholder='ادخل بريدك الالكتروني' />
              </div>
              <div onClick={handleSubmit} className={`cursor-pointer text-center w-full text-2xl font-bold loginColor2 text-black rounded-[4px] ${btn&&statusBtn}`}>
                <button className={`h-[56px] ${btn&&statusBtn}`}> 
                {btn && <SurahLoader/>}
                {!btn && 'ارسال'}  
                </button>
              </div>
              <div className='text-green-600 text-center'>
                {Accept}
              </div>
              <div className='text-red-600 text-center'>
                {Err}
              </div>
            </form>
            : page === 2 ? 
              <ResetToken token={token} setToken={setToken} setPage={setPage} />
            :
            <ResetPassword token={token} setPage={setPage} />
          }
      </AnimatePresence>
        </LoginLayout>
    </HelmetProvider>
  )
}
