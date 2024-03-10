import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from '../CustomHooks/useAuth';
import Cookies from 'js-cookie';
const url = 'https://ramadan-points.onrender.com/api/v1/';
import FooterText from '../components/FooterText';


export default function Login() {
  const {data, loading} = useAuth(`${url}users/me`, Cookies.get('token'),  'GET', null);
  const {data:Analatics, loading:Analaticsloading} = useAuth(`${url}users/analytics`, Cookies.get('token'),  'GET', null);
  const navigate = useNavigate();

  if(loading) return;
  if(Analaticsloading) return;
  // جيلي - سمبوسة - بسبوسة - سوبيا


  return (
    <div className='bg-black mainPage min-h-screen'>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Ramadan Points - Profile</title>
        </Helmet>
        <header className='ml-6 lg:ml-14 flex justify-between items-center'>
          <div className='sm:pr-6'>
            <Link to='/'>
              <img src="Logo.png" className='w-28 h-28 pointer-events-none' alt="Logo" />
            </Link>
          </div>
          <div onClick={() => { navigate(-1) }} className='cursor-pointer bg-[#CBA947] p-3 rounded-lg'>
            <IoIosArrowBack color='black' size={30} />
          </div>
        </header>
        <main className="text-xl mainMargin gap-16 flex-col relative overflow-hidden flex justify-center pb-10 items-center">
          <div className='w-full flex flex-col nav:flex-row gap-y-10'>
            <div className='flex justify-center items-center w-full'>
              <div className='w-full mobile:w-[350px] h-[561px] relative flex flex-col items-center'>
                <img className="top-0 z-10 border-profile2 border-4 rounded-full aspect-[1/1] max-h-[222px] max-w-[222px]" src="/assets/profile.png" alt="" />
                <div className='absolute bottom-0 flex flex-col bg-profile2  w-full h-[450px] justify-center items-center rounded-2xl'>
                  <div className='flex justify-center items-center text-center gap-1 mx-10'>
                    {/* <FaRegEdit className='w-[19px] h-[19px] justify-self-center text-center mb-2' /> */}
                    <h1 className='font-bold text-3xl break-all'> 
                      {data.data.user.name}
                    </h1>
                  </div>
                  <p>
                    {data.data.user.img}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center flex-grow items-center gap-9 text-center w-full'>
              <div className='flex flex-col bg-profile2 h-[190px] w-full nav:w-[50%] justify-center items-center rounded-2xl'>
                <h1 className='font-bold text-6xl'> {data.data.user.points} </h1>
                <p> نقاط التحدى </p>
              </div>


              <div className='flex  bg-profile2 h-[190px] flex-wrap  w-full nav:w-[75%] justify-around items-center rounded-2xl '>
                <div className="flex-col flex">
                  <h1 className='font-bold text-6xl'> {Analatics.data.completedSchedules} </h1>
                  <p > مهام منجزه </p>
                </div>
                <div className="flex-col flex">
                  <h1 className='font-bold text-6xl'> {Analatics.data.unCompletedScedules} </h1>
                  <p > مهام فائته </p>
                </div>

              </div>
            </div>
          </div>
          <div className='flex-grow'>
            <FooterText class/>
          </div>
        </main>
      </HelmetProvider>
    </div>
  )
}
