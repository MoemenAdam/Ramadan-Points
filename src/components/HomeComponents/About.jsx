import React from 'react'

export default function About() {
  return (
    <main className='mainPage min-h-screen bg-black flex justify-center'>
      <div className='mainMargin py-20 loginColor'>
        <h1 className='text-4xl mb-20 text-center'>عن رمضان بوينتس</h1>
        <section className='mainMargin2 nav:grid grid-cols-12 flex flex-col items-center gap-y-10'>
          <div className='col-span-5 flex flex-col justify-center gap-10'>
            <h1 className='text-center text-2xl'>تحدي رمضان</h1>
            <p className='text-white brightness-75 text-lg'>تحدي رمضان يشجع بشكل فعّال المشاركين على الالتزام بصلواتهم وختم قراءة القرآن الكريم خلال شهر الصيام، من خلال التنافس المثير بينهم لتحقيق أعلى النقاط. يتزايد مجموع النقاط كلما أتم المشارك مهام التحدي في الوقت المحدد، ويمكن متابعة ترتيب المتسابقين بشكل مباشر خلال التحدي.</p>
            <p className='text-white brightness-75 text-lg'>وفي ختام شهر رمضان، يتم تكريم الثلاث متسابقين الأوائل الذين برعوا في الالتزام طوال الشهر، حيث يحصلون على جوائز مميزة تعكس إلتزامهم واجتهادهم على اغتنام الشهر الكريم.</p>
            <button className='Mainbtn py-3 px-12'>إبدأ التحدي</button>
          </div>
          <div className='col-span-2'></div>
          <div className='col-span-5 flex'>
            <img className='Aboutbg' src="/assets/about.png" alt="" />
          </div>
        </section>
      </div>
    </main>
  )
}
