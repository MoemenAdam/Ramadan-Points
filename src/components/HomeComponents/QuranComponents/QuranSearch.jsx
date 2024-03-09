import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SurahLoader from "./SurahLoader"
import {Alljozoa} from '../../../store/QuranPages'
import { useFetch } from '../../../CustomHooks/useFetch'



export default function QuranSearch({type , setType,surahNumber, setSurahNumber, setSurahClicked,Jozoa,setJozoa, setJozoaClicked}) {
  const [ReaderName, setReaderName] = useState(localStorage.getItem('ReaderName') || 'مشاري العفاسي')
  const [autoPlay, setAutoPlay] = useState(false);
  const {data: surahsData, loading: surahsLoading} = useFetch('https://api.alquran.cloud/v1/surah')
  const {data: readers, loading: readersLoading} = useFetch('https://mp3quran.net/api/v3/reciters')
  const urlHolder = readers.reciters?.filter(e=>e.name===ReaderName)[0]?.moshaf?.filter(e=>e.name==='حفص عن عاصم - مرتل')[0]?.server
  let surahUrl = `${urlHolder}${String(surahNumber).padStart(3, '0')}.mp3`;

  function handleTypeChanges(type){
    setType(type)
  }
  function handleSurahChoose(number){
    localStorage.setItem('SurahNumber', number);
    setSurahNumber(number)
    setSurahClicked(prev=>prev+1);
  }
  function handleJozaaChoose(number){
    setJozoa(number);
    // localStorage.setItem('Jozoa',Jozoa);
    setJozoaClicked(prev=>prev+1)
  }
  function handleReaderChoose(e){
    setAutoPlay(true);
    localStorage.setItem('ReaderName', e.target.value);
    setReaderName(e.target.value)
  }
  return (
    <>
      <h1 className='font-bold pr-4 pt-8 pl-4 text-ayahColor ayaText'> ابحث باستخدام </h1>
      <section className='flex flex-col pt-8 pl-4 text-ayahColor'>
        <div className='flex justify-center gap-5 mt-4 mb-2 pr-4'>
          <button onClick={()=>{handleTypeChanges('surah')}}
           className={`rounded-lg py-2 w-[110px] h-[40px] ${type==='surah'?"bg-primary text-white transition-colors duration-500":""}`}> السورة </button>
          <button onClick={()=>{handleTypeChanges('jozoa')}} 
          className={`rounded-lg py-2 w-[110px] h-[40px] ${type==='jozoa'?"bg-primary text-white transition-colors duration-500":""}`}> الجزء </button>
        </div>
        <div className='surahLine pr-4'></div>


        <div className='relative h-[500px]'>
          <AnimatePresence>
            {
              type === 'surah' && 
              <motion.div
                initial={{x: '100%'}}
                animate={{x: 0}}
                exit={{x: '100%'}}
                transition={{type: 'tween'}}
              className='flex flex-col justify-center'>
                <div className='flex mb-3 font-bold justify-center'>
                  <h1 className=' pr-4'> أختر السورة </h1>
                </div>
                {surahsLoading && <SurahLoader />}
                {!surahsLoading && 
                  <div 
                    style={{direction: 'ltr' ,scrollbarWidth: 'thin'}}
                    className='rtl overflow-hidden overflow-y-auto h-[450px]'
                    >
                    {
                        surahsData.data.map(e=>{
                        return(
                          <motion.div
                          onClick={()=>{setAutoPlay(false);handleSurahChoose(e.number)}} key={e.number} 
                          className={`flex justify-between py-3 mb-4 mr-2 px-3  cursor-pointer select-none gap-5 ${surahNumber===e.number?'bg-blue-300 transition-colors duration-500':''}`}>
                            <h1 className='w-fit'> {e.name.split('سُورَةُ').join(' ')} </h1>
                            <h1 className='text-left w-fit'> {e.englishName} </h1>
                          </motion.div>
                        )
                      })
                    }
                  </div>
                }
              </motion.div>
            }
          </AnimatePresence>

          <AnimatePresence>
            {
              type === 'jozoa' &&
              <motion.div 
                initial={{x: '-100%'}}
                animate={{x: 0}}
                exit={{x: '-100%'}}
                transition={{type: 'tween'}}
              className='absolute w-full top-0 flex flex-col justify-center text-center pr-4 '>
                <div className='mb-3 font-bold'>
                  <h1 className=''> أختر الجزء </h1>
                </div>
                {surahsLoading && <SurahLoader />}
                {!surahsLoading && 
                  <div
                  style={{direction: 'ltr' ,scrollbarWidth: 'thin'}}
                  className='flex flex-col items-center rtl overflow-hidden overflow-y-auto h-[450px]'>
                    {Alljozoa.map(e=>{
                      return(
                        <motion.div
                        onClick={()=>{handleJozaaChoose(e.number)}} key={e.number} 
                        className={`flex justify-between py-3 mb-4 -mr-5 px-10  cursor-pointer select-none gap-5 ${Jozoa===e.number?'bg-blue-300 transition-colors duration-500':''}`}>
                          <h1 className='w-fit'> {e.name} </h1>
                        </motion.div>
                      )
                    })}
                  </div>
                }
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </section>
      <section className='px-4 rounded-3xl h-[160px] flex flex-col justify-center items-center' style={{boxShadow:'0px 20px 40px 10px rgba(0,0,0,0.75)'}}>
          <div>
            <h1 className='text-center font-bold mb-2'> القارئ </h1>
            <div className='flex justify-center rounded-3xl'>
              <select onClick={handleReaderChoose} className='w-[80%] outline-none select-dropdown rounded-3xl' name="Reader" id="" defaultValue={localStorage.getItem('ReaderName') || 'مشاري العفاسي'} >
                <option value="مشاري العفاسي"> مشاري العفاسي  </option>
                <option value="علي جابر"> علي جابر </option>
                <option value="ماهر المعيقلي"> ماهر المعيقلي </option>
                <option value="ياسر الدوسري"> ياسر الدوسري </option>
                <option value="محمد صديق المنشاوي"> محمد صديق المنشاوي </option>
                <option value="عبدالباسط عبدالصمد"> عبدالباسط عبدالصمد </option>
                <option value="عبدالله عواد الجهني"> عبدالله عواد الجهني </option>
                <option value="علي بن عبدالرحمن الحذيفي"> علي بن عبدالرحمن الحذيفي </option>
              </select>
            </div>
            <div className='mt-2 w-[300px] h-[54px] flex items-center'>
                {readersLoading && <SurahLoader />}
                {!readersLoading && 
                  <>
                    {autoPlay && <audio src={surahUrl}  className='outline-none' autoPlay onEnded={()=>{setAutoPlay(true) ;setSurahNumber(prev=>(prev%114+1))}} controls></audio>}

                    {!autoPlay && <audio src={surahUrl}  className='outline-none' onEnded={()=>{setAutoPlay(true) ;setSurahNumber(prev=>(prev%114+1))}} controls></audio>}
                  </>
                }
            </div>
          </div>
      </section>
    </>
  )
}
