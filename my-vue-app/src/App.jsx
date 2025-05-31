import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
function App() {
  // State variables
  const [count, setCount] = useState(0);
  const [rand, setrand] = useState(0);
  const [seconds , setSeconds] = useState(0);
  const list = useMemo(() => [
    "Blue", "green", "purple", "orange", "red", "yellow", "pink", "brown", "black", "white", "cyan", "magenta", "lime", "teal", "navy", "maroon", "olive", "silver", "gold", "coral"
  ], []);
  
  const[color,setcolor] = useState('');
  const d=new Date();
  const countdown = () =>{
       const newRand = Math.floor(Math.random()*99)+1;
       setrand(newRand);

  }
// UseEffect
useEffect(() =>{
const interval = setInterval(() => {
  setSeconds(prev => prev + 1);
  const newcolor = list[Math.floor(Math.random() * list.length)];
  setcolor(newcolor);
}, 1000);
return () => clearInterval(interval);
},[list]);
//api 
const [data, setData] = useState('');
const [loading, setLoading] = useState(true);
const ApiUsing = async () => {
  setLoading(true);
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
      headers: { 'X-Api-Key': 'hq2BiY8oPsDhuiLxx66gNQ==WZ9bDSsHQgwZFYL9' }
    });
    const i = Math.floor(Math.random() * response.data.length);
    setData(response.data[i].quote);
  } catch (error) {
    console.log(error);
    setData('Failed to fetch quote.');
  } finally {
    setLoading(false);
  }
}
// Call API on mount
useEffect(() => {
  ApiUsing();
}, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={ApiUsing}>Generate</button>
      {loading ? <h3>Loading...</h3> : <h3>{data}</h3>}
      <div className="card">
        <button onClick={() => { setCount((count) => count + 1); countdown()}}>
          count is {count}
        </button>
        <p>Seconds : {seconds}</p>
        <p>
          Random number is {rand}
        </p>
        <div className="color-box" style={{ background: color}}></div>
          <button onClick={() => setSeconds(0)}>Reset Seconds</button>
        <p>
          Current time is {d.getHours()}:{d.getMinutes()}:{d.getSeconds()}
        </p>
        <p>
          Date is {d.getDate()}/{d.getMonth()+1}/{d.getFullYear()}
         </p>
         <p>
          {
            Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{list[i]} </span>
            ))
          }
         </p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
