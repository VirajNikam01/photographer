import { useContext, useState } from "react";
import Loader from "../assets/loader.svg";
import { UserContext } from "../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { database, storage } from "../utils/firebase";
import { ref, remove } from "firebase/database";
import FullLoader from "./FullLoader";

const Photo = ({
  value,
  index,
  uniqueID,
}: {
  key: any;
  value: any;
  index: number;
  uniqueID: any;
}) => {
  const [isDelete, setIsDelete] = useState(false)
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const updatePhoto = () => {
    navigate('/update', { state: [uniqueID, value] })
  }

  const deletePhoto = () => {
    setIsDelete(true)
    const strRef = storageRef(storage, `Photo/${uniqueID}`)
    const databaseRef = ref(database, `Photo/${uniqueID}`)

    deleteObject(strRef).then(() => {
      remove(databaseRef)
      setIsDelete(false)
    })
      .catch((err) => {
        setIsDelete(false)
        console.log(err);

      })
  }
if(isDelete) <FullLoader value = 'Deleting Photoss'/>
else
  return (
    <div
      className={`relative h-60 min-w-40 rounded-lg overflow-hidden bg-slate-200 ${index < 3
        ? "col-span-2 md:col-span-1 lg:col-span-2 "
        : ""
        } `}
    >
      <img
        src={value.data}
        alt={Loader}
        loading="lazy"
        className="w-full object-cover h-full hover:scale-105 duration-200"
      />
      {user && (
        <div className="absolute bottom-2 right-3 text-white text-xs flex gap-2">
          <button onClick={updatePhoto} className=" bg-purple-600 px-2 py-1 rounded-md">
            Update
          </button>
          <button onClick={deletePhoto} className=" bg-red-600 px-2 py-1 rounded-md">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Photo;
