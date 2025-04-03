import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom/client";

function PasswordGenerator(){

    const [password,setPassword] = useState("");
    const [symbol,setSymbol] = useState(false);
    const [number,setNumber] = useState(false);
    const [length,setLength] = useState(8);
    const [history,setHistory] = useState([]);

    const generatePassword = () =>{
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(symbol){
            str += "`~!@#$%^&*()+-{}[]";
        }
        if(number){
            str += "0123456789";
        }

        let pass = "";
        for(let i=0; i<length; i++){
            pass += str[Math.floor(Math.random()*str.length)];
        }
        setPassword(pass);
        setHistory([pass,...history.slice(0,4)]); // store the last 5 password
    }

    useEffect(()=>{
        generatePassword();
    },[length,symbol,number]);

    return(
        <div>
            <h1>Password is : {password}</h1>
            <div>
                <label>Length : {length}
                    <input type="range" value={length} min={8} max={15} onChange={(e)=> setLength(Number(e.target.value))}/>
                </label>                
                <label>Symbol
                    <input type="checkbox" checked={symbol} onChange={() => setSymbol(!symbol)}/>
                </label>
                <label>Number
                    <input type="checkbox" checked={number} onChange={() => setNumber(!number)}/>
                </label>
            </div>
            <button onClick={generatePassword}>Generate Password</button>
             {/* Display Password History */}
             <div>
                <h3>Last 5 Passwords:</h3>
                <ul>
                    {history.map((pass, index) => (
                        <li key={index}>{pass}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<PasswordGenerator></PasswordGenerator>);