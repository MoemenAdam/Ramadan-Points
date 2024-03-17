import { useEffect, useState, useContext } from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { NavBarctx } from '../store/NavBarCtx';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = 'https://ramadan-points.onrender.com/api/';



export default function Login() {
  const { setNavBar } = useContext(NavBarctx);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [save, setSave] = useState(false);
  const [btn, setBtn] = useState(false);
  const statusBtn = 'pointer-events-none select-none cursor-default';
  const navigate = useNavigate();

  useEffect(() => {
    setNavBar(false);
  }, [])

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
    

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtn(true);
    
    if (email === '' || password === '') {
      ToastERR('الرجاء ملء جميع الحقول')
      setBtn(false);
      return;
    }

    try {
      const response = await fetch(`${url}v1/users/login?save=${save}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      const res = await response.json();
      if (res.status === 'success') {
        Cookies.set('token', res.data.token,{
          expires: save?40:1,
          secure: true
        });
        navigate('/');
      } else {
        ToastERR(res.message)
      }

      setBtn(false);
    } catch (err) {
      setBtn(false);
      ToastERR(err.message)
      toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      console.error(err);
    }
  }
  const handleCheckBox = () => {
    setSave(prev => !prev);
  }
return (
  <HelmetProvider>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Ramadan Points - Login</title>
    </Helmet>
    <LoginLayout>
      <form className='flex flex-col justify-center py-40 px-5 fold2:px-10 fold3:px-20 gap-5'>
        <h1 className='loginColor w-fit mobile:text-4xl font-bold pb-5 self-center text-center text-2xl'> تسجيل الدخول </h1>
        <div className='flex flex-col'>
          <label className='loginColor w-fit'>البريد الإلكتروني</label>
          <input onChange={handleEmail} className='loginInput' type="text" value={email} placeholder='ادخل بريدك الالكتروني' />
        </div>
        <div className='flex flex-col'>
          <label className='loginColor w-fit'>كلمة المرور</label>
          <input onChange={handlePassword} className='loginInput' type="password" value={password} placeholder='ادخل كلمه المرور' />
        </div>
        <div className='flex flex-wrap justify-center gap-y-5 gap-x-20 mb-5'>
          <div className='flex justify-center items-center gap-3'>
            <input onChange={handleCheckBox} checked={save} className='w-4 h-4' type="checkbox" />
            <label className='text-[#bababa]'>احفظ بياناتي</label>
          </div>
          <Link to='/forgot-password' className='text-[#9B7D24] text-center border-b-2 border-b-[#9B7D24] pb-1'>نسيت كلمة المرور</Link>
        </div>
        <div onClick={handleSubmit} className={`cursor-pointer text-center w-full text-xl font-medium loginColor2 text-black rounded-[4px] ${btn && statusBtn}`}>
          <button className={`h-[56px] ${btn && statusBtn}`}>
            {btn && <SurahLoader />}
            {!btn && 'تسجيل الدخول'}
          </button>
        </div>
        <div className='flex justify-center text-center items-center mt-5'>
          <p>ليس لديك حساب؟ <Link to='/signup' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>إنشاء حساب</Link></p>
        </div>
      </form>
    </LoginLayout>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </HelmetProvider>
)
}
