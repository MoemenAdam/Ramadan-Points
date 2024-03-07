/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState,memo } from "react";
import { useFetch } from "../../../CustomHooks/useFetch"
import SurahLoader from "./SurahLoader"
import { LayoutGroup, motion } from 'framer-motion'
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import {PagePerSurah} from '../../../store/QuranPages'

const init = {
  number: 1,
  name: "سُورَةُ ٱلْفَاتِحَةِ",
  englishName: "Al-Faatiha",
  englishNameTranslation: "The Opening",
  revelationType: "Meccan",
  numberOfAyahs: 7,
  ayahs: [
    {
      number: 1,
      text: "﻿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      numberInSurah: 1,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      hizbQuarter: 1,
      sajda: false
    },
    {
      number: 2,
      text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      numberInSurah: 2,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      hizbQuarter: 1,
      sajda: false
    },
    {
      number: 3,
      text: "الرَّحْمَٰنِ الرَّحِيمِ",
      numberInSurah: 3,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      hizbQuarter: 1,
      sajda: false
    },
    {
      number: 4,
      text: "مَالِكِ يَوْمِ الدِّينِ",
      numberInSurah: 4,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      hizbQuarter: 1,
      sajda: false
    },
    {
      number: 5,
      text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      numberInSurah: 5,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      hizbQuarter: 1,
      sajda: false
    },
    {
      number: 6,
      text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      numberInSurah: 6,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      hizbQuarter: 1,
      sajda: false
    },
    {
      number: 7,
      text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      numberInSurah: 7,
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      hizbQuarter: 1,
      sajda: false
    }
  ],
  edition: {
    identifier: "quran-simple",
    language: "ar",
    name: "القرآن الكريم المبسط (تشكيل بسيط)",
    englishName: "Simple",
    format: "text",
    type: "quran",
    direction: "rtl"
  }
}
function convertToArabicNumbers(englishNumber) {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let arabicNumber = '';
  const englishNumberString = englishNumber.toString();

  for (let i = 0; i < englishNumberString.length; i++) {
    const digit = parseInt(englishNumberString[i]);
    arabicNumber += arabicNumbers[digit];
  }

  return arabicNumber;
}
function Pagenation({ page, setPageNumber,surahNumber,setSurahNumber,surahName,surahsPerPage }) {
  const handlePageChange = (num) => {
    if(page + num<=0 || page + num>604)return;
    setPageNumber(prev => prev + num);
    const holder = Object.values(surahsPerPage?.data?.surahs);
    if(parseInt( holder[1]?holder[1]?.number:holder[0].number ) !== surahNumber){
      localStorage.setItem('SurahNumber', holder[1]?holder[1]?.number:holder[0].number);
      setSurahNumber(parseInt( holder[1]?holder[1]?.number:holder[0].number ))
    }
  }
  return (
    <div className="flex items-center justify-center flex-grow">
      {page <= 1 && <div><FaCaretRight color="gray" size={25} /></div>}
      {page > 1 && <div onClick={() => handlePageChange(-1)} className="cursor-pointer"><FaCaretRight size={25} /></div>}

      <div className="px-4 select-none">{page}</div>

      {page >= 604 && <div><FaCaretLeft color="gray" size={25} /></div>}
      {page < 604 && <div onClick={() => handlePageChange(1)} className="cursor-pointer"><FaCaretLeft size={25} /></div>}
    </div>
  )
}
function QuranText({ ele,aya,surahNumber,surah,surahName }) {
  if(surahName!==aya?.surah?.name)return null;
  return (
    <>
      <span key={aya.number} className="hover:bg-ayah ayaText duration-500 ">
        {aya.numberInSurah === 1 ?
          <>
            <span>
              {aya.surah.name === 'سُورَةُ ٱلْفَاتِحَةِ' ?
                'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
                : aya.text.split('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')[1]
              }
            </span>
            <span className="px-2 text-green-600 font-semibold">{convertToArabicNumbers(aya.numberInSurah)}</span>
          </>
          :
          <>
            <span>{aya.text}</span>
            <span className="px-2 text-green-600 font-semibold">{convertToArabicNumbers(aya.numberInSurah)}</span>
          </>
        }
      </span>
    </>
  )
}
// )
export default memo(function Quran({ surahNumber, setSurahNumber,surahClicked }) {
  const [pageNumber, setPageNumber] = useState(parseInt(localStorage.getItem('PageNumber')) || parseInt(PagePerSurah[surahNumber-1].number));
  const { data: surahsPerPage, loading: surahsPerPageLoading } = useFetch(`https://api.alquran.cloud/v1/page/${pageNumber}/ar.asad`)
  const [surahsInPage, setSurahsInPage] = useState(surahsPerPage?.data?.surahs || []);

  const [surah, setSurah] = useState(surahsPerPage?.data?.ayahs || init.ayahs);
  const [surahName, setSurahName] = useState(PagePerSurah[surahNumber-1].name || localStorage.getItem('SurahName') || 'سُورَةُ ٱلْفَاتِحَةِ');
  localStorage.setItem('PageNumber', pageNumber);
  localStorage.setItem('SurahName', surahName);
  
  useEffect(() => {
    setSurah(surahsPerPage?.data?.ayahs || surah);
    setSurahsInPage(Object.values(surahsPerPage?.data?.surahs || surahsInPage))
    setSurahName(PagePerSurah[surahNumber-1].name || surahName);
  }, [surahNumber, surahsPerPage])

  useEffect(() => {
    setPageNumber(parseInt(PagePerSurah[surahNumber-1].number));
  },[surahClicked])
  // this func will check if our sora have beem started in the previous page
  const handleQuranMap  = (surahsInPage,name)=>{
    if(surahsInPage[0].name===name){
      let exit = true;
      surah.forEach((e)=>{
        if(e?.surah?.name===name && e?.numberInSurah===1){
          exit = false;
        }
      })
      if(exit)return null;
    }
    return(
      <>
        <div className="suraHeaderFrame font-semibold">{name}</div>
        {name !== 'سُورَةُ ٱلْفَاتِحَةِ' && <div className="ayaText text-center">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>}
      </>
    )
  }

  return (
    <>
      {(surahsPerPageLoading) ?
        <SurahLoader />

        :

        <div className="flex flex-col justify-center items-center">
          <div className="w-full text-xl font-semibold flex justify-between flex-wrap px-10">
            <div>الجزء</div>
            <div>{surahName}</div>
          </div>
          <div className='max-w-[600px] h-fit min-h-[700px] surahbg p-10'>
            <>
            {surahsInPage?.map((ele)=>(
              <div key={ele.name} className="mt-30 sm:mt-10 md:mt-0" id="quranTextLoop">
                {handleQuranMap(surahsInPage,ele.name)}
                {surah?.map((aya,idx)=>(
                    <span key={idx}>
                      <QuranText ele={ele} surahName={ele.name} surahNumber={surahNumber} aya={aya}surah={surah}/>
                    </span>
                  ))
                }
              </div>
            ))}
            </>
          </div>
          <div className="mt-10 w-full text-xl font-semibold text-center ">
           <Pagenation page={pageNumber} setPageNumber={setPageNumber} surahNumber={surahNumber} setSurahNumber={setSurahNumber} surahName={surahName} surahsPerPage={surahsPerPage} />
          </div>
        </div>
      }
    </>
  )
})
