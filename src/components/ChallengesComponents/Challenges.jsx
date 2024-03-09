import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { IoClose } from "react-icons/io5";

const PrayDesign  = ({name, title, time, points})=>{
  return(
    <div className='flex flex-col gap-y-2'>
      <div className='flex justify-between items-center'>
        <h1 className='text-white font-semibold'>{name}</h1>
        <h1 className='text-white font-semibold'>{time}</h1>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-white font-semibold'>{title}</h1>
        <h1 className='text-white font-semibold'>{points}</h1>
      </div>
    </div>
  )
}

export default function Challenges() {
  const [Show, setShow] = useState(false)
  const [Challenge, setChallenge] = useState(1);
  return (
    <main>
      <AnimatePresence>
        {Show && 
          <motion.div
            initial={{y:'100%'}}
            animate={{y:0}}
            exit={{y:'100%'}}
            transition={{duration:0.1}}
            className='ChallengesContent'
          >
            <div className='cursor-pointer' onClick={()=>{setShow(prev=>!prev)}} >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="35" width="35" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="50.28%" stopColor="#9B7D24"></stop><stop offset="100%" stopColor="#D7B550"></stop></linearGradient></defs>
                <path fill="url(#gradient)" d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z">
                </path>
              </svg>
            </div>
            <h1 className='loginColor text-center TitleFont text-2xl font-semibold ChallengeActive'> قائمة المهام </h1>
            <section className='flex flex-col gap-y-10 fold:flex-row text-center text-white font-semibold mt-10'>
              <div onClick={()=>{setChallenge(1)}} className={`w-full select-none cursor-pointer ${Challenge===1?'loginColor ChallengesActive':''}`}>
              المهام الحالية
              </div>
              <div className='hidden fold:block rightBorder w-fit'></div>
              <div onClick={()=>{setChallenge(2)}}  className={`w-full select-none cursor-pointer ${Challenge===2?'loginColor ChallengesActive':''}`}>
              المهام القادمة
              </div>
            </section>
            <section>
              <PrayDesign name='الفجر' title='قراءة القرآن' time='4:30 AM' points='50 نقطة'/>
            </section>
          </motion.div>
        }
      </AnimatePresence>
      <div className='fixed bottom-0 left-0 z-[500] overflow-hidden' style={{borderRadius:'0 8px 0 0'}}>
        <button onClick={()=>{setShow(prev=>!prev)}} className='ChallengeBTN'>قائمة المهام</button>
      </div>
    </main>
  )
}
