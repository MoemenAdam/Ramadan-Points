import React,{useContext,useState} from 'react'
import { Outlet } from 'react-router-dom'
import { NavBarctx } from '../store/NavBarCtx'
import SideNavBar from '../components/SideNavBar'

export default function Root() {
  const {navBar, setNavBar} = useContext(NavBarctx)
  const handleBackDropClicked = ()=>{
    if(!navBar)return;
    setNavBar(prev=>!prev)
  }
  return (
    <>
      <SideNavBar/>
      <div onClick={handleBackDropClicked}>
        <div className={navBar?'pointer-events-none select-none bg-black opacity-50':null}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
