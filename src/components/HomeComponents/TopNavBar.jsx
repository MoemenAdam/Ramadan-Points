import { useState, useContext, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom"
import Lites from "./Lites.svg"
import { GiHamburgerMenu } from "react-icons/gi";
import {NavBarctx} from "../../store/NavBarCtx"
import Cookies from "js-cookie";
import { useAuth } from "../../CustomHooks/useAuth"
import { AuthContext } from "../../store/AuthContext";




export default function TopNavBar() {
  const {navBar, setNavBar} = useContext(NavBarctx)
  const {url,setUrl} = useContext(NavBarctx)
  const {isLoggedin, setIsLoggedin} = useContext(AuthContext);
  const {userName, setUserName} = useContext(AuthContext);
  const Token = Cookies.get('token');
  const location = useLocation().pathname.split('/')[1];

  const {data:userData,loading:userDataLoading} = useAuth('https://ramadan-points-backend.onrender.com/api/v1/users/me',Token,'GET',null);

  useEffect(()=>{
    if(userDataLoading)return;
    if(userData.status!=='success')return;
    setIsLoggedin(true);
    setUserName(userData.data.user.name.split(' ')[0]);
  },[userDataLoading])

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
      {location==='' && <section>
        <img className="brightness-75 select-none pointer-events-none absolute block -left-14 " src={Lites} alt="" />
      </section>}
      <div className="text-white flex items-center justify-between">
        <section className="z-10">
          <Link to="/">
            <img className="select-none pointer-events-none w-28 h-28 flex-grow sm:mr-6" src="../../Logo.png" alt="Logo" />
          </Link>
        </section>
        <section className="nav:flex-grow z-20 font-normal">
          <nav className="hidden nav:block ml-[136px]">
            <ul className="flex gap-x-12 justify-center text">
            <li><NavLink onClick={handleLink('')} to="/">الرئيسية</NavLink></li>
            <li><NavLink onClick={handleLink('')} to="/previous-challenges">المسابقات الفائتة</NavLink></li>
              <li><NavLink onClick={handleLink('top')} to="/top">ترتيب المتسابقين</NavLink></li>

              <li className="loginColor">
                {!isLoggedin && <Link to="/login">تسجيل الدخول</Link>}
                {isLoggedin && 
                  <Link to="/profile">
                    الملف الشخصي
                  </Link>
                }
              </li>
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
