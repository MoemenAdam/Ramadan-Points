import {useState} from 'react'
import LoginLayout from './LoginLayout';
import { useParams } from 'react-router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
const url = 'https://ramadan-points.onrender.com/api/';



export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [btn, setBtn] = useState(false);
    const [statusBtn, setStatusBtn] = useState(' ');
    const [Err, setErr] = useState('');
    const [Accept, setAccept] = useState('');
    const token = useParams().token;
    const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    setBtn(true);
    setStatusBtn('pointer-events-none select-none ');

    if (password === '' || passwordConfirm === '') {
      setErr('الرجاء ملء جميع الحقول');
      setBtn(false);
      setStatusBtn(' ');
      return;
    } 

    fetch(`${url}v1/users/resetPassword/${token}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        passwordConfirm
      })
    }).then(response => response.json()).then(res => {
      if (res.status === 'success') {
        setAccept(`تم تغيير كلمة المرور بنجاح, سيتم تحويلك الى صفحة تسجيل الدخول`)
        setTimeout(() => {
            navigate('/login');
        }, 5000);
      } else {
        setErr(res.message);
        setBtn(false);
        setStatusBtn(' ');
      }
      return;
    }).catch(err => {
      setBtn(false);
      setStatusBtn(' ');
      setErr(err.message);
      return;
    });
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Reset Password</title>
      </Helmet>
      <LoginLayout>
        <form className='flex flex-col justify-center py-40 px-5 fold2:px-10 fold3:px-20 gap-5'>
          <h1 className='loginColor w-fit text-4xl font-bold pb-5 self-center'> تسجيل الدخول </h1>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>كلمه المرور الجديده</label>
            <input onChange={handlePassword} className='loginInput' type="password" value={password} placeholder='ادخل كلمه مرورك الجديده' />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>تأكيد كلمه المرور الجديده</label>
            <input onChange={handlePasswordConfirm} className='loginInput' type="password" value={passwordConfirm} placeholder='اعد تأكيد كلمه مرورك الجديده' />
          </div>
          <div onClick={handleSubmit} className={'text-center w-full text-2xl font-bold py-3 loginColor2 text-black rounded-[4px] ' + statusBtn}>
            <button> 
            {btn && <SurahLoader/>} 
            {!btn && 'تغيير كلمه المرور'}  
            </button>
          </div>
          <div className='text-green-600 text-center'>
            {Accept}
          </div>
          <div className='text-red-600 text-center'>
            {Err}
          </div>
        </form>
      </LoginLayout>
    </HelmetProvider>
  )
}
