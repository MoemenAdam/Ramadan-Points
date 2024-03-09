import { useState, useContext } from "react";
import { NavLink } from "react-router-dom"
import { Link } from "react-router-dom"
import Lites from "./Lites.svg"
import { GiHamburgerMenu } from "react-icons/gi";
import {NavBarctx} from "../../store/NavBarCtx"
import { motion, AnimatePresence } from "framer-motion"
import SideNavBar from "../SideNavBar";


export default function TopNavBar() {
  const {navBar, setNavBar} = useContext(NavBarctx)
  const {url,setUrl} = useContext(NavBarctx)

  const handleMenuClicked = ()=>{
    setNavBar(prev=>!prev)
  }
  const handleLink = (url)=>{
    return ()=>{
      setUrl(url)
    }
  }
  return (
    <>
      <section>
        <img className="brightness-75 select-none pointer-events-none absolute block -left-14 " src={Lites} alt="" />
      </section>
      <div className="text-white flex items-center justify-between">
        <section className="z-10">
          <Link to="/">
            <img className="select-none pointer-events-none w-28 h-28 flex-grow sm:mr-6" src="Logo.png" alt="Logo" />
          </Link>
        </section>
        <section className="nav:flex-grow z-20 font-bold">
          <nav className="hidden nav:block big:ml-[136px]">
            <ul className="flex gap-x-12 justify-center text">
            <li><Link className={url===''?'active':null} onClick={handleLink('')} to="/">الرئيسية</Link></li>
              <li><Link className={url==='challenge'?'active':null} onClick={handleLink('challenge')} to="/#challenge">تحدي رمضان</Link></li>
              <li><Link className={url==='leaderboard'?'active':null} onClick={handleLink('leaderboard')} to="/#leaderboard">ترتيب المتسابقين</Link></li>
              <li><Link className={url==='quran'?'active':null} onClick={handleLink('quran')} to="/#quran">قرآن</Link></li>
              <li><Link className={url==='duas'?'active':null} onClick={handleLink('duas')} to="/#duas">أدعية</Link></li>
              <li><Link to="/login">تسجيل الدخول</Link></li>
            </ul>
          </nav>
          <nav onClick={handleMenuClicked} className="nav:hidden block pl-6 cursor-pointer">
            <GiHamburgerMenu size={30}/>
          </nav>
        </section>
      </div>
    </>
  )
}
