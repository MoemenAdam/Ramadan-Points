import {useState} from 'react'
import { createContext } from 'react'

export const NavBarctx = createContext()

export default function NavBarCtxProvider({children}) {
  const [navBar, setNavBar] = useState(false);
  const [token, setToken] = useState('');
  const [url, setUrl] = useState(window.location.hash.substring(1))
  return (
    <NavBarctx.Provider value={{navBar, setNavBar, url, setUrl,token, setToken}}>
      {children}
    </NavBarctx.Provider>
  )
}
