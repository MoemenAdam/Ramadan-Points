import { useState } from 'react'

export default function Duas() {
  const [acive, setActive] = useState(1);
  const handleActiveChange = (num)=>{
    setActive(num);
  }

  return (
    <main className='min-h-screen relative flex flex-col'>
      <section>
        <div className='duasTop flex flex-col justify-center items-center text-center gap-5 py-20 pb-40'>
          <h1 className='loginColor text-4xl'>أدعية</h1>
          <h2 className='text-[#EAEAEA]'>الدعاء .. عبادة عظيمة تتحقق بها الامنيات و تحلو بها الحياة</h2>
          <section className='mainMargin flex nav:hidden'>
            <nav className='flex mt-10 mb-10 text-[#FFFFFF]'>
              <ul className='flex flex-wrap justify-center flex-row-reverse gap-10 w-fit'>
                <li onClick={()=>{handleActiveChange(1)}} className={`cursor-pointer ${acive===1?'active loginColor':''}`}>أدعية عشوائية</li>
                <li onClick={()=>{handleActiveChange(2)}} className={`cursor-pointer ${acive===2?'active loginColor':''}`}>ادعية الصباح</li>
                <li onClick={()=>{handleActiveChange(3)}} className={`cursor-pointer ${acive===3?'active loginColor':''}`}>أدعية المساء</li>
                <li onClick={()=>{handleActiveChange(4)}} className={`cursor-pointer ${acive===4?'active loginColor':''}`}>أدعية قبل الإفطار</li>
              </ul>
            </nav>
          </section>
        </div>
      </section>
        <div className='duasLeft hidden nav:block h-[calc(100%-40px)] absolute left-0 top-10 w-[300px]'>
          <nav className='mt-[300px] flex justify-end ml-5 text-[#FFFFFF]'>
            <ul className='flex flex-col gap-10'>
              <li onClick={()=>{handleActiveChange(1)}} className={`cursor-pointer ${acive===1?'duasActive':''}`}>أدعية عشوائية</li>
              <li onClick={()=>{handleActiveChange(2)}} className={`cursor-pointer ${acive===2?'duasActive':''}`}>ادعية الصباح</li>
              <li onClick={()=>{handleActiveChange(3)}} className={`cursor-pointer ${acive===3?'duasActive':''}`}>أدعية المساء</li>
              <li onClick={()=>{handleActiveChange(4)}} className={`cursor-pointer ${acive===4?'duasActive':''}`}>أدعية قبل الإفطار</li>
            </ul>
          </nav>
        </div>
      <section className='hidden flex-grow self-end w-full nav:flex justify-center items-center -mt-44'>
        <div style={{direction:'ltr'}} className='col-span-3 mt-44'>
          <div className='Fanoos'>
          here is Fanoos

          </div>
        </div>
      </section>
    </main>
  )
}
