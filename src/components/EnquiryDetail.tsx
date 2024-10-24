import { ref, update } from "firebase/database";
import { database } from "../utils/firebase";


type customerDetails = {
    name: string;
    email: string;
    message: string;
    date: string;
    time: string;
    day: string;
    working: boolean;
    completed: boolean;
};
const EnquiryDetail = ({ values, uuid }: any) => {
    const {
        name,
        email,
        message,
        date,
        time,
        day,
        completed,
    }: customerDetails = values;


    const handelCompleteTask = () => {
        const taskCompleted = true;

        const databaseRef = ref(database, `enquiry/${uuid}`)
        update(databaseRef, {
            name,
            email,
            message,
            date,
            time,
            day,
            completed: taskCompleted,
        })
    }


    return (
        <div className={`w-full h-full my-2 px-5 py-2  rounded-md ${completed ? 'bg-slate-200 text-slate-700' : 'bg-sky-400 text-white'} `}>
            <div className="info flex items-center justify-between">
                <div>
                    <h1 className="text-slate-800">Name:-</h1>
                    <h1>{name}</h1>
                </div>
                <div>
                    <h1 className="text-slate-800">Email:-</h1>
                    <h1>{email}</h1>
                </div>
            </div>
            <div className="msg my-3">
                <h1 className="text-slate-800">Message:-</h1>
                <p>{message}</p>
            </div>
            <hr />
            <div className="dateNtime text-sm flex items-center justify-between text-slate-700">
                <h1>{date}</h1>
                <h1>{time}</h1>
                <h1>{day}</h1>
            </div>

            {!completed && <button onClick={handelCompleteTask} className="bg-teal-700 mt-5 px-6 py-1 rounded-lg text-sm hover:bg-red-500 duration-300">completed</button>}
        </div>
    );
};

export default EnquiryDetail;
