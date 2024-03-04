import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useFetch } from '../../../CustomHooks/useFetch'


const SurahLoader = () => {
  return (
    <div className='flex justify-center items-center flex-grow'>
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  )
}

export default function QuranSearch() {
  const [type , setType] = useState('surah')
  const [surahNumber, setSurahNumber] = useState(1)
  const [ReaderName, setReaderName] = useState('مشاري العفاسي')
  const {data: surahsData, loading: surahsLoading} = useFetch('https://api.alquran.cloud/v1/surah')
  const {data: readers, loading: readersLoading} = useFetch('https://mp3quran.net/api/v3/reciters')
  
  
  const urlHolder = readers.reciters?.filter(e=>e.name===ReaderName)[0]?.moshaf?.filter(e=>e.name==='حفص عن عاصم - مرتل')[0]?.server
  let surahUrl= `${urlHolder}${String(surahNumber).padStart(3, '0')}.mp3`;

  function handleTypeChanges(type){
    setType(type)
  }
  function handleSurahChoose(number){
    setSurahNumber(number)
  }
  function handleReaderChoose(e){
    setReaderName(e.target.value)
  }
  return (
    <>
      <h1 className='font-bold pr-4 pt-8 pl-4'> ابحث باستخدام </h1>
      <section className='flex flex-col pt-8 pl-4'>
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
                          onClick={()=>{handleSurahChoose(e.number)}} key={e.number} 
                          className={`flex justify-between py-3 mb-4 mr-2 pr-3 pl-3  cursor-pointer select-none gap-5 ${surahNumber===e.number?'bg-blue-300 transition-colors duration-500':''}`}>
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
                  <div>
                    الجزء هنا ...
                  </div>
                }
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </section>
      <section className='px-4 rounded-3xl h-[160px] flex flex-col justify-center items-center' style={{boxShadow:'0px 20px 40px 10px rgba(0,0,0,0.75)'}}>
        {readersLoading && <SurahLoader />}
        {!readersLoading && 
          <div>
            <h1 className='text-center font-bold mb-2'> القارئ </h1>
            <div className='flex justify-center rounded-3xl'>
              <select onClick={handleReaderChoose} className='w-[80%] outline-none select-dropdown rounded-3xl' name="Reader" id="">
                <option value="مشاري العفاسي"> مشاري العفاسي  </option>
                <option value="علي جابر"> علي جابر </option>
                <option value="بندر بليلة"> بندر بليلة </option>
                <option value="ماهر المعيقلي"> ماهر المعيقلي </option>
                <option value="ياسر الدوسري"> ياسر الدوسري </option>
                <option value="عبدالله عواد الجهني"> عبدالله عواد الجهني </option>
                <option value="علي بن عبدالرحمن الحذيفي"> علي بن عبدالرحمن الحذيفي </option>
              </select>
            </div>
            <div className='mt-2'>
              <audio className='outline-none' controls src={surahUrl}/>
            </div>
          </div>
        }
      </section>
    </>
  )
}
