import { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion"
import { NavBarctx } from "../store/NavBarCtx"

export default function SideNavBar() {
  const { navBar, setNavBar } = useContext(NavBarctx)
  const { url, setUrl } = useContext(NavBarctx)

  const handleMenuClicked = () => {
    setNavBar(prev => !prev)
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
          className="nav:hidden fixed bg-[#1E2820] font-bold text-white p-10 h-screen left-0 top-0 z-[100]  nav2:w-[300px] w-full">

          <div onClick={handleMenuClicked} className="cursor-pointer mb-10">
            <GiHamburgerMenu size={30} />
          </div>
          <nav className="text-center">
            <ul className="flex flex-col gap-12 justify-center text">
              <li><Link className={url === '' ? 'active' : null} onClick={handleLink('')} to="/">الرئيسية</Link></li>
              <li><Link className={url === 'Top' ? 'active' : null} onClick={handleLink('Top')} to="/Top">ترتيب المتسابقين</Link></li>
              <li><Link to="/login" onClick={handleLink('login')}>تسجيل الدخول</Link></li>
            </ul>
          </nav>

        </motion.nav>
      }
    </AnimatePresence>
  )
}
