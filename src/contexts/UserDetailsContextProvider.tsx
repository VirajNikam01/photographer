import { createContext } from "react"


export const userDetailsContext = createContext({
  name: 'User Name',
  post: 'Film Maker'
})
const UserDetailsContextProvider = ({ children }: { children: any }) => {
  return (
    <userDetailsContext.Provider value={{ name: 'Rohit Kumbhar', post: "Film Maker" }}>
      {children}
    </userDetailsContext.Provider>
  )
}

export default UserDetailsContextProvider
