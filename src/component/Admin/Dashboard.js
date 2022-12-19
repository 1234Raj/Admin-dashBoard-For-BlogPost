import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from './../../Firebase';
import { ref, onValue } from "firebase/database";
import { doc, deleteDoc } from "firebase/firestore";
import './Dashboard.css';
import { database } from "./../../Firebase";
// import {    useParams } from "react-router-dom";
 

const Dashboard = () => {
  // userList and get from realtime Database
  const [listUsers, setListUsers] = useState([]);

  const [searchdata, setSearch] = useState([]);

  const [filterValue, setFilterVlaue] = useState('');

  const handlefilter = (e) => {

    if (e.target.value === '') {
      setListUsers(searchdata);
    } else {
      const filterResult = searchdata.filter(user => JSON.stringify(user.username).includes(e.target.value));
      setListUsers(filterResult);
    }
    setFilterVlaue(e.target.value);
  }


  useEffect(() => {
    // const db = getDatabase( );
    let ListData = [];
    const dbRef = ref(database, 'users');
    onValue(dbRef, (snapshot) => {
      // setListUsers(data.val());
      snapshot.forEach(childSnapshot => {
        let Data = childSnapshot.val();
        ListData.push(Data);
      });
      setListUsers(ListData);
      setSearch(ListData);
    });
  }, []);
  //data get from firestore
  const [data, setData] = useState([]);

  useEffect(() => {

    Fetchdata();
  }, []);

  const Fetchdata = () => {
    getDocs(collection(db, "cities")).then((querySnapshot) => {

      // Loop through the data and store
      // it in array to display
      var data = [];
      querySnapshot.forEach(element => {

        data.push({ ...element.data(), id: element.id });



      });
      setData(data);
    })
  }
//delete function of firestore database
 
 
const DeleteField =async (id)=>{
  await deleteDoc(doc(db, "cities", id));
   

 
};

  return (
    <>
      <div className="bg2">
        <nav className="navbar1 sticky-top">
          <div className="head-navbar1">
            <div className="logo"><a href="#">Dashboard<i className="fa fa-cart-arrow-down"></i></a></div>
            <ul className="menu">
              <li className="menu-btn">Home </li>
              <li className="menu-btn">About </li>
              <li className="menu-btn">Contact </li>
              <Link to='/'><li className="menu-btn">LogOut </li></Link>
            </ul>
          </div>

        </nav>
        <div className="container mt-5"><input type='search' className="Search" placeholder="Search" value={filterValue} onChange={(e) => handlefilter(e)}></input></div>
        <div className="container mt-5 pt-5">
          <div className="py-4">
            <table className="table">
              <thead class="thead-white">
                <tr className="bg-light text-dark">
                  <th scope="col">ID</th>
                  <th scope="col">FullName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  listUsers.map((user, index) => {

                    return (
                      <tr className="text-white" key={index}>
                        <th scope="row"  >{index + 1}</th>
                        <td>{user.username} </td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>

                          <Link className="btn btn-outline-primary m-2 "   >Delete</Link>
                          {/* <Link className="btn btn-outline-primary m-2" onClick={()=>deleteData}>Delete</Link> */}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg2">
        <main className="layout2">

          <section className="Example3">

            <div className="title3">
              <h2>Admin Blog View</h2>
              {/* <h1>{props.name}</h1> */}
            </div>
            <div id="APIcards3">
              {
                data.map((user, index) => {

                  return (
                    <div className="cards3 row" key={index} >
                      <div className="Images col-4" >
                        <img src={user.user.url} alt="img" />
                      </div>
                      <div className="Name-Price col-8" key={index}  >
                      <p>{user.user.Topic}</p>
                        <p>{user.user.Description1}</p>
                        <p>BY:{user.user.name}</p>
                        <Link to='/Dashboard/`${user.id}`'><button onClick={()=>DeleteField}   >Delete</button></Link> 
                      </div>
                       
                    </div>
                  )
                })
              }
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;