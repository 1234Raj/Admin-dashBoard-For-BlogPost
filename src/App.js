import React  from "react";
import Home from './component/Home';
 import PostBlog from './component/PostBlog';
//  import ProductList from './component/ProductList';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import UserSignUp from './component/UserSignUp';
import UserLogin from './component/UserLogin';
import LandingPage from './component/LandingPage';
// import Home1 from './component/Home1';
// import Home2 from './component/Home2';
import View from "./component/Admin/View";
import Dashboard from "./component/Admin/Dashboard";
import './App.css';
import Navbar from "./component/Navbar";

import AdminLogin from "./component/Admin/AdminLogin";
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

// import "./component/layout/Navbar.css";


function App() {
  
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<LandingPage/>} />
          <Route  path="/Login" element={<UserLogin/>} />
          <Route  path="/signup" element={<UserSignUp/>} />
          <Route  path="/admin" element={<AdminLogin/>} />
          <Route  path="/Dashboard/:id" element={<Dashboard/>} />
          <Route  path="/Home" element={<><Navbar  /><Home /></>} />
          <Route  path="/Add" element={<PostBlog/>} />
          {/* <Route  path="/Edit" element={<ProductList/>} /> */}
          {/* <Route  path="/Next" element={<><Navbar  /><Home1/></>} /> */}
          <Route  path="/View/:id" element={<View/>} />
          {/* <Route  path="/Home2/:id" element={<Home2/>} /> */}
        </Routes>
      </BrowserRouter>
       


    </>
  );
}

export default App;
