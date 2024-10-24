import { useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContextProvider"
import { useNavigate } from "react-router-dom"

const Protected = ({ children }: { children: any }) => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])


    return children
}

export default Protected
