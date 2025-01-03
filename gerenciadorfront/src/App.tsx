import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// pages
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";

//context
import { useContext, useEffect } from "react";
import { Context } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Sell from "./pages/sell/Sell";
import AddProducts from "./pages/addProducts/AddProducts";
import DeleteProducts from "./pages/deleteProducts/DeleteProducts";
import Cart from "./pages/cart/Cart";
import GetSell from "./pages/getSell/GetSell";

function App() {
  const contextAuth = useContext(Context);

  useEffect(() => {
    if(contextAuth){
      contextAuth.verifyToken();
    }
  }, [contextAuth]);
  
  return (
    <>
      <ReactNotifications/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={contextAuth?.auth ? <Home /> : <Login />} path="/" />
          <Route element={contextAuth?.auth ? <Home /> : <Register />} path="/register" />
          <Route element={contextAuth?.auth ? <Home /> : <Login />} path="/login" />
          <Route element={contextAuth?.auth ? <Sell /> : <Login />} path="/sell" />
          <Route element={contextAuth?.auth ? <AddProducts /> : <Login />} path="/addproducts" />
          <Route element={contextAuth?.auth ? <DeleteProducts /> : <Login />} path="/deleteproducts" />
          <Route element={contextAuth?.auth ? <Cart /> : <Login />} path="/cart" />
          <Route element={contextAuth?.auth ? <GetSell /> : <Login />} path="/getsell" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
