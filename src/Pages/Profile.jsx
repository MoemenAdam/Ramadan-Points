import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from '../CustomHooks/useAuth';
import Cookies from 'js-cookie';
const url = 'https://ramadan-points.onrender.com/api/v1/';
import FooterText from '../components/FooterText';
import Challenges from '../components/ChallengesComponents/Challenges';
import ChangePassword from '../components/ChangePassword';


export default function Login() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myImg, setMyImg] = useState('');
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await fetch(`${url}users/logout`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        }
      })
      const data = await res.json();
      Cookies.remove('token');
      Cookies.remove('name');
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await fetch(`${url}users/me`, {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        const data = await response.json();
        setData(data);

        
        setLoading(false);
        if (data.status !== 'success') {
          handleLogOut();
        }else{
          if (data.data.user.img.split(' ')[0] === 'جيلي') setMyImg('assets/jelly.png');
          if (data.data.user.img.split(' ')[0] === 'سمبوسة') setMyImg('assets/sambosa.png');
          if (data.data.user.img.split(' ')[0] === 'بسبوسة') setMyImg('assets/basbousa.png');
          if (data.data.user.img.split(' ')[0] === 'سوبيا') setMyImg('assets/gozhend.png');
        }
      }
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [])
  const handlePassChange = () => {
    navigate('/change-password');
  }

  if (loading || !data || data.status !== 'success') {
    return
  }
  // جيلي - سمبوسة - بسبوسة - سوبيا

  return (
    <>
      <div className='bg-black mainPage min-h-screen overflow-x-hidden'>
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
          <main className="text-xl mobile:mt-20 mt-40 mainMargin gap-16 flex-col relative  flex justify-center pb-10 items-center">
            <div className='w-full flex flex-col nav:flex-row gap-y-10'>
              <div className='flex justify-center items-center w-full'>
                <div className='w-full mobile:w-[350px] h-fit mobile:h-[561px] relative flex flex-col items-center justify-end top-0'>
                  <img className="mobile:-top-20 -top-32 z-10 border-profile2 border-4 absolute rounded-full aspect-[1/1] max-h-[222px] max-w-[80%]" src={myImg} alt="" />
                  <div className='pb-10 gap-y-10 h-fit bottom-0 flex flex-col bg-profile2  w-full  justify-evenly items-center pt-24 rounded-2xl'>
                    <div className='flex flex-col justify-center items-center text-center gap-1 mx-10'>
                      {/* <FaRegEdit className='w-[19px] h-[19px] justify-self-center text-center mb-2' /> */}
                      <h1 className={`font-bold text-3xl break-all ${data.data.user.name.length >= 24 ? "break-all" : ""}`}>
                        {data.data.user.name}
                      </h1>
                      <p>
                        {data.data.user.img}
                      </p>
                    </div>

                    <div className='flex'>
                      <div className='ProfileLine w-32'></div>
                      <p className='font-bold  text-4xl'>#{data.data.user.rank}</p>
                      <div className='ProfileLine w-32'></div>
                    </div>

                    <div className=' w-[80%] rounded-md overflow-hidden border-2 border-black  hover:scale-105 duration-300'>
                      <button onClick={handlePassChange} className='text-black w-full h-full px-5 py-4'>
                        تغيير كلمة المرور
                      </button>
                    </div>
                    <div className='bg-black w-[80%] rounded-md  overflow-hidden hover:scale-105 duration-300'>
                      <button onClick={handleLogOut} className='loginColor w-full h-full px-5 py-4'>
                        تسجيل الخروج
                      </button>
                    </div>

                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-end flex-grow items-center gap-9 text-center w-full'>
                <div className='flex flex-col bg-profile2 h-[190px] w-full nav:w-[50%] justify-center items-center rounded-2xl'>
                  <h1 className='font-bold text-6xl'> {data.data.user.points} </h1>
                  <p> نقاط التحدى </p>
                </div>


                <div className='flex  bg-profile2 h-[190px] flex-wrap  w-full nav:w-[75%] justify-around items-center rounded-2xl '>
                  <div className="flex-col flex">
                    <h1 className='font-bold text-6xl'> {data.data.user.completedSchedules} </h1>
                    <p > مهام منجزه </p>
                  </div>
                  <div className="flex-col flex">
                    <h1 className='font-bold text-6xl'> {data.data.user.unCompletedScedules} </h1>
                    <p > مهام فائته </p>
                  </div>

                </div>
              </div>
            </div>
            <div className='flex-grow'>
              <FooterText class />
            </div>
          </main>
          <Challenges/>
        </HelmetProvider>
      </div>
    </>
  )
}