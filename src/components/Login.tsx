import { useContext, useRef, useState } from "react"
import Header from "./Header"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebase"
import { UserContext } from "../contexts/UserContextProvider"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [errMsg, setErrMsg] = useState(false)
    const [loading, setLoading] = useState(false)
    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()

    const { updateUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handelSignInUp = (event: any) => {
        event.preventDefault()
        if (loading) return
        setLoading(true)
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateUser(user)
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
                setErrMsg(true)
                setLoading(false)
            })

    }

    return (
        <div className=" h-full w-full overflow-hidden px-3 ">
            <Header />
            <div className="flex items-center justify-center flex-col font-[gilroy] select-none h-full -mt-20 sm:-mt-14">
                <h1 className="text-2xl mb-3 font-bold text-teal-900">Admin Login <span className="text-4xl text-red-700">.</span></h1>
                <form
                    action=""
                    className="bg-sky-100 px-5 py-10 sm:p-10 rounded-xl flex gap-4 flex-col max-w-xl w-full backdrop-blur-xl shadow-xl m-5 lg:m-0"
                    onSubmit={handelSignInUp}
                >
                    <h1 className="text-2xl font-extrabold text-teal-800">
                        SignIn
                        <span className="text-red-700 font-extrabold m-[2px] text-3xl">
                            .
                        </span>
                    </h1>
                    <div>
                        <input
                            type="email"
                            placeholder="email address"
                            className="px-3 py-1 rounded-md outline-white w-full md:w-fit"
                            ref={emailRef}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            className="px-3 py-1 rounded-md outline-white w-full md:w-fit"
                            ref={passwordRef}
                        />
                    </div>
                    {errMsg && (
                        <div>
                            <h2 className="text-red-600 text-sm">{errMsg}</h2>
                        </div>
                    )}
                    <div>
                        <input
                            type="submit"
                            value={!loading ? ("Sign In") : "loading..."}
                            className={`${loading
                                ? "pointer-events-none bg-slate-700 text-slate-200 text-sm px-6"
                                : ""
                                }  bg-teal-600 px-3 py-1 rounded-md text-white cursor-pointer hover:bg-black duration-500`}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
