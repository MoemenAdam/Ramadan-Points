import Quran from './QuranComponents/Quran'
import QuranSearch from './QuranComponents/QuranSearch'
import { useState } from 'react'

export default function QuranSection() {
  const [surahNumber,setSurahNumber] = useState(parseInt(localStorage.getItem('SurahNumber')) || 1);
  const [surahClicked, setSurahClicked] = useState(1)
  return (
    <main className="mainPage min-h-screen relative flex flex-col">
      <main className="mainMargin2 flex-grow flex flex-wrap items-start justify-center gap-20 pt-10">
        <section className="flex-grow-[1] overflow-hidden bg-white rounded-[32px] h-[834px] ">
          <QuranSearch surahNumber={surahNumber} setSurahNumber={setSurahNumber} setSurahClicked={setSurahClicked}/>
        </section>
        <section className="w-auto overflow-hidden flex items-center justify-center flex-grow-[4] bg-white rounded-[32px] min-h-[834px] py-8 px-4 h-fit">
          <Quran surahNumber={surahNumber} setSurahNumber={setSurahNumber} surahClicked={surahClicked}/>
        </section>
      </main>
    </main>
  )
}
