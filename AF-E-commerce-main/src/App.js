import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap-grid.css';
import './app.scss'
import SinglePro from "./Components/SingleProduct/SinglePro";
import ProductList from "./Components/ProductExplorer/ProductList";
import Register from "./Forms/Register";
import TandC from "./Components/CompanyPolicy/TandC";
import Returns from "./Components/CompanyPolicy/Returns"
import { UserAuthContextProvider } from "./Utils/AuthContext";
import CommonPage from "./Forms/CommonPage";
import Stores from "./Components/FindStores/Stores";
import Favourites from "./Components/Navbar/Favourites/Favourites";
import FaQ from "./Components/CompanyPolicy/FaQ";
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodCheckout from "./Components/Checkout/CodCheckout/CodCheckout";
import Success from "./Components/Success/Success"






const Layout = () => {

  return (
    <>

      <UserAuthContextProvider>
        <div className="app">
          <Navbar />
          <div className="container">
            <Outlet />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Slide}
            />
          </div>
          <Footer />
        </div>
      </UserAuthContextProvider>
    </>
  )
}

const router = createBrowserRouter([
  {
    // Path: "/policies",
    // element: <Policy />,
    // children: [
    // ],


    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/tandc",
        element: <TandC />
      },
      {
        path: "/return",
        element: <Returns />
      },

      {
        path: "/faq",
        element: <FaQ />
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <CommonPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/product/:id",
        element: <SinglePro />,
      },
      {
        path: "/category/:id",
        element: <ProductList />,
      },
      {
        path: "/stores",
        element: <Stores />,
      },
      {
        path: "/fav",
        element: <Favourites />,
      },
      {
        path: "/checkout",
        element: <CodCheckout />

      },
      {
        path: "/success",
        element: <Success />

      },


    ],
  },
]);

function App() {



  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
