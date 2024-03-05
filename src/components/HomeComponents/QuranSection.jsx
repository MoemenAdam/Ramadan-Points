import Quran from './QuranComponents/Quran'
import QuranSearch from './QuranComponents/QuranSearch'
import { useState } from 'react'

export default function QuranSection() {
  const [surahNumber,setSurahNumber] = useState(1);
  return (
    <main className="mainPage min-h-screen relative flex flex-col">
      <main className="mainMargin2 flex-grow flex flex-wrap items-center justify-center gap-20 pt-10">
        <section className="w-[330px] flex-none overflow-hidden bg-white rounded-[32px] h-[834px] ">
          <QuranSearch surahNumber={surahNumber} setSurahNumber={setSurahNumber}/>
        </section>
        <section className="w-auto overflow-hidden flex items-center justify-center flex-grow bg-white rounded-[32px] min-h-[834px] py-8 px-4 h-fit">
          <Quran surahNumber={surahNumber} setSurahNumber={setSurahNumber}/>
        </section>
      </main>
    </main>
  )
}
