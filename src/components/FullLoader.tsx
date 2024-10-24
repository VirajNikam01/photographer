import Loader from '../assets/loader.svg'

const FullLoader = ({ value }: { value: string }) => {
    return (
        <div className='w-full h-full flex items-center justify-center flex-col relative px-3'>
            <div className='absolute top-24 flex items-center justify-center flex-col'>
                <h1 className='text-2xl font-bold'>{value} <span className='text-5xl text-red-600'>.</span></h1>
                <p className='text-slate-800 text-sm text-center my-3'>We do not compress the size of Image or Video, which will not downgrade your work quality, this is wht the process can take time</p>
            </div>
            <img src={Loader} alt="" />
        </div>
    )
}

export default FullLoader
