import React,{useState,useEffect} from "react";
import { NavLink ,Link} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "./../Firebase";
import './Navbar.css';

const Navbar = () => {
  const [userEmail , setUseremail]= useState("");
  useEffect(()=>{
    
console.log(userEmail)
    auth.onAuthStateChanged((user)=>{
      // console.log(user);
      if (user){
        setUseremail(user.displayName);

      }else{
        setUseremail("");
      }
    })
  },[]);


 const SignOut = ()=>{
  const auth = getAuth();
  signOut(auth).then(() => {
    alert("Sign-out successful.")
  }).catch((error) => {
    // An error happened.
  });
 }
  return (

    <nav className="navbar navbar-expand-lg text-white   ">
      <NavLink className="navbar-brand" to="/">Blog<span>Post</span></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Add">PostBlog + </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">{userEmail}</NavLink>
          </li>
        </ul>

      </div>
      <Link type="button" className="btn btn-light mr-4" to="/" onClick={SignOut}>SignOut</Link>
    </nav>

  );
}
export default Navbar;