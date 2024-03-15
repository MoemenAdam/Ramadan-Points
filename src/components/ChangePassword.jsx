import React, {useEffect, useState} from 'react'
import LoginLayout from '../Pages/LoginLayout'
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = 'https://ramadan-points.onrender.com/api/v1/';


export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [checkData, setCheckData] = useState(false);
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();
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
  useEffect(()=>{
    if(passwordConfirm === ''){
      return;
    }

    if (passwordConfirm !== '' && password !== passwordConfirm) {
      ToastERR('كلمة المرور غير متطابقة');
      setCheckData(false);
    }else{
      setCheckData(true);
    }
  },[passwordConfirm,password])
  // token 
  // reset password verification email
  const handleSubmit = (e) => {
    e.preventDefault();
    setBtn(true);
    if (password === '' || passwordConfirm === '' || currentPassword==='') {
      ToastERR('الرجاء ملء جميع الحقول');
      setBtn(false);
      return;
    }

  
    fetch(`${url}users/changePassword`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({
        currentPassword:currentPassword,
        password:password,
        passwordConfirm:passwordConfirm
      })
    }).then(response => response.json()).then(data => {
      if (data.status === 'success') {
        ToastAcc('تم تغيير كلمه المرور بنجاح');
        setTimeout(()=>{
          navigate('/profile');
        },2000)

      } else {
        ToastERR(data.message);
        setBtn(false);
      }
      return;
    }).catch(err => {
      setBtn(false);
      ToastERR(err.message);
      return;
    });
  }
  const handlePassword = (e) => { 
    setPassword(e.target.value);
  }
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }
  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  }
  useEffect(()=>{
    if(!Cookies.get('token'))navigate('/notfound');
  },[])

  return (
    <LoginLayout>
      <form className='flex flex-col w-[220px] nav2:w-[330px] fold3:w-[440px] justify-center py-40 px-5 fold2:px-10 fold3:px-10 gap-5'
      >
        <h1 className='loginColor w-fit text-center text-2xl mobile:text-4xl font-bold pb-5 self-center'> تغيير كلمة المرور </h1>
        <div className='flex flex-col'>
          <label className='loginColor w-fit'>كلمه المرور</label>
          <input onChange={handleCurrentPassword} className='loginInput' type="password" value={currentPassword} placeholder='ادخل كلمه مرورك' />
        </div>
        <div className='flex flex-col'>
          <label className='loginColor w-fit'>كلمه المرور الجديده</label>
          <input onChange={handlePassword} className='loginInput' type="password" value={password} placeholder='ادخل كلمه مرورك الجديده' />
        </div>
        <div className='flex flex-col'>
          <label className='loginColor w-fit'>تأكيد كلمه المرور الجديده</label>
          <input onChange={handlePasswordConfirm} className='loginInput' type="password" value={passwordConfirm} placeholder='اعد تأكيد كلمه مرورك الجديده' />
        </div>
        <div onClick={handleSubmit} className={`text-center w-full text-xl font-bold loginColor2 text-black rounded-[4px] cursor-pointer ${!checkData && 'pointer-events-none cursor-default'} ${btn && statusBtn}`}>
          <button className={`h-[56px] ${!checkData && 'pointer-events-none cursor-default'} ${btn && statusBtn}`}>
            {btn && <SurahLoader />}
            {!btn && 'تغيير كلمه المرور'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </LoginLayout>
  )
}
