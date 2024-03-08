import { Routes, Route } from "react-router"
import { AnimatePresence } from "framer-motion"

import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NavBarCtxProvider from "./store/NavBarCtx"
import Root from "./Pages/Root"


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
          </Route>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </AnimatePresence>
    </NavBarCtxProvider>
    </>
  )
}

export default App
