import { useEffect, useState } from "react";
import { useFetch } from "../../../CustomHooks/useFetch"
import SurahLoader from "./SurahLoader"
import { motion } from 'framer-motion'
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";



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
function Pagenation({ page, setPageNumber, setPageTurn }) {

  const handlePageChange = (num) => {
    setPageNumber(prev => prev + num);
  }

  return (
    <div className="flex items-center justify-center flex-grow">
      {page >= 604 && <div><FaCaretRight color="gray" size={25} /></div>}
      {page < 604 && <div onClick={() => handlePageChange(1)} className="cursor-pointer"><FaCaretRight size={25} /></div>}

      <div className="px-4 select-none">{page}</div>

      {page <= 1 && <div><FaCaretLeft color="gray" size={25} /></div>}
      {page > 1 && <div onClick={() => handlePageChange(-1)} className="cursor-pointer"><FaCaretLeft size={25} /></div>}
    </div>
  )
}
function QuranText({surahName, surahNumber, surah}) {
  return (
    <div className="mt-20 sm:mt-10 md:mt-0" id="quranText">
      <div className="suraHeaderFrame font-semibold">{surahName}</div>
      {surahNumber !== 1 && <div className="ayaText text-center">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>}
      <div>
        {surah?.map((aya) => (
          <span key={aya.number} className="hover:bg-ayah ayaText duration-500 ">
            {aya.numberInSurah === 1 ?
              <>
                <span>
                  {surahNumber === 1 ?
                    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
                    : surah[0].text.split('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')[1]
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
        ))
        }
      </div>
    </div>
  )
}

export default function Quran({ surahNumber, setSurahNumber }) {
  const [pageNumber, setPageNumber] = useState(localStorage.getItem('PageNumber') || 1);
  const [pageTurn, setPageTurn] = useState(false);
  const [surahsInPage, setSurahsInPage] = useState(1);
  const { data: surahsData, loading: surahsLoading } = useFetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.asad`)
  const { data: surahsPerPage, loading: surahsPerPageLoading } = useFetch(`https://api.alquran.cloud/v1/page/${pageNumber}/ar.asad`)
  const [surah, setSurah] = useState(surahsData?.data || init.ayahs);
  const [surahName, setSurahName] = useState(surahsData?.data?.name || 'الفاتحة');
  localStorage.setItem('PageNumber', pageNumber);
  
  useEffect(() => {
    setSurah(surahsData?.data?.ayahs?.filter(e => {
      return e.page === surahsData?.data?.ayahs[0].page
    }) || surah);
    console.log({solo:surah});
    setSurahName(surahsData?.data?.name || surahName);
    setPageNumber(surahsData?.data?.ayahs[0].page || pageNumber);
    setPageTurn(false);
  }, [surahNumber, surahsData])

  useEffect(() => {
    if (surahsData?.data?.ayahs[0].page === pageNumber) return;
    setSurah(surahsPerPage?.data?.ayahs || surah);
    setSurahName(surahsPerPage?.data?.name || surahName);
    setPageTurn(true);
    console.log({perPage:surah});
    const holder = surah.map((e)=>e?.surah?.name)
    const st = new Set(holder)
    console.log(surahsInPage);
    setSurahsInPage(st || surahsInPage)
  }, [pageNumber, surahsPerPage])

  return (
    <>
      {surahsLoading ?
        <SurahLoader />

        :

        <div className="flex flex-col justify-center items-center">
          <div className="w-full text-xl font-semibold flex justify-between flex-wrap px-10">
            <div>الجزء</div>
            <div>{surahName}</div>
          </div>
          <div className='max-w-[600px] h-fit min-h-[700px] surahbg p-10'>
            {pageTurn?
              <>
              {surah?.map((ele)=>(
                <div key={ele.number}>
                  {/* {ele?.surah?.name} */}
                  <QuranText surahName={ele?.surah?.name} surahNumber={ele?.surah?.number} surah={surah}/>
                </div>
              ))
              }
              </>
            :
              <QuranText surahName={surahName} surahNumber={surahNumber} surah={surah}/>
            }
          </div>
          <div className="mt-10 w-full text-xl font-semibold text-center ">
            <Pagenation page={pageNumber} setPageNumber={setPageNumber} setPageTurn={setPageTurn} />
          </div>
        </div>
      }
    </>
  )
}
