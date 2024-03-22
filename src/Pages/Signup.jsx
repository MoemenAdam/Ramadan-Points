import { useEffect, useState, useReducer } from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.value }
    case 'email':
      return { ...state, email: action.value }
    case 'password':
      return { ...state, password: action.value }
    case 'passwordConfirm':
      return { ...state, passwordConfirm: action.value }
    default:
      return state;
  }
}

export default function Login() {
  const init = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }
  const [userData, dispatch] = useReducer(reducer, init);
  const [btn, setBtn] = useState(false);
  const [checkData, setCheckData] = useState(false);
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


  useEffect(() => {
    if (userData.name.length >= 26) {
      ToastERR('الاسم لا يجب ان يتجاوز 26 حرف');
      setCheckData(false);
    } else {
      setCheckData(true);
    }
  }, [userData]);


  const handleName = (e) => {
    dispatch({ type: 'name', value: e.target.value });
  }
  const handleEmail = (e) => {
    dispatch({ type: 'email', value: e.target.value });
  }
  const handlePassword = (e) => {
    dispatch({ type: 'password', value: e.target.value });
  }
  const handlePasswordConfirm = (e) => {
    dispatch({ type: 'passwordConfirm', value: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setBtn(true);


    if (userData.name === '' || userData.email === '' || userData.password === '' || userData.passwordConfirm === '') {
      ToastERR('الرجاء ملء جميع الحقول');
      setBtn(false);
      return;
    }

    if (userData.password !== userData.passwordConfirm) {
      ToastERR('كلمة المرور غير متطابقة')
      setBtn(false);
      return;
    }

    fetch(`https://ramadan-points.onrender.com/api/v1/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        passwordConfirm: userData.passwordConfirm
      })
    }).then(response => response.json()).then(data => {
      if (data.status === 'success') {
        ToastAcc('تم إنشاء الحساب بنجاح , تفقد بريدك الإلكتروني لتأكيد الحساب');
        setTimeout(() => {
          navigate('/login');
        }, 5000)

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

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Signup</title>
      </Helmet>
      <LoginLayout>
        {/* <form className='flex flex-col justify-center py-40 px-8 fold2:px-12 gap-5'>
          <h1 className='loginColor w-fit mobile:text-4xl text-2xl text-center font-bold pb-5 self-center px-5 fold2:px-10 fold3:px-20'> إنشاء حساب </h1>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>الاسم ثلاثي</label>
            <input onChange={handleName} value={userData.name} className='loginInput' type="text" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>البريد الإلكتروني</label>
            <input onChange={handleEmail} value={userData.email} className='loginInput' type="email" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>كلمة المرور</label>
            <input onChange={handlePassword} value={userData.password} className='loginInput' type="password" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>تأكيد كلمة المرور</label>
            <input onChange={handlePasswordConfirm} value={userData.passwordConfirm} className='loginInput' type="password" />
          </div>
          <div onClick={handleSubmit} className={`cursor-pointer text-center w-full text-xl font-medium  loginColor2 text-black rounded-[4px] ${!checkData && 'pointer-events-none cursor-default'} ${btn && statusBtn}`}>
            <button className={`h-[56px] ${!checkData && 'pointer-events-none cursor-default'} ${btn && statusBtn}`}>
              {btn && <SurahLoader />}
              {!btn && 'إنشاء حساب'}
            </button>

          </div>
          <div className='flex justify-center gap-5 items-center mt-5'>
            <p>لديك حساب؟<Link to='/login' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>تسجيل الدخول</Link></p>
          </div>
        </form> */}


        <form className='flex flex-col justify-center py-40 px-8 fold2:px-12 gap-5'>
          <h1 className='loginColor w-fit mobile:text-4xl text-2xl text-center font-bold pb-5 self-center px-5 fold2:px-10 fold3:px-20'> إنشاء حساب </h1>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>الاسم ثلاثي</label>
            <input onChange={handleName} value={userData.name} className='loginInput' type="text" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>البريد الإلكتروني</label>
            <input onChange={handleEmail} value={userData.email} className='loginInput' type="email" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>كلمة المرور</label>
            <input onChange={handlePassword} value={userData.password} className='loginInput' type="password" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>تأكيد كلمة المرور</label>
            <input onChange={handlePasswordConfirm} value={userData.passwordConfirm} className='loginInput' type="password" />
          </div>

          <div onClick={handleSubmit} className={`cursor-pointer text-center w-full text-xl font-medium  loginColor2 text-black rounded-[4px] ${!checkData && 'pointer-events-none cursor-default'} ${btn && statusBtn}`}>
            <button className={`h-[56px] ${!checkData && 'pointer-events-none cursor-default'} ${btn && statusBtn}`}>
              {btn && <SurahLoader />}
              {!btn && 'إنشاء حساب'}
            </button>

          </div>
          <div className='flex justify-center gap-5 items-center mt-5'>
            <p>لديك حساب؟<Link to='/login' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>تسجيل الدخول</Link></p>
          </div>

          <div className='flex flex-wrap justify-center gap-x-20' style={{ visibility: 'hidden' }}>
            <div className='flex justify-center items-center gap-3'>
              <input className='w-4 h-4' type="checkbox" />
              <label className='text-[#bababa]'>احفظ بياناتي</label>
            </div>
            <Link to='/forgot-password' className='text-[#9B7D24] text-center border-b-2 border-b-[#9B7D24] pb-1'>نسيت كلمة المرور</Link>
          </div>
          
        </form>
      </LoginLayout>
    </HelmetProvider>
  )
}
