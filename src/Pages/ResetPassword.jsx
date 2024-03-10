import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import { motion } from 'framer-motion';
import { IoIosArrowBack } from "react-icons/io";
const url = 'https://ramadan-points.onrender.com/api/';



export default function ResetPassword(params) {

    const {token} = params;
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [btn, setBtn] = useState(false);
    const [statusBtn, setStatusBtn] = useState(' ');
    const [Err, setErr] = useState('');
    const [Accept, setAccept] = useState('');
    const navigate = useNavigate();

  const handleBackTo2 = () => {
    params.setPage(2);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    setBtn(true);
    setStatusBtn('pointer-events-none select-none cursor-default');

    if (password === '' || passwordConfirm === '') {
      setAccept('');
      setErr('الرجاء ملء جميع الحقول');
      setBtn(false);
      setStatusBtn(' ');
      return;
    } 

    fetch(`${url}v1/users/resetPassword`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        password,
        passwordConfirm
      })
    }).then(response => response.json()).then(res => {
      if (res.status === 'success') {
        setErr('');
        setAccept(`تم تغيير كلمة المرور بنجاح, سيتم تحويلك الى صفحة تسجيل الدخول`)
        setTimeout(() => {
            navigate('/login');
        }, 5000);
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
          <motion.form className='flex flex-col justify-center py-40 px-5 fold2:px-10 fold3:px-20 gap-5'
            initial={{ opacity: 0, x: '50%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .5 }}
            exit={{ opacity: 0, x: '-50%' }}
          >

            {/* div to return back */}
            <div onClick={handleBackTo2} className='cursor-pointer w-fit  self-end bg-[#CBA947] p-3 rounded-lg'>
                <IoIosArrowBack color='black' size={30}/> 
            </div>
            <h1 className='loginColor w-fit text-4xl font-bold pb-5 self-center'> تسجيل الدخول </h1>
            <div className='flex flex-col'>
              <label className='loginColor w-fit'>كلمه المرور الجديده</label>
              <input onChange={handlePassword} className='loginInput' type="password" value={password} placeholder='ادخل كلمه مرورك الجديده' />
            </div>
            <div className='flex flex-col'>
              <label className='loginColor w-fit'>تأكيد كلمه المرور الجديده</label>
              <input onChange={handlePasswordConfirm} className='loginInput' type="password" value={passwordConfirm} placeholder='اعد تأكيد كلمه مرورك الجديده' />
            </div>
            <div onClick={handleSubmit} className={'text-center w-full text-2xl font-bold loginColor2 text-black rounded-[4px] cursor-pointer ' + statusBtn}>
            <button className={`h-[56px] ` + statusBtn}> 
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
          </motion.form>
  )
}
