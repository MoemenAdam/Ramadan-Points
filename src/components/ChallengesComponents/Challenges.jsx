import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import pray from './pray.svg'
import quran from './quran.svg'
import { useAuth } from '../../CustomHooks/useAuth';
import Cookies from 'js-cookie';
import SurahLoader from '../HomeComponents/QuranComponents/SurahLoader';
const url = 'https://ramadan-points.onrender.com/api/';

const convertSeconds = (seconds) => {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;
  return [hours, minutes, remainingSeconds];
}

const ChallengeDesign = ({ name,  time, points }) => {
  const [hours, minutes, seconds] = convertSeconds(parseInt(time));
  const [MyTime, setMyTime] = useState({ hours, minutes, seconds });

  const Prays = {
    Fajr:'الفجر',
    Dhuhr:'الظهر',
    Asr:'العصر',
    Maghrib:'المغرب',
    Isha:'العشاء',
  };
  let title = Prays[name] || name.split(' ')[1];
  let imgSrc = title === Prays[name] ? pray : quran;

  if(title === Prays[name]){
    title = 'بعد إتمام صلاة '+ Prays[name] +' اضغط على إنهاء المهمة.';
    name = 'صلاة '+Prays[name];
  }else{
    name = 'قراءة الجزء '+name.split(' ')[1]+' من القرآن';
    title = 'بعد إتمام قراءة الجزء اضغط على إنهاء المهمة.'
  }



  useEffect(() => {
    const interval = setInterval(() => {
      if (MyTime.seconds > 0) {
        setMyTime(prev => ({ hours:prev.hours, minutes: prev.minutes, seconds: prev.seconds - 1 }))
      } else if (MyTime.minutes > 0) {
        setMyTime(prev => ({ hours:prev.hours, minutes: prev.minutes-1, seconds: 59 }))
      }else if (MyTime.hours > 0) {
        setMyTime(prev => ({ hours:prev.hours-1, minutes: 59, seconds: 59 }))
      }
    }, 1000);
    return () => clearInterval(interval);
  },[MyTime]);

  return (
    <div style={{ borderBottom: '1px solid #6D6D6E', borderTop: '1px solid #6D6D6E' }} className='p-4 flex flex-col gap-y-4'>
      <div className='flex fold:flex-row-reverse flex-col gap-2'>
        <div className='flex flex-col justify-between flex-grow'>
          <p className='font-normal'>
            <span className='text-white'>{name}: </span>
            <span className='text-white opacity-40'>{title}</span>
          </p>
          <div className='self-end'>
            <p style={{direction:'ltr'}} className='loginColor text-lg'>{MyTime.hours}:{MyTime.minutes}:{MyTime.seconds}</p>
          </div>
        </div>
        <div className='self-center'>
          <img className='min-w-20 min-h-20 pointer-events-none select-none' src={imgSrc} alt="" />
        </div>
      </div>
      <div className='flex justify-center fold:justify-between fold:flex-row flex-col flex-wrap gap-y-5'>
        <div className='loginColor self-center fold:self-end font-normal'>{points} نقطة</div>
        <div className='flex flex-wrap gap-5 font-medium'>
          <button className='loginColor2 py-2 px-4 rounded-[4px] w-full fold:w-fit'>إنهاء المهمة</button>
        </div>
      </div>
    </div>
  )
}

const AllChallenges = ({type}) => {
  // v1/schedules/comming
  const { data, loading } = useAuth(`${url}v1/schedules/${type}`, Cookies.get('token'), 'GET', null);
  if (loading) return <SurahLoader/>;
  
  return (
    <>
      {
        data.data.schedules.map(e=>{
          return (
            <ChallengeDesign key={e._id} name={e.name} time={e.remaining} points={e.points} />
          )
        })
      }
    </>
  )
}

export default function Challenges() {
  const [Show, setShow] = useState(false)
  const [Challenge, setChallenge] = useState(1);

  useEffect(() => {
    if (Show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [Show])
  return (
    <main>
      <AnimatePresence>
        {Show &&
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.1 }}
            className='ChallengesContent'
          >
            <div className=' sticky top-0 z-[500] bg-black p-2'>
              <div className='cursor-pointer' onClick={() => { setShow(prev => !prev) }} >
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
              <AllChallenges type={Challenge===2?'comming':'running'}/>
            </section>
          </motion.div>
        }

      </AnimatePresence>
      <div className='fixed bottom-0 left-0 z-[500] overflow-hidden' style={{ borderRadius: '0 8px 0 0' }}>
        <button onClick={() => { setShow(prev => !prev) }} className='ChallengeBTN'>قائمة المهام</button>
      </div>
    </main>
  )
}
