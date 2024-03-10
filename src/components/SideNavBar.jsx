import { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion"
import { NavBarctx } from "../store/NavBarCtx"
import {AuthContext} from "../store/AuthContext"
import Cookies from "js-cookie";

export default function SideNavBar() {
  const { navBar, setNavBar } = useContext(NavBarctx)
  const { url, setUrl } = useContext(NavBarctx)
  const {isLoggedin, setIsLoggedin} = useContext(AuthContext);
  const {userName, setUserName} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuClicked = () => {
    setNavBar(prev => !prev)
  }
  const handleLogOut = ()=>{
    Cookies.remove('token');
    navigate('/');
    window.location.reload();
  }
  const handleLink = (url) => {
    return () => {
      setUrl(url)
    }
  }
  useEffect(()=>{
    if(navBar){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
  },[navBar])
  return (
    <AnimatePresence>
      {(navBar ) &&
        <motion.nav
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.2 }}
          className="nav:hidden fixed bg-[#1E2820] font-normal text-white p-10 h-screen left-0 top-0 z-[100]  nav2:w-[300px] w-full">

          <div onClick={handleMenuClicked} className="cursor-pointer mb-10">
            <GiHamburgerMenu size={30} />
          </div>
          <nav className="text-center">
            <ul className="flex flex-col gap-12 justify-center text">
              <li className="loginColor">
                {isLoggedin && <p>مرحبا {userName}</p>}
              </li>
              <li><NavLink onClick={handleLink('')} to="/">الرئيسية</NavLink></li>
              <li><NavLink onClick={handleLink('Top')} to="/Top">ترتيب المتسابقين</NavLink></li>
              {!isLoggedin &&<li className="loginColor">
                 <Link to="/login">تسجيل الدخول</Link>
              </li>}
              {isLoggedin && <li><NavLink onClick={handleLink('profile')} to="/profile">الملف الشخصي</NavLink></li>}
              {isLoggedin &&<li> <button onClick={handleLogOut}>تسجيل الخروج</button>
              </li>}
            </ul>
          </nav>

        </motion.nav>
      }
    </AnimatePresence>
  )
}
