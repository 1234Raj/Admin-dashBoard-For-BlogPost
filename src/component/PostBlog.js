import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import db from './../Firebase';
import './PostBlog.css';

const BlogPost = () => {

    const Navigate = useNavigate();
    const [user, setAddUser] = useState({
        name:"",
        url: "",
        Topic:"",
        Description1: "",
    });

    const [error, setErroer] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        const filedName = e.target.name;
        const filedValue = e.target.value;
        setAddUser({ ...user, [filedName]: filedValue });
    };


    const submitData = async (event) => {
        event.preventDefault();

        console.log(user);
        if (!user.name || !user.url || !user.Topic || !user.Description1) {
            setErroer("Fill all fields");
            return;
        }
        setErroer("");

        // Add a new document with a generated id.
        await addDoc(collection(db, "cities"), {
            user
        }).then(() => {
            alert("Data Saved Successfully");
            Navigate("/Home");
        })
            .catch((error) => {
                // The write failed...
            });
    };

    return (
        <div className="bg4">
            <main className="layout1">

                <section className="BlogPost">

                    <div className="title">
                        <h2>Add BlogPost</h2>
                    </div>
                    <div id="APIcards">
                        <form className="form1">
                        <div className="mb-3">
                                <label for="exampleInputtext1" className="form-label">Title of Topic</label>
                                <input type="text" className="form-control" id="exampleInputtext2" aria-describedby="textHelp" name="Topic"
                                    value={user.Topic}
                                    onChange={handleChange}></input>
                                <div id="textHelp" className="form-text">Here Write a Name of Topic</div>
                                </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Enter a Price of Products</label>
                                <input type="text" className="form-control" id="exampleInputPrice1" name="name"
                                    value={user.name}
                                    onChange={handleChange}></input>
                                <div id="textHelp" className="form-text">Here Write a Price  of Products</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputtext1" className="form-label">Image URl</label>
                                <input type="url" className="form-control" id="exampleInputtext1" name="url"
                                    value={user.url}
                                    onChange={handleChange}  ></input>
                                <div id="textHelp" className="form-text">Here Add a url of image</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Enter About  of product</label>
                                <textarea rows="4" cols="50" type="Description" className="form-control" id="exampleinputtextareaDescription" name="Description1"
                                    value={user.Description1}
                                    onChange={handleChange}></textarea>
                                <div id="textHelp" className="form-text">Enter About  of product</div>

                            </div>

                            <b className="eroor">{error}</b>
                            <button type="submit" className="btn " onClick={submitData}  >BlogPost</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>);

}
export default BlogPost;