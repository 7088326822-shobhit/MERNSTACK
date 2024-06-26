import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from "./common/Common";
import { useEffect, useState } from "react";
import Context from "./context/Context";
import {useDispatch} from "react-redux"
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch()

  const [countCartProduct, setCountCartProduct] = useState(0)

   const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.current_user.url,{
        method: SummaryApi.current_user.method,
        credentials: 'include'
   })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }

    console.log("data-user", dataResponse);
   }

   const fetchUserAddToCart = async() => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
 })

  const dataApi = await dataResponse.json()

  

  console.log("dataApi", dataApi);
  setCountCartProduct(dataApi?.data?.count)

   }

   useEffect(() => {
    //user details
    fetchUserDetails();

    //addtocart details

    fetchUserAddToCart()
   },[])

  return (
    <>
    <Context.Provider value={{
     fetchUserDetails, // user details fetch
     countCartProduct, // current user add to cart product count
     fetchUserAddToCart 
    }}>
    <ToastContainer 
      position="top-center"
    />
    
    <Header/>
    <main className="min-h-[calc(100vh-120px)] pt-16">
      <Outlet/>
      </main>
      <Footer/>
      </Context.Provider>
    </>
  
  );
}

export default App;
