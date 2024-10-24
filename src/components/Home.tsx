import { useContext, useEffect } from "react";
import Intro from "./Intro";
import { userDetailsContext } from "../contexts/UserDetailsContextProvider";
import Work from "./Work";
import About from "./About";
import Contact from "./Contact";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { UserContext } from "../contexts/UserContextProvider";

const Home = () => {
  const { name } = useContext(userDetailsContext);

  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUser(user);
      } else {
        updateUser(null);
      }
    });
  }, []);

  return (
      <div >
        <Intro name={name} />
        <Work />
        <hr />
        <About />
        <hr />
        <Contact />
      </div>

  );
};

export default Home;
