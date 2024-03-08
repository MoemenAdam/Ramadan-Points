import {useState} from 'react'
import { createContext } from 'react'

export const NavBarctx = createContext({
  navBar: false,
  setNavBar: () => {}
})

export default function NavBarCtxProvider({children}) {
  const [navBar, setNavBar] = useState(false)
  const [url, setUrl] = useState(window.location.hash.substring(1))
  return (
    <NavBarctx.Provider value={{navBar, setNavBar, url, setUrl}}>
      {children}
    </NavBarctx.Provider>
  )
}
