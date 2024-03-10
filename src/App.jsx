import { Routes, Route } from "react-router"
import { AnimatePresence } from "framer-motion"

import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NavBarCtxProvider from "./store/NavBarCtx"
import Root from "./Pages/Root"
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword"
import ResetToken from "./Pages/ResetToken"
import LeaderBoard from "./Pages/LeaderBoard"


function App() {
  return (
    <>
    <NavBarCtxProvider>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Root/>}>
            <Route index element={<Home />}/>
            <Route path="login" element={<Login />}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="forgot-password" element={<ForgotPassword />}/>
            <Route path="reset-token" element={<ResetToken />}/>
            <Route path="reset-password" element={<ResetPassword />}/>
            <Route path="leaderboard" element={<LeaderBoard/>}/>
          </Route>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </AnimatePresence>
    </NavBarCtxProvider>
    </>
  )
}

export default App
