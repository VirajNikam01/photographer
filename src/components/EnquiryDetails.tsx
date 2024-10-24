import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { database } from "../utils/firebase"
import EnquiryDetail from "./EnquiryDetail"
import Header from "./Header"
import Loader from '../assets/loader.svg'
import { useNavigate } from "react-router-dom"

const EnquiryDetails = () => {
  const [userDetails, setUserDetails] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const databaseRef = ref(database, `enquiry`)
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val()

      setUserDetails(data)
    })

  }, [])


  return (
    <div className="px-2 w-full">
      <Header />
      <div onClick={() => navigate(-1)} className="px-6 cursor-pointer text-sm sm:text-base my-4 py-1 rounded-md bg-teal-500 hover:bg-red-500 text-white inline-block duration-300">{'⏮️ Back'}</div>
      {!userDetails && <div className=" flex my-16 items-center justify-center"><img src={Loader} alt="" /></div>}
      <div className="grid md:grid-cols-2 gap-2 ">
        {
          userDetails && Object.entries(userDetails).map(([key, value]) => {
            return <div key={key}> <EnquiryDetail values={value} uuid={key} /></div>

          })
        }
      </div>
    </div>
  )
}

export default EnquiryDetails
