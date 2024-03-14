import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBarctx } from '../store/NavBarCtx'
import SideNavBar from '../components/SideNavBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"
import { motion, AnimatePresence } from 'framer-motion'


export default function Root() {
  const { navBar, setNavBar } = useContext(NavBarctx)
  const { url } = useContext(NavBarctx)
  const [ShowSala2 , setShowSala2] = useState(true);
  const handleBackDropClicked = () => {
    if (!navBar) return;
    setNavBar(prev => !prev)
  }
  useEffect(() => {
    if (url !== '') setNavBar(false)
  }, [url])
  useEffect(() => {
    const StartSala2 = setInterval(() => {
      setShowSala2(prev=>!prev);
    }, 120000)


    return () => {
      clearInterval(StartSala2)
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
          <AnimatePresence>
            {
              ShowSala2 && 
              <motion.div
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
                className='fixed top-0 right-0 text-center text-sm sm:text-md cursor-pointer bg-black z-[100] m-3 py-5 px-20 text-white select-none'
                whileHover={{ scale: 1.05}}
                onClick={() => setShowSala2(false)}
              >
                صلي على رسول الله ❤️
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}
