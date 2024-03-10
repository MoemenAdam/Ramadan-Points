import {useState} from 'react'
import LoginLayout from './LoginLayout';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
const url = 'https://ramadan-points.onrender.com/api/';
import { FaRegEdit } from "react-icons/fa";



export default function Login() {

  


  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Profile</title>
      </Helmet>
      <main className="text-xl mainMargin mainPage min-h-screen gap-16 flex-wrap relative overflow-hidden flex justify-center items-center pb-10">
                <div className='flex w-[350px] h-[561px]  relative flex-col justify-center items-center'>
                    <img className="absolute top-0 z-10 border-profile2 border-4 rounded-full aspect-[1/1] max-h-[222px] max-w-[222px]" src="/assets/profile.png" alt="" />
                    <div className='absolute bottom-0 flex flex-col bg-profile2  w-full h-[450px] justify-center items-center rounded-2xl'>
                        <div className='flex justify-center items-center gap-1'>
                            <FaRegEdit className='w-[19px] h-[19px] justify-self-center text-center mb-2'/>
                            <h1 className='font-bold text-3xl'> محمد نصر عبدالله </h1>
                        </div>
                        <p>سمبوسه 5</p>
                    </div> 
                </div>

                <div className='flex flex-col w-[50%] justify-center items-center gap-9'>
                    <div className='flex flex-col bg-profile2 h-[190px] w-[50%] justify-center items-center rounded-2xl'>
                        <h1 className='font-bold text-6xl'> 1930 </h1>
                        <p> نقاط التحدى </p>
                    </div>

                   
                    <div className='flex  bg-profile2 h-[190px] w-[75%] justify-around items-center rounded-2xl '>
                        <div className="flex-col flex">
                            <h1 className='font-bold text-6xl'> 40 </h1>
                            <p > مهام منجزه </p>
                        </div>
                        <div className="flex-col flex">
                            <h1 className='font-bold text-6xl'> 7 </h1>
                            <p > مهام فائته </p>
                        </div>
                        
                    </div>
                </div>
      </main>
    </HelmetProvider>
    
  )
}
