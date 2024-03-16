/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState,memo } from "react";
import { useFetch } from "../../../CustomHooks/useFetch"
import SurahLoader from "./SurahLoader"
import { LayoutGroup, motion } from 'framer-motion'
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import {PagePerSurah} from '../../../store/QuranPages'
import {Alljozoa} from '../../../store/QuranPages'

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
  const [PageHolder, setPageHolder] = useState(page);
  const handlePageChange = (num) => {
    if(page + num<=0 || page + num>604)return;
    setPageNumber(prev => prev + num);
  }

  const handleChange = (e)=>{
    const myValue = parseInt(e.target.value.replace(/\D/g, '').trim());
    if(isNaN(myValue)){
      setPageHolder('');
      return;
    }
    if(myValue>604){
      setPageHolder(604);
      return;
    }
    if(myValue<=0){
      setPageHolder(1);
      return;
    }
    // setPageNumber(myValue);
    setPageHolder(myValue);
  }
  return (
    <div className="flex items-center justify-center flex-grow">
      {page <= 1 && <div className="ml-3"><FaCaretRight color="gray" size={25} /></div>}
      {page > 1 && <div onClick={() => handlePageChange(-1)} className="opacity-85  cursor-pointer ml-3"><FaCaretRight size={25} /></div>}

      <form className="flex justify-center items-center " onSubmit={(e)=>{
        e.preventDefault();
        setPageNumber(
          Math.max(
            1,
            Math.min(604,parseInt(PageHolder) || 0)
          )
        )
      }}>
        <input onChange={handleChange} 
        className="
        text-center select-none outline-none 
        px-4 py-1 w-[75px] border-b-[1px] font-normal 
        border-[#aaaaaa] text-lg" style={{direction:'ltr'}} 
        value={PageHolder}/>
      </form>

      {page >= 604 && <div className="mr-3"><FaCaretLeft color="gray" size={25} /></div>}
      {page < 604 && <div onClick={() => handlePageChange(1)} className="opacity-85 cursor-pointer mr-3"><FaCaretLeft size={25} /></div>}
    </div>
  )
}

function getTextWidth(text, font) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

let widthHolder = 0;


