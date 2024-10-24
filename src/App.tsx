import { RouterProvider } from "react-router-dom"
import { publicRoutes } from "./utils/routes"
import UserContextProvider from "./contexts/UserContextProvider"
import UserDetailsContextProvider from "./contexts/UserDetailsContextProvider"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useState } from "react"
import MainLoader from './assets/mainLoader.svg'
import { motion } from 'framer-motion'



const App = () => {
  const [isLoader, setIsLoader] = useState(true)

  const tl = gsap.timeline()

  useGSAP(() => {
    tl.to('.loader', {
      opacity: '0',
      duration: '1',
      delay: '3',
      onComplete: () => {
        setIsLoader(false)
      }
    })
    tl.to('.loader', {
      display: 'none'
    })
    tl.to('.main-screen', {
      filter: 'blur(0px)',
      duration: '0.09',
    })
  }, [])



  return (
    <div className={`${isLoader ? 'w-screen h-screen relative overflow-hidden' : 'w-full h-full'}`}>
      <div className="loader  h-full w-full absolute z-50  bg-black">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 100 }} transition={{ duration: 500, ease: 'linear' }} className="w-full h-1 origin-left scale-x-0  bg-white"></motion.div>
        <div className="flex items-center justify-center w-full h-full  text-teal-600 flex-col -mt-16">
          <img className="w-16" src={MainLoader} alt="" />
          <p>Thanks for your Patience <span className="text-red-600 text-3xl">.</span></p>
        </div>
      </div>

      <div className="main-screen max-w-screen-xl mx-auto h-screen blur-sm ">
        <UserDetailsContextProvider>
          <UserContextProvider>
            <RouterProvider router={publicRoutes} />
          </UserContextProvider>
        </UserDetailsContextProvider>
      </div>
    </div>
  )
}

export default App

