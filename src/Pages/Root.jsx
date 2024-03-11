import React,{useContext,useEffect,useState} from 'react'
import { Outlet } from 'react-router-dom'
import { NavBarctx } from '../store/NavBarCtx'
import SideNavBar from '../components/SideNavBar'
import Challenges from '../components/ChallengesComponents/Challenges';

export default function Root() {
  const {navBar, setNavBar} = useContext(NavBarctx)
  const {url, setUrl} = useContext(NavBarctx)
  const handleBackDropClicked = ()=>{
    if(!navBar)return;
    console.log(1);
    setNavBar(prev=>!prev)
  }
  useEffect(()=>{
    console.log(navBar);
  },[navBar])
  useEffect(()=>{
    if(url!=='')setNavBar(false)
  },[url])

  const styles = {
    backdrop: 'pointer-events-none select-none bg-black opacity-50 overflow-hidden',
    backdropReverse: 'nav:pointer-events-auto nav:select-auto nav:bg-black nav:opacity-100 nav:overflow-auto'
  }
  return (
    <>
      <SideNavBar/>
      <div onClick={handleBackDropClicked}>
        <div className={navBar?`${styles.backdrop} ${styles.backdropReverse} BackDrop`:null}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
