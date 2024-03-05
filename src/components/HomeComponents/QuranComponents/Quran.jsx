import { useEffect, useState } from "react";
import { useFetch } from "../../../CustomHooks/useFetch"
import SurahLoader from "./SurahLoader"

const init = {
  "number": 1,
  "name": "سُورَةُ ٱلْفَاتِحَةِ",
  "englishName": "Al-Faatiha",
  "englishNameTranslation": "The Opening",
  "revelationType": "Meccan",
  "ayahs": [
      {
          "number": 1,
          "text": "﻿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          "numberInSurah": 1,
          "juz": 1,
          "manzil": 1,
          "page": 1,
          "ruku": 1,
          "hizbQuarter": 1,
          "sajda": false
      },
      {
          "number": 2,
          "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          "numberInSurah": 2,
          "juz": 1,
          "manzil": 1,
          "page": 1,
          "ruku": 1,
          "hizbQuarter": 1,
          "sajda": false
      },
      {
          "number": 3,
          "text": "الرَّحْمَٰنِ الرَّحِيمِ",
          "numberInSurah": 3,
          "juz": 1,
          "manzil": 1,
          "page": 1,
          "ruku": 1,
          "hizbQuarter": 1,
          "sajda": false
      },
      {
          "number": 4,
          "text": "مَالِكِ يَوْمِ الدِّينِ",
          "numberInSurah": 4,
          "juz": 1,
          "manzil": 1,
          "page": 1,
          "ruku": 1,
          "hizbQuarter": 1,
          "sajda": false
      },
      {
          "number": 5,
          "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          "numberInSurah": 5,
          "juz": 1,
          "manzil": 1,
          "page": 1,
          "ruku": 1,
          "hizbQuarter": 1,
          "sajda": false
      },
      {
          "number": 6,
          "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
          "numberInSurah": 6,
          "juz": 1,
          "manzil": 1,
          "page": 1,
          "ruku": 1,
          "hizbQuarter": 1,
          "sajda": false
      },
      {
          "number": 7,
          "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
          "numberInSurah": 7,
          "juz": 1,
          "manzil": 1,
          "page": 1,
          "ruku": 1,
          "hizbQuarter": 1,
          "sajda": false
      }
  ]
}

export default function Quran({surahNumber, setSurahNumber}) {
  const {data: surahsData, loading: surahsLoading} = useFetch('https://api.alquran.cloud/v1/quran/ar.asad')
  const [surah,setSurah] = useState(init);
  useEffect(()=>{
    setSurah(surahsData?.data?.surahs?.filter(e=>e.number === surahNumber)[0] || init);
  },[surahNumber])


  // cooment for future
  // qframe has 3 parts top, middle, bottom
  // qframeMiddle has quranText 
  // quranText has suraHeaderFrame if exist and ayaText
  // quranText has semi yellow background



  // now how to use
  // qFrameTop for top
  // qFrameMiddle for middle
  // qFrameBottom for bottom
  // suraHeaderFrame for sura header
  // ayaText for aya text
  // quranText for quran text
  return (
    <>
      {surahsLoading ?
        <SurahLoader />

        :
      
        <div className='w-[500px]'>
          <div className="qFrame qFrameTop"></div>

          {/* <div className="qFrameMiddle ">
            <div className="quranText" id="quranText">
              <div className="suraHeaderFrame">سورة الأنعام</div>
              <div className="ayaText text-center">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ </div>
              <div className="leading-[55px]">

                هُوَ الَّذِي خَلَقَكُم مِّن طِينٍ ثُمَّ قَضَىٰ أَجَلًا ۖ وَأَجَلٌ مُّسَمًّى عِندَهُ ۖ ثُمَّ أَنتُمْ تَمْتَرُونَ &lrm;﴿٢﴾&lrm; وَهُوَ اللَّهُ فِي السَّمَاوَاتِ وَفِي الْأَرْضِ ۖ يَعْلَمُ سِرَّكُمْ وَجَهْرَكُمْ وَيَعْلَمُ مَا تَكْسِبُونَ ‎﴿٣﴾‏ فَقَدْ كَذَّبُوا بِالْحَقِّ لَمَّا جَاءَهُمْ ۖ فَسَوْفَ يَأْتِيهِمْ أَنبَاءُ مَا كَانُوا بِهِ يَسْتَهْزِئُونَ ‎﴿٥﴾‏ أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا مِن قَبْلِهِم مِّن قَرْنٍ مَّكَّنَّاهُمْ فِي الْأَرْضِ مَا لَمْ نُمَكِّن لَّكُمْ وَأَرْسَلْنَا السَّمَاءَ عَلَيْهِم مِّدْرَارًا وَجَعَلْنَا الْأَنْهَارَ تَجْرِي مِن تَحْتِهِمْ فَأَهْلَكْنَاهُم بِذُنُوبِهِمْ وَأَنشَأْنَا مِن بَعْدِهِمْ قَرْنًا آخَرِينَ ‎﴿٦﴾‏ وَلَوْ نَزَّلْنَا عَلَيْكَ كِتَابًا فِي قِرْطَاسٍ فَلَمَسُوهُ بِأَيْدِيهِمْ لَقَالَ الَّذِينَ كَفَرُوا إِنْ هَٰذَا إِلَّا سِحْرٌ مُّبِينٌ ‎﴿٧﴾‏ وَقَالُوا لَوْلَا أُنزِلَ عَلَيْهِ مَلَكٌ ۖ وَلَوْ أَنزَلْنَا مَلَكًا لَّقُضِيَ الْأَمْرُ ثُمَّ لَا يُنظَرُونَ ‎﴿٨﴾‏
              </div>

            </div>
          </div> */}
            <div className="qFrameMiddle ">
              <div className="quranText" id="quranText">
                <div className="suraHeaderFrame">{surah.name}</div>
                <div className="flex flex-wrap">
                    {surah?.ayahs?.map((aya) => (
                      <div key={aya.number}>
                        <div className="ayaText text-center">{aya.text}</div>
                      </div>
                      ))
                    }
                </div>
              </div>
            </div>

          <div className="qFrame qFrameBottom"></div>
        </div>
      }
    </>
  )
}
