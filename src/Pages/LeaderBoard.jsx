import TopUsers from "../components/LeaderBoardComponents/TopUsers"
import AllUsers from "../components/LeaderBoardComponents/AllUsers"
import { useLocation,useNavigate } from "react-router-dom"
import TopNavBar from "../components/HomeComponents/TopNavBar";
import Footer from "../components/HomeComponents/footer";
import {useAuth} from '../CustomHooks/useAuth'
import { useEffect, useState, memo } from "react";
import Cookies from "js-cookie";
import Challenges from "../components/ChallengesComponents/Challenges";
import SurahLoader from "../components/HomeComponents/QuranComponents/SurahLoader";
const url = 'https://ramadan-points.onrender.com/api/';
export default memo(function LeaderBoard() {
  const location = useLocation().pathname.split('/')[1];
  const [Top3Data, setTop3Data] = useState(false);
  const [AllData, setAllData] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();
  const {data,loading} = useAuth(`${url}v1/users/top?page=1&limit=300`,Cookies.get('token') || 'noToken','GET',null)

  useEffect(()=>{
    if(loading)return;
    if(data.status === 'fail')return;
    let tot = 3;
    // let holder = {};
    let holder = {
      first:{
        name: '',
        score: 0,
        id: ''
      },
      second:{
        name: '',
        score: 0,
        id: ''
      },
      third:{
        name:  '',
        score:  0,
        id:  ''
      }
    };
    let first = {};
    let second = {};
    let third = {};
    if(tot > data.data.users.length) tot = data.data.users.length;
    for(let i = 0; i < tot; i++){
      let img ='';
      if(data.data.users[i].img.split(' ')[0] === 'جيلي')  img = 'assets/jelly.png';
      if(data.data.users[i].img.split(' ')[0] === 'سمبوسة')  img = 'assets/sambosa.png';
      if(data.data.users[i].img.split(' ')[0] === 'بسبوسة')  img = 'assets/basbousa.png';
      if(data.data.users[i].img.split(' ')[0] === 'سوبيا')  img = 'assets/gozhend.png';
      if(i === 0)
      {
        first.name = data.data.users[i].img;
        first.score = data.data.users[i].points;
        first.id = data.data.users[i]._id;
        first.img = img;
        holder.first = first;
      } else if(i === 1)
      {
        second.name = data.data.users[i].img;
        second.score = data.data.users[i].points;
        second.id = data.data.users[i]._id;
        second.img = img;
        holder.second = second;
      } else {
        third.name = data.data.users[i].img;
        third.score = data.data.users[i].points;
        third.id = data.data.users[i]._id;
        third.img = img;
        holder.third = third;
      }
    }
    
    const users = [...data.data.users];
    const rank = data.data.users.filter(e=>e._id===data.data?.currentUser?._id);
    setCurrentUser(rank[0]?._id);
    setAllData([...users.splice(3)]);
    setTop3Data(holder);
  },[data])
  
  if (loading || !data || data.status !== 'success') {
    return (
      <div className='bg-black flex flex-col mainPage min-h-screen overflow-hidden'>
       {location==='top' && <TopNavBar/>}
        <div className='flex-grow flex justify-center items-center'>
          <SurahLoader />
        </div>
      </div>
    );
  }

  return (
    <div style={{direction:'ltr'}} className="mainPage bg-black min-h-screen overflow-x-hidden">
      {location==='top' && <TopNavBar/>}
      <div className=" mainMargin">

      {location!=='top' && <p className="loginColor text-center mt-10 mb-10 font-bold text-4xl">ترتيب المتسابقين</p>}
      <div className="flex flex-col items-center h-full">
        <TopUsers currentUser={currentUser} data={Top3Data} />
        {location==='top' && <AllUsers currentUser={currentUser} data={AllData} />}
      </div>
      {location!=='top' && 
        <div className="flex justify-center items-center">
          <button onClick={()=>navigate('/top')} className="text-center mb-20 font-bold text-black bg-[#5E758F] rounded-lg px-10 py-4 hover:scale-105 duration-300">
          ترتيب جميع المتسابقين
        </button>
      </div>}
      </div>
      {location==='top' &&
        <Footer/>
      }
      <Challenges/>
    </div>
  )
})
