import "./App.css";
import { useEffect } from "react";
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import WebFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  });
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
