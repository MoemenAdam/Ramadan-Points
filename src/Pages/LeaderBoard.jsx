import TopUsers from "../components/LeaderBoardComponents/TopUsers"
import AllUsers from "../components/LeaderBoardComponents/AllUsers"
import { useLocation } from "react-router-dom"
import TopNavBar from "../components/HomeComponents/TopNavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/HomeComponents/footer";
import {useAuth} from '../CustomHooks/useAuth'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const url = 'https://ramadan-points.onrender.com/api/';
export default function LeaderBoard() {
  const location = useLocation().pathname.split('/')[1];
  const [Top3Data, setTop3Data] = useState(false);
  const [AllData, setAllData] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();
  const {data,loading} = useAuth(`${url}v1/users/top?page=1&limit=50`,Cookies.get('token') || 'noToken','GET',null)

  useEffect(()=>{
    if(loading)return;
    const holder = {
      first:{
        name: data.data.users[0].img,
        score: data.data.users[0].points,
        id: data.data.users[0]._id
      },
      second:{
        name: data.data.users[1].img,
        score: data.data.users[1].points,
        id: data.data.users[1]._id
      },
      third:{
        name: data.data.users[2].img,
        score: data.data.users[2].points,
        id: data.data.users[2]._id
      }
    };
    const users = [...data.data.users];
    const rank = data.data.users.filter(e=>e._id===data.data?.currentUser?._id);
    setCurrentUser(rank[0]?._id);
    setAllData([...users.splice(3)]);
    setTop3Data(holder);
  },[data])
  

  return (
    <div style={{direction:'ltr'}} className="mainPage bg-black min-h-screen overflow-x-hidden">
      {location==='Top' && <TopNavBar/>}
      <div className=" mainMargin">

      {location!=='Top' && <p className="loginColor text-center mt-10 mb-10 font-bold text-4xl">ترتيب المتسابقين</p>}
      <div className="flex flex-col items-center h-full">
        <TopUsers currentUser={currentUser} data={Top3Data} />
        {location==='Top' && <AllUsers currentUser={currentUser} data={AllData} />}
      </div>
      {location!=='Top' && 
        <div className="flex justify-center items-center">
          <button onClick={()=>navigate('/Top')} className="text-center mb-20 font-bold text-black bg-[#5E758F] rounded-lg px-10 py-4 hover:scale-105 duration-300">
          ترتيب جميع المتسابقين
        </button>
      </div>}
      </div>
      {location==='Top' &&
        <Footer/>
      }
    </div>
  )
}
