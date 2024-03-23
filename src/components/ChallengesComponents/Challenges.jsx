import { useEffect, useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import pray from './pray.svg'
import quran from './quran.svg'
import Slaa3laElnbi from './Slaa3laElnbi.png'
import QuestionMark from './QuestionMark.png'
import PrayingNight from './PrayingNight.png'
import SubhanAllah from './SubhanAllah.png'
import { useAuth } from '../../CustomHooks/useAuth';
import Cookies from 'js-cookie';
import SurahLoader from '../HomeComponents/QuranComponents/SurahLoader';
import { useNavigate } from 'react-router-dom';
import { ChallngeCtx } from '../../store/ChallngeCtx';
import { ToastContainer, toast } from 'react-toastify';
const url = 'https://ramadan-points-backend.onrender.com/api/';

const convertSeconds = (seconds) => {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;
  return [hours, minutes, remainingSeconds];
}

const ChallengeDesign = ({ startTime,type, name, time, points, scheduleID }) => {
  const [hours, minutes, seconds] = convertSeconds(parseInt(time));
  const [MyTime, setMyTime] = useState({ hours, minutes, seconds });
  const [data, setData] = useState({});
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Prays = {
    Fajr: {
      name: 'صلاة الفجر',
      title: 'بعد إتمام صلاة الجفر اضغط على إنهاء المهمة.'
    },
    Dhuhr: {
      name: 'صلاة الظهر',
      title: 'بعد إتمام صلاة الظهر اضغط على إنهاء المهمة.'
    },
    Asr: {
      name: 'صلاة العصر',
      title: 'بعد إتمام صلاة العصر اضغط على إنهاء المهمة.'
    },
    Maghrib: {
      name: 'صلاة المغرب',
      title: 'بعد إتمام صلاة المغرب اضغط على إنهاء المهمة.'
    },
    Isha: {
      name: 'صلاة العشاء',
      title: 'بعد إتمام صلاة العشاء اضغط على إنهاء المهمة.'
    },
  };
  const Others = {
    Quran : {
      name: 'قراءة جزء جديد من القرآن الكريم',
      title: 'بعد إتمام القراءة اضغط على إنهاء المهمة.',
      imgSrc: quran
    },
    SubhanAllah : {
      name: 'قل سبحان الله و بحمده 100 مرة',
      title: 'بعد التسبيح 100 تسبيحة اضغط على إنهاء المهمة.',
      imgSrc: SubhanAllah
    },
    PrayingNight : {
      name: 'قيام الليل',
      title: 'بعد إتمام قيام الليل اضغط على إنهاء المهمة.',
      imgSrc: PrayingNight
    },
    Slaa3laElnbi : {
      name: 'صلي على النبي 100 مرة',
      title: 'بعد إتمام الصلاة على النبي اضغط على إنهاء المهمة.',
      imgSrc: Slaa3laElnbi
    },
  }
  let title;
  let imgSrc;
  if(name.split(' ')[0] === 'Part') name = 'Quran';
  if (Prays[name]) {
    imgSrc = pray;
    title = Prays[name].title;
    name = Prays[name].name;
  } else {
    imgSrc = Others[name].imgSrc;
    title = Others[name].title;
    name = Others[name].name;
  }

  function calculateTimePassed(remainingHours, remainingMinutes, remainingSeconds) {
     const totalInSeconds = remainingHours * 3600 + remainingMinutes * 60 + remainingSeconds;
     const res1 = 100 - ((totalInSeconds/startTime) * 100);
     const res2 = 100 - ((totalInSeconds/(48*60*60)) * 100);
     const res = type === 'running' ? res1 : res2;
     return res;
}

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const fetchData = async (url) => {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
        if (data.status !== 'success') {
          const message = (Cookies.get('token') ? data.message : 'يجب تسجيل الدخول أولاً') || 'حدث خطأ ما';
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

      }
      fetchData(`${url}v1/schedules/acceptSchedule/${scheduleID}`);
    } catch (e) {
      toast.error(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      console.log(e);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (MyTime.seconds > 0) {
        setMyTime(prev => ({ hours: prev.hours, minutes: prev.minutes, seconds: prev.seconds - 1 }))
      } else if (MyTime.minutes > 0) {
        setMyTime(prev => ({ hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }))
      } else if (MyTime.hours > 0) {
        setMyTime(prev => ({ hours: prev.hours - 1, minutes: 59, seconds: 59 }))
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [MyTime]);

  return (
    <AnimatePresence mode='wait'>
      {
        data.status !== 'success' &&
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ x: '100%' }}
          style={{ borderBottom: '1px solid #6D6D6E', borderTop: '1px solid #6D6D6E' }} className='p-4 flex flex-col gap-y-4'>
          <div className='flex fold:flex-row-reverse flex-col gap-2'>
            <div className='flex flex-col justify-between flex-grow'>
              <p className='font-normal'>
                <span className='text-white'>{name}{type === 'running' && ':'} </span>
                {type === 'running' && <span className='text-white opacity-40'>{title}</span>}
              </p>
              <div className='self-end'>
                <p style={{ direction: 'ltr' }} className='loginColor text-lg'>
                  {MyTime.hours < 10 && '0'}{MyTime.hours}
                  :{MyTime.minutes < 10 && '0'}{MyTime.minutes}
                  :{MyTime.seconds < 10 && '0'}{MyTime.seconds}
                </p>
              </div>
            </div>
            <div className={`self-center w-[80px]`}>
              <img className='w-full h-full pointer-events-none select-none' src={imgSrc} alt="" />
            </div>
          </div>
          <div className='bg-[#6D6D6E] w-full h-[6px] rounded-full overflow-hidden' style={{direction:'ltr'}}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${calculateTimePassed(MyTime.hours, MyTime.minutes, MyTime.seconds)}%` }}
              className={`loginColor2 h-full`}
            />
          </div>
          <div className='flex justify-center fold:justify-between fold:flex-row flex-col flex-wrap gap-y-5'>
            <div className='loginColor self-center fold:self-end font-normal'>{points} نقطة</div>
            <div className='flex flex-wrap gap-5 font-medium'>
              {type === 'running' && <button onClick={handleSubmit} className={`loginColor2 py-2 px-4 rounded-[4px] min-h-10 w-full fold:w-[120px] ${Loading ? 'cursor-default pointer-events-none' : ''}`}>
                {Loading ? <SurahLoader /> : 'إنهاء المهمة'}
              </button>}
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}

const AllChallenges = ({ type }) => {
  // v1/schedules/comming
  const { data, loading } = useAuth(`${url}v1/schedules/${type}`, (Cookies.get('token') || 'noToken'), 'GET', null);
  if (loading) return (<SurahLoader />);
  if (!data.data.schedules.length) return (<h1 className='loginColor text-center'>لا يوجد مهام</h1>);
  return (
    <>
      <motion.div layout>
        {
          data.data.schedules.map(e => {
            return (
              <ChallengeDesign key={e._id} scheduleID={e._id} type={type} name={e.name} time={e.remaining} points={e.points} startTime={e.long}/>
            )
          })
        }
      </motion.div>
    </>
  )
}

export default function Challenges({ Show, setShow }) {
  const [Challenge, setChallenge] = useState(1);
  const { ShowChallnge, setShowChallnge } = useContext(ChallngeCtx);


  useEffect(() => {
    if (ShowChallnge) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [ShowChallnge])
  return (
    <main>
      <AnimatePresence>
        {ShowChallnge &&
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.1 }}
            className='ChallengesContent'
          >
            <div className='rounded-lg z-[500] bg-black p-2'>
              <div className='cursor-pointer' onClick={() => { setShowChallnge(prev => !prev) }} >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="35" width="35" xmlns="http://www.w3.org/2000/svg">
                  <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="50.28%" stopColor="#9B7D24"></stop><stop offset="100%" stopColor="#D7B550"></stop></linearGradient></defs>
                  <path fill="url(#gradient)" d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z">
                  </path>
                </svg>
              </div>
              <h1 className='px-4 loginColor text-center TitleFont text-2xl font-semibold ChallengeActive'> قائمة المهام </h1>
              <section className='px-4 flex flex-col gap-y-10 fold:flex-row text-center text-white font-semibold mt-10 mb-10'>
                <div onClick={() => { setChallenge(1) }} className={`w-full select-none cursor-pointer ${Challenge === 1 ? 'loginColor ChallengesActive' : ''}`}>
                  المهام الحالية
                </div>
                <div className='hidden fold:block rightBorder w-fit'></div>
                <div onClick={() => { setChallenge(2) }} className={`w-full select-none cursor-pointer ${Challenge === 2 ? 'loginColor ChallengesActive' : ''}`}>
                  المهام القادمة
                </div>
              </section>
            </div>
            <section style={{ direction: 'ltr' }} className='h-[402px] overflow-hidden overflow-y-scroll'>
              <AllChallenges type={Challenge === 2 ? 'comming' : 'running'} />
            </section>
          </motion.div>
        }

      </AnimatePresence>
      <div className='fixed bottom-0 left-0 z-[500] overflow-hidden' style={{ borderRadius: '0 8px 0 0' }}>
        <button onClick={() => { setShowChallnge(prev => !prev) }} className='ChallengeBTN'>قائمة المهام</button>
      </div>
    </main>
  )
}
