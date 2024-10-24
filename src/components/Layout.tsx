import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {
  return (
    <div className="px-3 sm:px-7">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
