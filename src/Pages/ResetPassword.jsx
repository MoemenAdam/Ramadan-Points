import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = 'https://ramadan-points.onrender.com/api/';



export default function ResetPassword(params) {

  const { token } = params;
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [btn, setBtn] = useState(false);
  const statusBtn = 'pointer-events-none select-none cursor-default';
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

    if (password === '' || passwordConfirm === '') {
      ToastERR('الرجاء ملء جميع الحقول');
      setBtn(false);
      return;
    }

    fetch(`${url}v1/users/resetPassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: params.email,
        token,
        password,
        passwordConfirm
      })
    }).then(response => response.json()).then(res => {
      if (res.status === 'success') {
        ToastAcc('تم تغيير كلمة المرور بنجاح, سيتم تحويلك الى صفحة تسجيل الدخول');
        setTimeout(() => {
          navigate('/login');
        }, 5000);
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
    <form className='flex flex-col w-[220px] nav2:w-[330px] fold3:w-[440px] justify-center py-40 px-5 fold2:px-10 fold3:px-10 gap-5'
    >
      {/* div to return back */}
      <div onClick={handleBackTo2} className='cursor-pointer self-end p-3 bg-[#CBA947] rounded-lg'>
        <IoIosArrowBack color='black' size={30} />
      </div>
      <h1 className='loginColor w-fit text-4xl font-bold pb-5 self-center'> تغيير كلمه المرور </h1>
      <div className='flex flex-col'>
        <label className='loginColor w-fit'>كلمه المرور الجديده</label>
        <input onChange={handlePassword} className='loginInput' type="password" value={password} placeholder='ادخل كلمه مرورك الجديده' />
      </div>
      <div className='flex flex-col'>
        <label className='loginColor w-fit'>تأكيد كلمه المرور الجديده</label>
        <input onChange={handlePasswordConfirm} className='loginInput' type="password" value={passwordConfirm} placeholder='اعد تأكيد كلمه مرورك الجديده' />
      </div>
      <div onClick={handleSubmit} className={`text-center w-full text-2xl font-bold loginColor2 text-black rounded-[4px] cursor-pointer ${btn && statusBtn}`}>
        <button className={`h-[56px] ${btn && statusBtn}`}>
          {btn && <SurahLoader />}
          {!btn && 'تغيير كلمه المرور'}
        </button>
      </div>
    </form>
  )
}
