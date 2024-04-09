import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NavBarCtxProvider from "./store/NavBarCtx"
import AuthContextProvider from "./store/AuthContext"
import Root from "./Pages/Root"
import ForgotPassword from "./Pages/ForgotPassword"
import LeaderBoard from "./Pages/LeaderBoard"
import ChangePassword from "./components/ChangePassword"
import Profile from "./Pages/Profile"
import ChallngeCtxProvider from "./store/ChallngeCtx"
import PreviousChallenges from "./Pages/PreviousChallenges"



function App() {
  return (
    <>
    <ChallngeCtxProvider>
      <AuthContextProvider>
        <NavBarCtxProvider>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Root/>}>
                <Route path="" element={<Home />}/>
                <Route path="login" element={<Login />}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="forgot-password" element={<ForgotPassword />}/>
                <Route path="change-password" element={<ChangePassword />}/>
                <Route path="top" element={<LeaderBoard/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="previous-challenges" element={<PreviousChallenges />}/>
                <Route path="*" element={<NotFound />}/>
              </Route>
            </Routes>
          </AnimatePresence>
        </NavBarCtxProvider>
      </AuthContextProvider>
    </ChallngeCtxProvider>
    </>
  )
}

export default App
