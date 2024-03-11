import { useEffect, useState, memo } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Lantern from '/assets/Lantern.svg'
import { motion, AnimatePresence } from 'framer-motion'
import { RandomDuas,SabahDuas,MassaDuas,EftarDuas,QuranEndDuas } from '../../store/Duas';

const ArrowR = () => {
  return (
    <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="50.28%" stopColor="#9B7D24" />
          <stop offset="100%" stopColor="#D7B550" />
        </linearGradient>
      </defs>
      <path fill="url(#gradient)" d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
    </svg>
  )
}
const ArrowL = () => {
  return (
    <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="50.28%" stopColor="#9B7D24" />
          <stop offset="100%" stopColor="#D7B550" />
        </linearGradient>
      </defs>
      <path fill="url(#gradient)" d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
    </svg>
  )
}
const DuasPrint = ({arr,Turn,direction})=>{
  return(
    <>
      {
        arr.map(e => {
          if (e.id != Turn) return;
          return (
            <motion.div
              initial={{ opacity: 0, x: direction * 250 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -250 }}
              transition={{ duration: 0.2, type:'just' }}

              className='text-center flex flex-col justify-center items-center text-white w-[250px] h-[250px]  relative top-[370px] font-bold leading-8' key={e.id}
            >
              {e.times && <p className='text-green-700 text-xl absolute -top-16'>
              تكرار : {e.times}
              </p>}
              {e.content}
            
            </motion.div>
          )
        })
      }
    </>
  )
}


export default memo(function Duas() {
  const [active, setActive] = useState(1);
  const [direction, setDirection] = useState(1);
  const [can, setCan] = useState([false, true]);
  const [Turn, setTurn] = useState(1);

  const handleActiveChange = (num) => {
    setTurn(1);
    setCan([false, true]);
    setActive(num);
  }
  const TurnHandler = (arr, num) => {
    if (Turn + num <= 1) {
      setCan([false, true]);
    } else if (Turn + num >= arr.length) {
      setCan([true, false]);
    } else {
      setCan([true, true]);
    }
    setTurn(Turn + num);
  }
  const handleNextDua = (num) => {
    switch (active) {
      case 1:
        TurnHandler(RandomDuas, num);
        break;
      case 2:
        TurnHandler(SabahDuas, num);
        break;
      case 3:
        TurnHandler(MassaDuas, num);
        break;
      case 4:
        TurnHandler(EftarDuas, num);
        break;
      case 5:
        TurnHandler(QuranEndDuas, num);
        break;
    }
    setDirection(num);
  }

  return (
    <main className='mainPage h-fit min-h-screen relative flex flex-col overflow-hidden pb-20'>
      <section>
        <div className='duasTop flex flex-col justify-center items-center text-center gap-5 py-20 pb-40'>
          <h1 className='loginColor text-4xl mainMargin'>أدعية</h1>
          <h2 className='text-[#EAEAEA] mainMargin'>الدعاء .. عبادة عظيمة تتحقق بها الامنيات و تحلو بها الحياة</h2>
          <section className='mainMargin flex nav:hidden'>
            <nav className='flex mt-10 mb-10 text-[#FFFFFF]'>
              <ul className='flex flex-wrap justify-center flex-row-reverse gap-10 w-fit'>
                <li onClick={() => { handleActiveChange(1) }} className={`cursor-pointer ${active === 1 ? 'active loginColor' : ''}`}>أدعية عشوائية</li>
                <li onClick={() => { handleActiveChange(2) }} className={`cursor-pointer ${active === 2 ? 'active loginColor' : ''}`}>ادعية الصباح</li>
                <li onClick={() => { handleActiveChange(3) }} className={`cursor-pointer ${active === 3 ? 'active loginColor' : ''}`}>أدعية المساء</li>
                <li onClick={() => { handleActiveChange(4) }} className={`cursor-pointer ${active === 4 ? 'active loginColor' : ''}`}>أدعية قبل الإفطار</li>
                <li onClick={() => { handleActiveChange(5) }} className={`cursor-pointer ${active === 5 ? 'duasActive' : ''}`}>دعاء ختم القرآن الكريم</li>
              </ul>
            </nav>
          </section>
        </div>
      </section>
      <div className='z-[300] duasLeft hidden nav:block h-[calc(100%-40px)] absolute left-0 top-[40px] w-[400px]'>
        <nav className='mt-[350px] flex justify-end ml-20 text-[#FFFFFF]'>
          <ul className='w-[155px] flex flex-col gap-14'>
            <li onClick={() => { handleActiveChange(1) }} className={`cursor-pointer ${active === 1 ? 'duasActive' : ''}`}>أدعية عشوائية</li>
            <li onClick={() => { handleActiveChange(2) }} className={`cursor-pointer ${active === 2 ? 'duasActive' : ''}`}>اذكار الصباح</li>
            <li onClick={() => { handleActiveChange(3) }} className={`cursor-pointer ${active === 3 ? 'duasActive' : ''}`}>اذكار المساء</li>
            <li onClick={() => { handleActiveChange(4) }} className={`cursor-pointer ${active === 4 ? 'duasActive' : ''}`}>دعاء قبل الإفطار</li>
            <li onClick={() => { handleActiveChange(5) }} className={`cursor-pointer ${active === 5 ? 'duasActive' : ''}`}>دعاء ختم القرآن الكريم</li>
          </ul>
        </nav>
      </div>
      <section className='mainMargin pb-[500px] relative flex self-center w-full justify-center items-center -mt-48 nav:-mt-44'>
        <div>
          <img className='pointer-events-none select-none
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          min-w-[400px] min-h-[700px]' src={Lantern} alt="" />
        </div>
        <div className='z-10 flex flex-col items-center mainMargin'>
          <div>
            <AnimatePresence mode='wait'> 
              {active === 1 && <DuasPrint arr={RandomDuas} Turn={Turn} direction={direction} />}
              {active === 2 && <DuasPrint arr={SabahDuas} Turn={Turn} direction={direction} />}
              {active === 3 && <DuasPrint arr={MassaDuas} Turn={Turn} direction={direction} />}
              {active === 4 && <DuasPrint arr={EftarDuas} Turn={Turn} direction={direction} />}
              {active === 5 && <DuasPrint arr={QuranEndDuas} Turn={Turn} direction={direction} />}
            </AnimatePresence>
          </div>
          <div className=' flex justify-center text-center gap-10 text-white w-[250px] relative top-[420px]'>
            <div className={`order-1 cursor-pointer pointe ${!can[0] ? 'brightness-50 pointer-events-none' : ''}`} onClick={() => { handleNextDua(-1) }}>
              <ArrowL />
            </div>
            <div className={`cursor-pointer pointe ${!can[1] ? 'brightness-50 pointer-events-none' : ''}`} onClick={() => { handleNextDua(1) }}>
              <ArrowR />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
})