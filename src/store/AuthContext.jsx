import {useState} from 'react'
import { createContext } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
  const Name = Cookies.get('name');
  const Token = Cookies.get('token');
  const [isLoggedin, setIsLoggedin] = useState(((Token)?true:false))
  const [userName, setUserName] = useState(Name)
  return (
    <AuthContext.Provider value={{isLoggedin, setIsLoggedin, userName, setUserName}}>
      {children}
    </AuthContext.Provider>
  )
}