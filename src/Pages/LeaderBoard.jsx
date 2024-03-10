import TopUsers from "../components/LeaderBoardComponents/TopUsers"
import AllUsers from "../components/LeaderBoardComponents/AllUsers"
import { useLocation } from "react-router-dom"
import TopNavBar from "../components/HomeComponents/TopNavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/HomeComponents/footer";
export default function LeaderBoard() {
  const location = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  
  const Top3Data = {
    first:{
      name: 'سوبيا 15',
      score: 1900
    },
    second:{
      name: 'سمبوسة 93',
      score: 993
    },
    third:{
      name: 'سمبوسة 4',
      score: 752
    }
  }

  return (
    <div style={{direction:'ltr'}} className="mainPage bg-black min-h-screen overflow-x-hidden">
      {location==='Top' && <TopNavBar/>}
      <div className=" mainMargin">

      {location!=='Top' && <p className="loginColor text-center mt-10 mb-10 font-bold text-4xl">ترتيب المتسابقين</p>}
      <div className="flex flex-col items-center h-full">
        <TopUsers data={Top3Data}/>
        {location==='Top' && <AllUsers/>}
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
