import Quran from './QuranComponents/Quran'
import QuranSearch from './QuranComponents/QuranSearch'
import { useState,memo } from 'react'

export default memo(function QuranSection() {
  const [surahNumber,setSurahNumber] = useState(parseInt(localStorage.getItem('SurahNumber')) || 1);
  const [Jozoa, setJozoa] = useState(1)
  const [JozoaClicked, setJozoaClicked] = useState(1)
  const [surahClicked, setSurahClicked] = useState(1)
  const [type , setType] = useState('surah')
  return (
    <main className="mainPage min-h-screen relative flex flex-col pb-10">
      <main className="mainMargin2 mt-10 flex-grow flex flex-wrap items-start justify-center gap-20">
        <section className="flex-grow-[1] overflow-hidden bg-quranColor rounded-[32px]">
          <QuranSearch type={type} setType={setType} setJozoaClicked={setJozoaClicked} surahNumber={surahNumber} setSurahNumber={setSurahNumber} setSurahClicked={setSurahClicked} Jozoa={Jozoa} setJozoa={setJozoa}/>
        </section>
        <section className="w-auto overflow-hidden bg-quranColor flex items-center justify-center flex-grow-[4] rounded-[32px]  py-8 px-4 h-fit">
          <Quran type={type} setType={setType} JozoaClicked={JozoaClicked} surahNumber={surahNumber} setSurahNumber={setSurahNumber} surahClicked={surahClicked} Jozoa={Jozoa} setJozoa={setJozoa}/>
        </section>
      </main>
    </main>
  )
})
