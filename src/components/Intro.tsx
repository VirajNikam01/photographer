import { useContext, useEffect, useState } from "react";
import "../App.css";
import { UserContext } from "../contexts/UserContextProvider";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "../utils/firebase";
import { onValue, ref, set } from "firebase/database";
import Loader from "../assets/loader.svg";

const Intro = ({ name }: { name: string }) => {
  const [URL, setURL] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const { user } = useContext(UserContext);

  const getProfilePhoto = () => {
    const databaseRef = ref(database, `ProfilePhoto/1`);
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setURL(data.profilePhoto);
    });
  };

  const uploadProfilePhoto = async (event: any) => {
    if (isLoading) return;
    setIsLoading(true);
    const file = event.target.files;
    const strRef = storageRef(storage, `ProfilePhoto/1`);
    const databaseRef = ref(database, "ProfilePhoto/1");

    await uploadBytes(strRef, file[0]);
    const imageURL = await getDownloadURL(strRef);

    set(databaseRef, {
      profilePhoto: imageURL,
    }).then(() => {
      setIsLoading(false);
      getProfilePhoto();
    });
  };

  useEffect(() => {
    getProfilePhoto();
  }, []);

  return (
    <div
      className={` py-6 sm:py-12 flex items-center justify-center flex-col select-none`}
    >
      <div
        id="container"
        className="relative radiusAnim flex items-center justify-center"
      >
        <div
          id="imgContainer"
          className=" w-full h-full rounded-full flex items-center justify-center overflow-hidden"
        >
          {isLoading ? (
            <img
              className="h-full w-full  object-contain"
              src={Loader}
              alt=""
            />
          ) : (
            <img
              src={URL}
              alt="img"
              className="h-full w-full  object-center  object-cover"
            />
          )}
        </div>
        {user && (
          <div
            id="camera-icon"
            className="w-10 h-10 rounded-full bg-slate-300 flex items-start justify-center absolute bottom-0 right-5 text-3xl hover:bg-purple-600 duration-200"
          >
            📸
          </div>
        )}
        {user && (
          <input
            type="file"
            onChange={(event) => uploadProfilePhoto(event)}
            className="z-40 w-full h-full absolute opacity-0"
          />
        )}
      </div>

      <h2 className="text-xl ">Hello, I'm {name}</h2>
      <p>Pune based travel Film-Maker & designer.</p>
    </div>
  );
};

export default Intro;
