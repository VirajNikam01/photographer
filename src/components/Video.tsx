import Loader from '../assets/loader.svg'


const Video = ({ value }: { value: any }) => {
    if (value.Type !== 'Video') return
    return (
        <div className=" h-40 min-w-64 bg-slate-500 rounded-lg cursor-pointer overflow-hidden relative">
            <img src={Loader} alt={Loader} className="h-full w-full " />
            <div className="cover h-full w-full bg-white z-10 absolute top-0 opacity-0 hover:opacity-40 duration-700"></div>
        </div>
    )
}

export default Video
