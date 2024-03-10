import { Routes, Route } from "react-router"
import { AnimatePresence } from "framer-motion"

import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NavBarCtxProvider from "./store/NavBarCtx"
import AuthContextProvider from "./store/AuthContext"
import Root from "./Pages/Root"
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword"
import ResetToken from "./Pages/ResetToken"
import LeaderBoard from "./Pages/LeaderBoard"
import Profile from "./Pages/Profile"

function App() {
  return (
    <>
    <AuthContextProvider>
      <NavBarCtxProvider>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Root/>}>
              <Route path="" element={<Home />}/>
              <Route path="login" element={<Login />}/>
              <Route path="signup" element={<Signup/>}/>
              <Route path="forgot-password" element={<ForgotPassword />}/>
              <Route path="reset-token" element={<ResetToken />}/>
              <Route path="reset-password" element={<ResetPassword />}/>
              <Route path="top" element={<LeaderBoard/>}/>
              <Route path="profile" element={<Profile/>}/>
            </Route>
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </AnimatePresence>
      </NavBarCtxProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
