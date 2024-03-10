import TopUsers from "../components/LeaderBoardComponents/TopUsers"
import AllUsers from "../components/LeaderBoardComponents/AllUsers"
import { useLocation } from "react-router-dom"
import TopNavBar from "../components/HomeComponents/TopNavBar";
export default function LeaderBoard() {
  const location = useLocation().pathname.split('/')[1];
  
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
    <div style={{direction:'ltr'}} className="mainPage bg-black min-h-screen  overflow-x-hidden">
      {location==='leaderboard' && <TopNavBar/>}
      <div className="flex flex-col items-center">
        <TopUsers data={Top3Data}/>
        {location==='leaderboard' && <AllUsers/>}
      </div>
    </div>
  )
}
