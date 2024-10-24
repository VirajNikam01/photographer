import { ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { database } from "../utils/firebase";
import { generateUniqueId, getDateNTime } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";

const Contact = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  let setTimeOut: any = null;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handelConnectionForm = (event: any) => {
    event.preventDefault();
    if (loading) return;

    const currentDateTime = getDateNTime();

    setLoading(true);
    const databaseRef = ref(database, `enquiry/${generateUniqueId()}`);
    set(databaseRef, {
      ...customerDetails,
      ...currentDateTime,
      completed: false,
      working: false,
    })
      .then(() => {
        //reset
        setCustomerDetails({ name: "", email: "", message: "" });
        setSent(true);
        setLoading(false);

        setTimeOut = setTimeout(() => {
          setSent(false);
        }, 7000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    return clearTimeout(setTimeOut);
  }, []);

  return (
    <div
      id="#contact"
      className="w-full flex flex-col justify-start items-start my-8"
    >
      <form
        action=""
        onSubmit={handelConnectionForm}
        className=" pb-10 pt-5 rounded-md max-w-[800px] w-full"
      >
        <div className="w-full py-2">
          <div className="flex items-center justify-between">
            {" "}
            <h1 className="font-bold text-4xl text-teal-600">
              Get in Touch <span className="text-red-600 text-5xl">.</span>
            </h1>
            {user && (
              <button
                onClick={() => navigate("/enquiry-details")}
                className="px-3 sm:px-4 py-1 text-sm sm:text-base bg-purple-600 rounded-lg text-white hover:bg-red-500 duration-300"
              >
                View Enquiry's
              </button>
            )}
          </div>
          <h1 className="text-base my-3 font-semibold">
            Reach out to me today and let's start a conversation about your
            project or inquiry!
          </h1>
        </div>
        <div className="w-full py-2">
          <label htmlFor="name" className="px-1 text-slate-700">
            Full Name
          </label>
          <input
            required
            id="name"
            type="text"
            value={customerDetails.name}
            onChange={(event) =>
              setCustomerDetails({
                ...customerDetails,
                name: event.target.value,
              })
            }
            placeholder="Enter your full name"
            className="w-full font-normal rounded-lg px-2 py-1 outline-teal-600 border-slate-300 border"
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="email" className="px-1 text-slate-700">
            Email
          </label>
          <input
            required
            id="email"
            type="email"
            value={customerDetails.email}
            onChange={(event) =>
              setCustomerDetails({
                ...customerDetails,
                email: event.target.value,
              })
            }
            placeholder="Enter your email address"
            className="w-full  font-normal rounded-lg px-2 py-1 outline-teal-600 border-slate-300 border"
          />
        </div>
        <div className="w-full py-2">
          <label htmlFor="message" className="px-1 text-slate-700">
            Message
          </label>
          <textarea
            required
            id="message"
            value={customerDetails.message}
            onChange={(event) =>
              setCustomerDetails({
                ...customerDetails,
                message: event.target.value,
              })
            }
            placeholder="Tell me more about your project needs and timeline "
            className="w-full  font-normal rounded-lg px-2 pt-1 outline-teal-600 border-slate-300 border"
          />
        </div>
        <h1
          className={`text-green-800 text-sm opacity-0 select-none ${sent && "opacity-100"
            }`}
        >
          Message sent, we will get in touch with you soon!
        </h1>
        <div className="w-full pb-2">
          <button className="bg-teal-500 px-5 py-1 text-white rounded-md hover:bg-red-400 duration-300">
            {!loading ? "Send 💌" : "Sending 🔐"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
