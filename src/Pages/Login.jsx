import {useState} from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const url = 'https://ramadan-points.onrender.com/api/';



export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [save, setSave] = useState(false);
  const [btn, setBtn] = useState('تسجيل الدخول');
  const [statusBtn, setStatusBtn] = useState(' ');
  const navigate = useNavigate();


  // const 
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    setBtn('جاري التحميل...');
    setStatusBtn('pointer-events-none');

    if (email === '' || password === '') {
      alert('Please fill all the fields');
      setBtn('تسجيل الدخول');
      setStatusBtn(' ');
      return;
    } 

    fetch(`${url}v1/users/login?save=${save}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(response => response.json()).then(res => {
      if (res.status === 'success') {
        alert('Logged in successfully');
        console.log({res});
        Cookies.set('token', res.data.token);
        navigate('/');
      } else {
        alert(res.message);
      }
      setBtn('تسجيل الدخول');
      setStatusBtn(' ');
      return;
    }).catch(err => {
      setBtn('تسجيل الدخول');
      setStatusBtn(' ');
      alert(err.message);
      return;
    });





  }

  const handleCheckBox = () => {
    setSave(prev=>!prev);
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Login</title>
      </Helmet>
      <LoginLayout>
        <form className='flex flex-col justify-center py-40 px-5 fold2:px-10 fold3:px-20 gap-5'>
          <h1 className='loginColor w-fit text-4xl font-bold pb-5 self-center'> تسجيل الدخول </h1>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>البريد الإلكتروني</label>
            <input onChange={handleEmail} className='loginInput' type="text" value={email} placeholder='ادخل بريدك الالكتروني' />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>كلمة المرور</label>
            <input onChange={handlePassword} className='loginInput' type="password" value={password} placeholder='ادخل كلمه المرور' />
          </div>
          <div className='flex justify-between gap-20 mb-5'>
            <div className='flex justify-center items-center gap-3'>
              <input onChange={handleCheckBox} checked={save} className='w-4 h-4' type="checkbox" /> 
              <label className='text-[#bababa]'>احفظ بياناتي</label>
            </div>
            <Link to='#forgotpass' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1'>نسيت كلمة المرور</Link>
          </div>
          <div onClick={handleSubmit} className={'text-center w-full text-2xl font-bold py-3 loginColor2 text-black rounded-[4px] ' + statusBtn}>
            <button> {btn} </button>
          </div>
          <div className='flex justify-center items-center mt-5'>
            <p>ليس لديك حساب؟ <Link to='/signup' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>إنشاء حساب</Link></p>
          </div>
        </form>
      </LoginLayout>
    </HelmetProvider>
  )
}
