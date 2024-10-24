import { useContext } from "react"
import { userDetailsContext } from "../contexts/UserDetailsContextProvider"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "../contexts/UserContextProvider"
import Logout from "./Logout"

const Header = () => {

  const { name } = useContext(userDetailsContext)
  const { user } = useContext(UserContext)
  return (
    <div className="w-full flex justify-between items-center py-3 select-none">
      <Link to={'/'} className="text-teal-700 text-xl lg:text-2xl -mt-3 font-semibold">{name}<span className="text-red-600 text-4xl lg:text-5xl">.</span> </Link>

      <div id="links" className={`flex gap-3 sm:gap-5 sm:pt-0`}>
        <NavLink to={'/'} className={({ isActive }) => isActive ? ['text-teal-500 duration-500 font-bold before:content-[">"]'].join('') : ['hover:font-bold duration-300 hover:text-purple-600'].join('')}>Home</NavLink>
        <NavLink to={'/contact'} className={({ isActive }) => isActive ? ['text-teal-500 font-bold before:content-[">"]'].join('') : ['hover:font-bold duration-300 hover:text-purple-600'].join('')}>Contact</NavLink>
        {user && <Logout />}
      </div>
    </div>
  )
}

export default Header
