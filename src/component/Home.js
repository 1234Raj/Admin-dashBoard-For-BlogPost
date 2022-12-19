import React ,{useState ,useEffect } from "react";
import { collection,getDocs } from "firebase/firestore";
// import { Link } from "react-router-dom";
import db from './../Firebase';
import './Home.css';
 
 
const Home = ( ) => {
     
    const [data, setData] = useState([]);

   useEffect(()=>{
     
    Fetchdata();
},[]);  

const Fetchdata = ()=>{
    getDocs(collection(db, "cities")).then((querySnapshot) => {
        
        // Loop through the data and store
        // it in array to display
        var data = [ ];
        querySnapshot.forEach(element => {
           
            data.push({...element.data(), id: element.id});
            
             
             
        });
        setData(data);
    })
}
    return (
        <div className="bg">
        <main className="layout">
    
        <section className="Example">
        
            <div className="title">
                <h2>Get Product</h2>
                {/* <h1>{props.name}</h1> */}
            </div>
            <div id="APIcards">
            {
                data.map((user, index) => {
                   
            return(
                <div className="cards row" key={index} >
        <div className="Images col-5" >
         <img src= { user.user.url} alt="img" />
        </div>
        <div className="Name-Price col-7" key={index}  >
        <p>{ user.user.Topic}</p>
            <p>{ user.user.Description1}</p>
            <h3> By :{user.user.name}</h3>
        </div>
         
    </div>
    )
            } )
            }
            </div>
        </section>
    </main>
    </div>
    );
}
export default Home;