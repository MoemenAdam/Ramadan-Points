import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TopNavBar from "../components/HomeComponents/TopNavBar";
import LeaderBoard from './LeaderBoard';
import { useAuth } from '../CustomHooks/useAuth';
import Cookies from "js-cookie";
import TopUsers from '../components/LeaderBoardComponents/TopUsers';
import SurahLoader from '../components/HomeComponents/QuranComponents/SurahLoader';
import Challenges from '../components/ChallengesComponents/Challenges';
import t0 from '../assets/t0.png'
import t0s from '../assets/t0s.png'
import t1 from '../assets/t1.png'
import t1s from '../assets/t1s.png'
import t2 from '../assets/t2.png'
import t2s from '../assets/t2s.png'
import t3 from '../assets/t3.png'
import t3s from '../assets/t3s.png'
const url = 'https://ramadan-points-backend.onrender.com/api/';

export default function PreviousChallenges() {
  const [active, setActive] = useState(1);
  const [currentUser, setCurrentUser] = useState(false);
  const [Top3Data, setTop3Data] = useState(false);
  const [imgType, setImgType] = useState(0);
  const { data, loading } = useAuth(`${url}v1/users/top?page=1&limit=3`, Cookies.get('token') || 'noToken', 'GET', null)
  const handleActiveChange = (num) => {
    setActive(num);
  }

  useEffect(() => {
    if (loading) return;
    if (data.status === 'fail') return;
    let tot = 3;
    // let holder = {};
    let holder = {
      first: {
        name: '',
        score: 0,
        id: ''
      },
      second: {
        name: '',
        score: 0,
        id: ''
      },
      third: {
        name: '',
        score: 0,
        id: ''
      }
    };
    let first = {};
    let second = {};
    let third = {};
    if (tot > data.data.users.length) tot = data.data.users.length;
    for (let i = 0; i < tot; i++) {
      let img = '';
      if (data.data.users[i].img.split(' ')[0] === 'جيلي') img = 'assets/jelly.png';
      if (data.data.users[i].img.split(' ')[0] === 'سمبوسة') img = 'assets/sambosa.png';
      if (data.data.users[i].img.split(' ')[0] === 'بسبوسة') img = 'assets/basbousa.png';
      if (data.data.users[i].img.split(' ')[0] === 'سوبيا') img = 'assets/gozhend.png';
      if (i === 0) {
        first.name = data.data.users[i].img;
        first.score = data.data.users[i].points;
        first.id = data.data.users[i]._id;
        first.img = img;
        holder.first = first;
      } else if (i === 1) {
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
    const rank = data.data.users.filter(e => e._id === data.data?.currentUser?._id);
    setCurrentUser('');
    setTop3Data(holder)
    if (rank.length === 0) setImgType(0);
    else {
      if (rank[0]?._id === '65ef701d08ee4d44b863ef17') setImgType(1);
      if (rank[0]?._id === '65f04cfc0027e9b33b5f6823') setImgType(2);
      if (rank[0]?._id === '65f121e180528c97512486aa') setImgType(3);
    }
  }, [data])
  return (
    <section className="mainPage flex flex-col bg-black text-white min-h-[100dvh] overflow-hidden">
      <TopNavBar />
      <section className='mainMargin flex justify-center'>
        <nav className='flex mt-10 mb-10 text-[#FFFFFF]'>
          <ul className='flex flex-wrap justify-center flex-row-reverse gap-10 w-fit'>
            <li onClick={() => { handleActiveChange(1) }} className={`cursor-pointer ${active === 1 ? 'active loginColor' : ''}`}>رمضان 2024</li>
          </ul>
        </nav>
      </section>
      {/* <div className='flex justify-between flex-grow'>
        <div className='flex items-center justify-center flex-grow mt-48'>
          {!loading && <TopUsers data={Top3Data} currentUser={currentUser} />}
          {loading && <div className='-mt-44'><SurahLoader /></div>}
        </div>
      </div> */}
      <div className='flex justify-between select-none pointer-events-none'>
        <div className='flex items-center justify-center flex-grow'>
          <img className='h-full fold3:block hidden' src={
            imgType == 0 ? t0 : imgType == 1 ? t1 : imgType == 2 ? t2 : t3
          } alt="" />
          <img className='fold3:hidden' src={
            imgType == 0 ? t0s : imgType == 1 ? t1s : imgType == 2 ? t2s : t3s
          } alt="" />
        </div>
      </div>

      <Challenges />

    </section>
  )
}
