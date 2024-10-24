import { useContext, useEffect, useState } from "react";
import Photo from "./Photo";
import "../App.css";
import { Link } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { database } from "../utils/firebase";
import loader from "../assets/loader.svg";
import { UserContext } from "../contexts/UserContextProvider";

const Work = () => {
    const [isPhotosActive, setIsPhotosActive] = useState(true);
    const [graphicData, setGraphicData] = useState(null);

    const { user } = useContext(UserContext);

    useEffect(() => {
        const folderName = isPhotosActive ? "Photo" : "Video";
        const dataRef = ref(database, `${folderName}`);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setGraphicData(data);
        });
    }, [isPhotosActive]);

    return (
        <div>
            {
                <div>
                    {" "}
                    <div className="flex items-center justify-around">
                        <button
                            onClick={() => setIsPhotosActive(true)}
                            className={`hoverEffect sm:text-xl ${user ? "px-6 sm:px-10 py-1" : "px-14 sm:px-28 py-1"
                                } duration-300 rounded-md font-semibold ${isPhotosActive ? "bg-teal-700 text-white" : "bg-slate-300"
                                }`}
                        >
                            {" "}
                            <span className="z-10">Photo</span>{" "}
                        </button>
                        <button
                            onClick={() => setIsPhotosActive(false)}
                            className={`hoverEffect sm:text-xl ${user ? "px-6 sm:px-10 py-1" : "px-14 sm:px-28 py-1"
                                } duration-300 rounded-md font-semibold ${!isPhotosActive ? "bg-teal-700 text-white" : "bg-slate-300"
                                }`}
                        >
                            {" "}
                            <span className="z-10">video</span>{" "}
                        </button>
                        {user && (
                            <Link
                                to={"upload"}
                                className="sm:text-xl px-6 bg-sky-400 text-white sm:px-5 py-1 duration-300 rounded-md font-semibold"
                            >
                                Upload
                            </Link>
                        )}
                    </div>
                    {isPhotosActive ? (
                        <div className="w-full h-full">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-5 w-full h-full">
                                {!graphicData ? (
                                    <div className="col-span-full place-self-center	">
                                        <img className="w-20" src={loader} alt="" />
                                    </div>
                                ) : (
                                    Object.entries(graphicData).map(([key, value], index) => {
                                        return (
                                            <Photo
                                                key={key}
                                                value={value}
                                                uniqueID={key}
                                                index={index}
                                            />
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-center lg:justify-center gap-4 p-5 my-5">
                                <h1 className="text-lg text-slate-600">
                                    Videos are Under Construction
                                    <span className="text-red-700 text-5xl">.</span>
                                </h1>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Work;
