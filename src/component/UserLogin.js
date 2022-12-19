import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {

    const Navigate = useNavigate();
    const [user, setAddUser] = useState({
        email: "",
        password: "",

    });

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [error, setErroer] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        const filedName = e.target.name;
        const filedValue = e.target.value;


        setAddUser({ ...user, [filedName]: filedValue });
    };
// For Login  Data Submit
    const submitData = (event) => {
        event.preventDefault();


        if (!user.email || !user.password) {
            setErroer("Fill all fields");
            return;
        }
        setErroer("");
        setSubmitButtonDisabled(true);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                // Signed in 
                setSubmitButtonDisabled(false);
                const users = userCredential.user;
                console.log(users);
                // ...
                Navigate("/Home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSubmitButtonDisabled(false);
                // ..
                console.log(errorCode);
                alert(errorMessage);

            });
    }
    return (
        <>
            <signup className="signup">
                <div className="Head"><h1>Sign In</h1>
                </div>
                <form className="form">

                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"
                            value={user.email}
                            onChange={handleChange}  ></input>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                            value={user.password}
                            onChange={handleChange}></input>
                        <div id="emailHelp" className="form-text">Password Must be Min 6 to Max 16 character.</div>
                    </div>
                    <div className="my-3">
                        <label className="form-check-label" for="exampleCheck1">By continuing, you agree to ShopingMall's Terms of Use and Privacy Policy.</label>
                    </div>
                    <b className="Error">{error}</b>
                    <button type="submit" className="btn  " onClick={submitData} disabled={submitButtonDisabled}>Submit</button>
                </form>
            </signup>
        </>
    );
}
export default Login;