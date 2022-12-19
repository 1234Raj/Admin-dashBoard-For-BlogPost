import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import './UserSignUp.css';
// import {userId  } from "./../Firebase";
// import { auth } from "./../Firebase";

const SignUp = () => {

    const Navigate = useNavigate();
    const uuid = uuidv4();

    const [user, setAddUser] = useState({
        name: "",
        email: "",
        email1: "",
        password: "",
        password1: "",
    });

    const [password12, setPassword12] = useState("");
    const [email12, setEmail12] = useState("");
    const [error, setErroer] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        const filedName = e.target.name;
        const filedValue = e.target.value;


        setAddUser({ ...user, [filedName]: filedValue });
        if (user.password === user.password1) {
            setPassword12("Password Matched")
        } else {
            setPassword12("Password Not Matched")
        }
        if (user.email === user.email1) {
            setEmail12("Email Matched")
        } else {
            setEmail12("Email Not Matched")
        }

    };
    //This is for disabled a button
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    //this is for Submit a data
    const submitData = (event) => {
        event.preventDefault();

        // check all fields is fill or not
        if (!user.name || !user.email || !user.email1 || !user.password || !user.password1) {
            setErroer("Fill all fields");
            setSubmitButtonDisabled(false);
            return;
        }
        setErroer("");
        setSubmitButtonDisabled(true);
        //function for signup authentication
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                // Signed in 
                setSubmitButtonDisabled(false);
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: user.name,
                });

                console.log(user.name);
                Navigate("/Home");
                // ...

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSubmitButtonDisabled(false);
                // ..
                console.log(errorCode);
                alert(errorMessage);

            });

        //this is for sending a data in realtime database
        const db = getDatabase();

        set(ref(db, 'users/' + uuid), {
            username: user.name,
            email: user.email,
            password: user.password,
        })
            .then(() => {
                alert("Data saved successfully!")
            })
            .catch((error) => {
                // The write failed...
            });
    }
    return (
        <>
            <section className="signup">
                <div className="Head">
                    <h1>SignUp</h1>
                    <h3>Already have an account?<Link to="/Login"><span>Log In</span></Link></h3>
                </div>
                <form className="form">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">FullName</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="name"
                            value={user.name}
                            onChange={handleChange}  ></input>
                        <div id="emailHelp" className="form-text">Given Your Full Name.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                            value={user.email}
                            onChange={handleChange}  ></input>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Conform Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" name="email1"
                            value={user.email1}
                            onChange={handleChange}></input>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        <b className="eroor">{email12}</b>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                            value={user.password}
                            onChange={handleChange}></input>
                        <div id="emailHelp" className="form-text">Password Must be Min 6 to Max 16 character.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Conform Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" name="password1"
                            value={user.password1}
                            onChange={handleChange}></input>
                        <div id="emailHelp" className="form-text">Password Must be Min 6 to Max 16 character.</div>
                        <b className="eroor">{password12}</b>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className=" form-label" for="exampleCheck1">By continuing, you agree to ShopingMall's Terms of Use and Privacy Policy.</label>
                    </div>
                    <b className="eroor">{error}</b>
                    <button type="submit" className="btn " onClick={submitData} disabled={submitButtonDisabled}>SignUp</button>
                </form>
            </section>
        </>
    );
}
export default SignUp;