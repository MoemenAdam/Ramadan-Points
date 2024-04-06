import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRef, useContext, useEffect, useState } from "react"
import { NavBarctx } from "../store/NavBarCtx";

import WelcomeSection from "../components/HomeComponents/WelcomeSection"
import QuranSection from "../components/HomeComponents/QuranSection"
import Duas from "../components/HomeComponents/Duas";
import About from '../components/HomeComponents/About';
import Challenges from '../components/ChallengesComponents/Challenges';
import RightNavBar from '../components/HomeComponents/RightNavBar';
import Footer from '../components/HomeComponents/footer';
import LeaderBoard from './LeaderBoard';

export default function Home() {
  const {url} = useContext(NavBarctx)
  const Home = useRef(null);
  const quran = useRef(null);
  const duas = useRef(null);
  const about = useRef(null);
  const footer = useRef(null);
  const leaderboard = useRef(null);
  const [Show, setShow] = useState(false)
  useEffect(()=>{
    if(url===''){
      window.scrollTo({
        top:Home?.current?.offsetTop,
        behavior:'smooth'
      })
    }
    if(url==='quran'){
      window.scrollTo({
        top:quran?.current?.offsetTop,
        behavior:'smooth'
      })
    }
    if(url==='duas'){
      window.scrollTo({
        top:duas?.current?.offsetTop,
        behavior:'smooth'
      })
    }
    if(url==='challenge'){
      window.scrollTo({
        top:about?.current?.offsetTop,
        behavior:'smooth'
      })
    }
    if(url === 'about'){
      window.scrollTo({
        top:footer?.current?.offsetTop,
        behavior:'smooth'
      })
    }
    if(url === 'leaderboard'){
      window.scrollTo({
        top:leaderboard?.current?.offsetTop,
        behavior:'smooth'
      })
    }
  },[url])
  return (
    <HelmetProvider>
      <RightNavBar Home={Home.current?.offsetTop} 
        quran={quran.current?.offsetTop}
        duas={duas.current?.offsetTop}
        about={about.current?.offsetTop}/>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Read Quran, Pray on Time, Earn Rewards</title>
      </Helmet>
      <div ref={Home}>
        <WelcomeSection />
      </div>
      <div ref={duas}>
        <Duas />
      </div>
      <div ref={about}>
        <About/>
      </div>
      <div ref={quran}>
        <QuranSection />
      </div>
      <div className='min-h-[100dvh]' ref={leaderboard}>
        <LeaderBoard/>
      </div>
      <div ref={footer}>
        <Footer />
      </div>
      <Challenges/>
    </HelmetProvider>
  )
}
