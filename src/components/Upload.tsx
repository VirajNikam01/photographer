import { useState } from "react"
import Header from "./Header"
import { ref, set } from "firebase/database"
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import { database, storage } from '../utils/firebase'
import { generateUniqueId } from "../utils/helper"
import { useNavigate } from "react-router-dom"
import FullLoader from "./FullLoader"

const Upload = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [Phototype, setPhotoType] = useState<boolean>(true)
    const [inputVal, setInputVal] = useState<any>()
    const [description, setDescription] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [thumbnail, setThumbnail] = useState<any>()

    const navigate = useNavigate()


    const handelUpload = async (event: any) => {
        event.preventDefault()
        if (isUploading) return




        setIsUploading(true)
        const folderName = Phototype ? 'Photo' : 'Video'
        const uniqueID = generateUniqueId()

        const strRef = storageRef(storage, `${folderName}/${uniqueID}`)
        await uploadBytes(strRef, inputVal[0])
        const dataURL = await getDownloadURL(strRef)

        let thumbnailURL = null;
        if (!Phototype) {
            const thumbRef = storageRef(storage, `Thumbnail/${uniqueID}`)
            await uploadBytes(thumbRef, thumbnail[0])
            thumbnailURL = await getDownloadURL(thumbRef)
        }

        const uploadRef = ref(database, `${folderName}/${uniqueID}`)
        set(uploadRef, {
            Type: Phototype ? 'Photo' : 'Video',
            data: dataURL,
            location: location,
            description: description,
            thumbnail: thumbnailURL
        }).then(() => {
            navigate('/')
        })
            .catch((error) => {
                console.log(error);
                setIsUploading(false)
            })

    }


if(isUploading) return <FullLoader value={'Uploading Photo'}/>
else
    return (
        <div className="w-full h-full px-3  ">
            <Header />
            <div id="center" className="flex items-center justify-center flex-col -mt-10 h-full">
                <h1 className="text-sky-500 font-bold text-xl select-none mb-6">Upload {Phototype ? 'Photo' : 'Video'}<span className="text-red-700 text-3xl">.</span></h1>
                <form onSubmit={handelUpload} action="" className="px-5 py-4 bg-slate-100 rounded-xl shadow-lg max-w-[500px] w-full">
                    <div className="my-5 select-none">
                        <h1 className="my-3">Type:-</h1>
                        <div onClick={() => setPhotoType(true)} className={`px-3 py-1 rounded-sm inline-block cursor-pointer ${Phototype ? 'bg-teal-200 ' : 'duration-300 hover:bg-slate-200 mx-5'} `}>Photo</div>
                        <div onClick={() => setPhotoType(false)} className={`px-3 py-1 rounded-sm inline-block cursor-pointer ${!Phototype ? 'bg-teal-200 ' : 'duration-300 hover:bg-slate-200 mx-5'} `}>Video</div>
                    </div>

                    <div className="my-5">
                        <h1>{Phototype ? 'Photo' : 'Video'}</h1>
                        <input type="file" accept={`${Phototype ? '.JPEG, .jpg' : '.mp4, .webm, .mkv, '}`} required onChange={(event) => {
                            const file = event.target.files
                            setInputVal(file)
                        }} />
                    </div>
                    {!Phototype && <div className="my-5">
                        <h1>Thumbnail</h1>
                        <input type="file" accept='.JPEG, .jpg' required onChange={(event) => {
                            const file = event.target.files
                            setThumbnail(file)
                        }} />
                    </div>}
                    <div className="my-5">
                        <input type="text" placeholder="Location" className="w-full outline-none border rounded-md px-3 py-1" onChange={(event) => setLocation(event.target.value)} required />
                    </div>

                    <div className="my-5">
                        <input type="text" placeholder={`${Phototype ? 'Describe Photo' : 'Describe Video'}`} className="w-full outline-none border rounded-md px-3 py-1 text-start" onChange={((event) => setDescription(event.target.value))} />
                    </div>
                    <div className="my-5">
                        <button className="bg-teal-600 text-white px-4 py-1 rounded-md hover:bg-red-400 duration-500">{isUploading ? 'Loading...' : 'Upload'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Upload
