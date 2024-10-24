import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { database, storage } from '../utils/firebase'
import { ref, update } from "firebase/database";
import FullLoader from "./FullLoader";

const UpdatePhoto = () => {
    const [data, setData] = useState<any>(null);
    const [isUpdating, setIsUpdating] = useState(false)
    const location = useLocation();
    const [uniqueID, value] = location.state;

    const navigate = useNavigate()

    useEffect(() => {
        setData({
            uniqueID: uniqueID,
            type: value.Type,
            data: null,
            description: value.description,
            location: value.location,
        });
    }, []);


    const handelUpdate = async (event: any) => {
        event.preventDefault()
        if (isUpdating) return
        setIsUpdating(true)

        const strRef = storageRef(storage, `Photo/${data.uniqueID}`)
        const dataRef = ref(database, `Photo/${data.uniqueID}`)

        let imageURL = value.data
        if (data.data) {
            await uploadBytes(strRef, data.data)
            imageURL = await getDownloadURL(strRef)
        }

        update(dataRef, {
            Type: data.type,
            data: imageURL,
            description: data.description,
            location: data.location,
        }).then(() => {
            navigate('/')
        }).catch((err) => {
            console.log(err);
            setIsUpdating(false)
            navigate('/update')

        })


    }

    if (!data) return
    if (isUpdating) return <FullLoader value={'Updating Photo'} />

    else return (
        <div className="w-full h-full px-3  ">
            <Header />
            <div id="center" className="flex items-center justify-center flex-col -mt-10 h-full">
                <h1 className="text-sky-500 font-bold text-xl select-none mb-6">Update<span className="text-red-700 text-3xl">.</span></h1>
                <form onSubmit={handelUpdate} action="" className="px-5 py-4 bg-slate-100 rounded-xl shadow-lg max-w-[500px] w-full">
                    <div className="my-5">
                        <h1>Photo</h1>
                        <input type="file" accept='.JPEG, .jpg' required onChange={(event) => {
                            const file = event.target.files
                            setData({ ...data, data: file ? file[0] : null })
                        }} />
                    </div>

                    <div className="my-5">
                        <input type="text" placeholder="Location" className="w-full outline-none border rounded-md px-3 py-1" value={data.location} onChange={(event) => setData({ ...data, location: event.target.value })} required />
                    </div>

                    <div className="my-5">
                        <input type="text" placeholder='Describe' className="w-full outline-none border rounded-md px-3 py-1 text-start" value={data.description} onChange={((event) => setData({ ...data, description: event.target.value }))} />
                    </div>
                    <div className="my-5">
                        <button className="bg-teal-600 text-white px-4 py-1 rounded-md hover:bg-red-400 duration-500">{isUpdating ? 'Loading...' : 'Upload'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePhoto;
