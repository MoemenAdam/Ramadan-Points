import TopUsers from "../components/LeaderBoardComponents/TopUsers"
import AllUsers from "../components/LeaderBoardComponents/AllUsers"
import { useLocation,useNavigate } from "react-router-dom"
import TopNavBar from "../components/HomeComponents/TopNavBar";
import Footer from "../components/HomeComponents/footer";
import {useAuth} from '../CustomHooks/useAuth'
import { useEffect, useState, memo } from "react";
import Cookies from "js-cookie";
const url = 'https://ramadan-points.onrender.com/api/';
export default memo(function LeaderBoard() {
  const location = useLocation().pathname.split('/')[1];
  const [Top3Data, setTop3Data] = useState(false);
  const [AllData, setAllData] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();
  const {data,loading} = useAuth(`${url}v1/users/top?page=1&limit=50`,Cookies.get('token') || 'noToken','GET',null)

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
    console.log(data);
    if(tot > data.data.users.length) tot = data.data.users.length;
    for(let i = 0; i < tot; i++){
      if(i === 0)
      {
        first.name = data.data.users[i].img;
        first.score = data.data.users[i].points;
        first.id = data.data.users[i]._id;
        holder.first = first;
      } else if(i === 1)
      {
        second.name = data.data.users[i].img;
        second.score = data.data.users[i].points;
        second.id = data.data.users[i]._id;
        holder.second = second;
      } else {
        third.name = data.data.users[i].img;
        third.score = data.data.users[i].points;
        third.id = data.data.users[i]._id;
        holder.third = third;
      }
    }
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
})
