import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const Logout = () => {

    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext)

    const handelSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Logout Success');
                navigate('/')
                updateUser(null)
            })
            .catch(() => {

            })
    }
    return (
        <div onClick={handelSignOut} className="text-red-700 hover:text-purple-600 hover:font-bold duration-300 cursor-pointer rounded-md">
            <h1>Logout</h1>
        </div>
    )
}

export default Logout
