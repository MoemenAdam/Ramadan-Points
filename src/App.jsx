import { Routes, Route } from "react-router"
import { AnimatePresence } from "framer-motion"

import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"


function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route index element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </AnimatePresence>
  )
}

export default App
