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
  const [statusBtn, setStatusBtn] = useState(' ');
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
    setStatusBtn('pointer-events-none select-none  cursor-default');

    if (email === '') {
      setAccept('');
      setErr('الرجاء ادخال البريد الالكتروني');
      setBtn(false);
      setStatusBtn(' ');
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
        setStatusBtn(' ');
      } else {
        setAccept('');
        setErr(res.message);
        setBtn(false);
        setStatusBtn(' ');
      }
      return;
    }).catch(err => {
      setBtn(false);
      setStatusBtn(' ');
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
            <motion.form className='flex flex-col justify-center py-40 px-5 fold2:px-10 fold3:px-20 gap-5'
            initial={{ opacity: 0, x: '50%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}
            exit={{ opacity: 0, x: '50%' }}
            >
              <h1 className='loginColor w-fit text-3xl font-bold pb-5 self-center'> هل نسيت كلمه المرور </h1>
              <div className='flex flex-col'>
                <label className='loginColor w-fit'>البريد الإلكتروني</label>
                <input onChange={handleEmail} className='loginInput' type="text" value={email} placeholder='ادخل بريدك الالكتروني' />
              </div>
              <div onClick={handleSubmit} className={'cursor-pointer text-center w-full text-2xl font-bold loginColor2 text-black rounded-[4px] ' + statusBtn}>
                <button className={`h-[56px] ` + statusBtn}> 
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
              <div className='flex flex-col justify-center gap-3  text-justify '>
                <p>ليس لديك حساب؟ <Link to='/signup' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>إنشاء حساب</Link></p>
                <p>هل تريد تسجيل الدخول؟ <Link to='/login' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>تسجيل الدخول</Link></p>
              </div>
            </motion.form>
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
