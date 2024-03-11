import { createContext, useState } from "react"

export const ChallngeCtx = createContext();

export default function ChallngeCtxProvider({children}) {
  const [ShowChallnge, setShowChallnge] = useState(false);
  return (
    <ChallngeCtx.Provider value={{ShowChallnge, setShowChallnge}}>
      {children}
    </ChallngeCtx.Provider>
  )
}
