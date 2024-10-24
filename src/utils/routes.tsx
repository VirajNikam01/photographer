import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home.tsx";
import Layout from "../components/Layout.tsx";
import Login from "../components/Login.tsx";
import Upload from "../components/Upload.tsx";
import Error from "../components/Error.tsx";
import Contact from "../components/Contact.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import UpdatePhoto from "../components/UpdatePhoto.tsx";
import Protected from "../components/Protected.tsx";
import EnquiryDetails from "../components/EnquiryDetails.tsx";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/upload",
    element: (
      <Protected>
        <Upload />
      </Protected>
    ),
  },
  {
    path: "/update",
    element: (
      <Protected>
        <UpdatePhoto />
      </Protected>
    ),
  },
  {
    path: "/enquiry-details",
    element: <EnquiryDetails />,
  },
  {
    path: "/contact",
    element: (
      <div className="px-2">
        <Header />
        <Contact /> <Footer />
      </div>
    ),
  },
]);
