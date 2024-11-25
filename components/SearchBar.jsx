import React ,{useState} from 'react'
//use state hooks??
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css";
export const SearchBar = ({setResults} ) => {
    
    const [input,setInput] = useState("");
    
    // const fetch_Data = (value)=>{
    //     fetch("https://jsonplaceholder.typeicode.com/users").then((response)=> response.json()).then((json) =>{
    //         console.log(json);
    //     })
    //     .catch((error) => console.log("Error fetching data:",error));
    //     //fetch function is async function which returns value later on time due to which we have to chain .then which awaits for it's result and then execute any action
    // }

    //the above code wasn't working due to CORS => cross-origin Resource sharing
//     Your origin was your app (running at http://localhost:5173).
// The other origin was https://jsonplaceholder.typicode.com.
// The server (https://jsonplaceholder.typicode.com) did not include the Access-Control-Allow-Origin header, which is like a permission slip to allow cross-origin communication. Without this header, the browser blocked the request.

    const fetch_Data = (value) => {
        fetch("https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((json) => {
            //console.log(json);

            const results = json.filter((user)=>{
                return value && user && user.name && user.name.toLowerCase().includes(value) || user.name.includes(value);
            });
            setResults(results);

          })
          .catch((error) => console.error("Error fetching data:", error));
      };
      
      

    const handleChange =(value)=>{
        
        setInput(value);
        fetch_Data(value);
    }
  return (
    <div className="input_wrapper">
        <input type="text" className="" placeholder="Type to Search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
        <FaSearch id="search-icon"/> 
    </div>
  );
};



//component for searchBar functionality 