function QuranText({ aya, surahName }) {
  const [formattedText, setFormattedText] = useState('');

  useEffect(() => {
    const addSpacesToEndOfLine  = (text, containerWidth, fontSize, number) => {
      if(!text)
        return '';
      widthHolder += getTextWidth(number, `${fontSize}px hafs`);
      const words = text.trim().split(' ');
      let newText = '', curr = '';
      for (let i = 0; i < words.length; i++) {
        const wordWidth = getTextWidth(words[i], `${fontSize}px hafs`); // Adjust font size and family accordingly
        // const spacesNeeded = Math.floor((containerWidth - wordWidth) / getTextWidth(' ', `${fontSize}px hafs`));
        let test = getTextWidth(curr, `${fontSize}px hafs`) + getTextWidth(words[i], `${fontSize}px hafs`) + widthHolder;
        if(test > containerWidth){
          let addingSpaces = test - containerWidth;
          let addMoreSpaces = 0;
          let spaceSize = getTextWidth(' ', `${fontSize}px hafs`);
          while (addingSpaces> 0) {
            addMoreSpaces += 1;
            addingSpaces -= spaceSize; 
          }
          const currWords = curr.split(' ');
          for(let j = currWords.length - 1; j >= 0; j--){
            // let toBeginning = '';
            //   currWords[j] = toBeginning + currWords[j];
              // currWords[j] = newText.padEnd(currWords[j].length + Math.floor(addingSpaces / currWords.length), ' ');
              if(!currWords[j])
                continue;
              if(addMoreSpaces <= 0)
                break;
               currWords[j] = ' '.repeat(Math.floor(addMoreSpaces / currWords.length)) + currWords[j];
              addMoreSpaces -= Math.floor(addMoreSpaces / currWords.length);
              // if(addingSpaces <= 0)
              //   break;
          }
          for(let j = 0; j < currWords.length; j++){
            newText = newText + currWords[j] + ' ';
          }
          // let addMoreSpaces = 0;
          // let spaceSize = getTextWidth(' ', `${fontSize}px hafs`);
          // while (addingSpaces - spaceSize > 0) {
          //   addMoreSpaces += 1;
          //   addingSpaces -= spaceSize; 
          // }
          // console.log(`spaces to add = ${addMoreSpaces}`);
          // newText = newText + curr;
          // newText = newText.padEnd(newText.length + addMoreSpaces, ' ');
          curr = '';
          widthHolder = 0;
        } 
        curr = curr + words[i] + ' ';
      }
      
      if(curr.length)
        newText = newText + curr;
  
      widthHolder += getTextWidth(newText, `${fontSize}px hafs`);
      return newText;
    }

    const verseText = aya.numberInSurah === 1
      ? aya.surah.name === 'سُورَةُ ٱلْفَاتِحَةِ'
        ? 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'
        : aya.text.split('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ')[1] || aya.text
      : aya.text;

    const formatted = addSpacesToEndOfLine(verseText, 600, 30, convertToArabicNumbers(aya.numberInSurah));
    setFormattedText(formatted);
    // Clean up function
    return () => {
    };
  }, [aya, convertToArabicNumbers, surahName]);

  if (surahName !== aya?.surah?.name) return null;

  return (
    <span key={aya.number} className="hover:bg-ayah ayaText duration-500">
      <span className="quranContainer">{formattedText}</span>
      <span className="quranContainer px-2 text-green-600 font-semibold">{convertToArabicNumbers(aya.numberInSurah)}</span>
    </span>
  );
}
// )
export default memo(function Quran({ surahNumber,type, setSurahNumber,surahClicked,Jozoa,setJozoa,JozoaClicked }) {
  const [pageNumber, setPageNumber] = useState(parseInt(localStorage.getItem('PageNumber')) || parseInt(PagePerSurah[surahNumber-1].number));
  const { data: surahsPerPage, loading: surahsPerPageLoading } = useFetch(`https://api.alquran.cloud/v1/page/${pageNumber}/ar.asad`)
  const { data: JozoaData, loading: JozoaLoading } = useFetch(`https://api.alquran.cloud/v1/juz/${Jozoa}/ar.asad`)
  const [surahsInPage, setSurahsInPage] = useState(surahsPerPage?.data?.surahs || []);
  const [JozoaHolder, setJozoaHolder] = useState(Jozoa || 1)

  const [surah, setSurah] = useState(surahsPerPage?.data?.ayahs || init.ayahs);
  const [surahName, setSurahName] = useState(PagePerSurah[surahNumber-1]?.name || localStorage.getItem('SurahName') || 'سُورَةُ ٱلْفَاتِحَةِ');
  localStorage.setItem('PageNumber', pageNumber);
  localStorage.setItem('SurahName', surahName);
  // localStorage.setItem('Jozoa',Jozoa);
  
  useEffect(() => {
    setSurah(surahsPerPage?.data?.ayahs || surah);
    setSurahsInPage(Object.values(surahsPerPage?.data?.surahs || surahsInPage))
  }, [surahsPerPage])

  useEffect(()=>{
    setSurahName(PagePerSurah[surahNumber-1]?.name || surahName);
  },[surahNumber])

  useEffect(() => {
    setPageNumber(parseInt(PagePerSurah[surahNumber-1].number));
  },[surahClicked])

  useEffect(()=>{
    const holder = Object.values(surahsPerPage?.data?.surahs||[]);
    if(holder.length===0)return;
    setSurahName( holder[1]?holder[1].name:holder[0].name );
    const n = surahsPerPage?.data?.ayahs?.length
    setJozoaHolder(surahsPerPage?.data?.ayahs[n-1]?.juz);
    // if(parseInt( holder[1]?holder[1]?.number:holder[0]?.number ) !== surahNumber){
    //   localStorage.setItem('SurahNumber', holder[1]?holder[1]?.number:holder[0]?.number);
    //   setSurahNumber(parseInt( holder[1]?holder[1]?.number:holder[0]?.number ))
    // }
  },[pageNumber,surahsPerPage,surahsPerPageLoading])
  useEffect(()=>{
    if(type!=='jozoa')return;
    setPageNumber(JozoaData?.data?.ayahs[0]?.page || pageNumber);
  },[JozoaData])

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
      {(surahsPerPageLoading || JozoaLoading) ?
      <>
      
      <div className='w-[600px] big:min-h-[1000px] surahbg flex justify-center items-center text-ayahColor'>
        <SurahLoader />
        </div>
      </>

        :

        <div className="flex flex-col justify-center h-full items-center text-ayahColor">
          <div className="w-full text-xl font-semibold flex justify-between flex-wrap px-10 mb-5">
            <div>الجزء {convertToArabicNumbers(JozoaHolder)}</div>
            <div>{surahName}</div>
          </div>
          <div className='quranTesting max-w-[600px] h-fit surahbg text-ayahColor'>
            <>
            {surahsInPage?.map((ele)=>(
              <div key={ele.name} className="pt-10 sm:pt-10 md:pt-0" id="quranTextLoop">
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
