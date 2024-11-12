import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

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

function App() {
  const contextAuth = useContext(Context);
  let loggedIn: boolean = false;

  useEffect(() => {
    if(contextAuth){
      contextAuth.verifyToken();
    }
  }, [contextAuth]);
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={contextAuth?.auth ? <Home /> : <Login />} path="/" />
          <Route element={contextAuth?.auth ? <Home /> : <Register />} path="/register" />
          <Route element={contextAuth?.auth ? <Home /> : <Login />} path="/login" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
