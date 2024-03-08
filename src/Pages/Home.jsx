import WelcomeSection from "../components/HomeComponents/WelcomeSection"
import QuranSection from "../components/HomeComponents/QuranSection"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRef, useContext, useEffect } from "react"
import { NavBarctx } from "../store/NavBarCtx";
export default function Home() {
  const {url, setUrl} = useContext(NavBarctx)
  const Home = useRef(null);
  const quran = useRef(null);
  useEffect(()=>{
    const url = window.location.hash.substring(1);
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
  },[url])
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ramadan Points - Read Quran, Pray on Time, Earn Rewards</title>
      </Helmet>
      <div ref={Home}>
        <WelcomeSection />
      </div>
      <div ref={quran}>
        <QuranSection />
      </div>
    </HelmetProvider>
  )
}
