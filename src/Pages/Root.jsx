import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBarctx } from '../store/NavBarCtx'
import SideNavBar from '../components/SideNavBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"


export default function Root() {
  const { navBar, setNavBar } = useContext(NavBarctx)
  const { url, setUrl } = useContext(NavBarctx)
  const handleBackDropClicked = () => {
    if (!navBar) return;
    setNavBar(prev => !prev)
  }
  useEffect(() => {
    if (url !== '') setNavBar(false)
  }, [url])

  useEffect(() => {
    const Slah3laAlRasool = setInterval(() => {
      // toast.error('صلي على رسول الله ❤️', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    }, 1*60*1000)

    return () => {
      clearInterval(Slah3laAlRasool)
    }
  }, [])

  const styles = {
    backdrop: 'pointer-events-none select-none bg-black opacity-50 overflow-hidden',
    backdropReverse: 'nav:pointer-events-auto nav:select-auto nav:bg-black nav:opacity-100 nav:overflow-auto'
  }
  return (
    <>
      <SideNavBar />
      <div onClick={handleBackDropClicked}>
        <div className={navBar ? `${styles.backdrop} ${styles.backdropReverse} BackDrop` : null}>
          <Outlet />
          <Analytics />
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}
