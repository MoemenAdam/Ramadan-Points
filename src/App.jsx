import { Routes, Route } from "react-router"
import { AnimatePresence } from "framer-motion"

import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"


function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </AnimatePresence>
  )
}

export default App
