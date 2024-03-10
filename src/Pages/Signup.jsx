import {useState} from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [btn, setBtn] = useState(false);
  const [Err, setErr] = useState('');
  const [Accpet, setAccpet] = useState('');
  const [statusBtn, setStatusBtn] = useState(' ');
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    setBtn(true);
    setStatusBtn('pointer-events-none select-none cursor-default');

    if (name === '' || email === '' || password === '' || passwordConfirm === '') {
      setErr('الرجاء ملء جميع الحقول');
      setBtn(false);
      setStatusBtn(' ');
      return;
    } 

    fetch(`https://ramadan-points.onrender.com/api/v1/users/signup`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm
      })
    }).then(response => response.json()).then(data => {
      if (data.status === 'success') {
        setAccpet('تم إنشاء الحساب بنجاح , تفقد بريدك الإلكتروني لتأكيد الحساب');
        setTimeout(()=>{
          navigate('/login');
        },5000)

      } else {
        setErr(data.message);
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
        <title>Ramadan Points - Signup</title>
      </Helmet>
      <LoginLayout>
        <form className='flex flex-col justify-center py-40 px-8 fold2:px-12 gap-5'>
          <h1 className='loginColor w-fit text-4xl text-center font-bold pb-5 self-center px-5 fold2:px-10 fold3:px-20'> إنشاء حساب </h1>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>الاسم ثلاثي</label>
            <input onChange={handleName} value={name} className='loginInput' type="text" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>البريد الإلكتروني</label>
            <input onChange={handleEmail} value={email} className='loginInput' type="email" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>كلمة المرور</label>
            <input  onChange={handlePassword} value={password} className='loginInput' type="password" />
          </div>
          <div className='flex flex-col'>
            <label className='loginColor w-fit'>تأكيد كلمة السر</label>
            <input onChange={handlePasswordConfirm} value={passwordConfirm} className='loginInput' type="password" />
          </div>
          <div onClick={handleSubmit} className={'cursor-pointer text-center w-full text-2xl font-bold  loginColor2 text-black rounded-[4px]' + statusBtn}>
            <button className={`h-[56px] ` + statusBtn}> 
            {btn && <SurahLoader/>}
            {!btn && 'انشاء حساب'}  
            </button>
            
          </div>
          <div className='text-red-600 text-center'>
            {Err}
          </div>
          <div className='text-green-600 text-center'>
            {Accpet}
          </div>
          <div className='flex justify-center gap-5 items-center mt-5'>
            <p>لديك حساب؟<Link to='/login' className='text-[#9B7D24] border-b-2 border-b-[#9B7D24] pb-1 mx-3'>تسجيل الدخول</Link></p>
          </div>
        </form>
      </LoginLayout>
    </HelmetProvider>
  )
}
