import { useEffect, useState } from 'react';
import './App.css';
import Buttons from './components/Buttons';
import Hover from './components/Hover';


function App() {
  const [position, setPosition] = useState("up"); //The position state will hold the position of where to show the tooltip
  const [visibility, setVisibility] = useState(false); //visibility will control the visibility of the tooltip on hover
  
  useEffect(()=>{
    console.log("position is ",position);
  },[position])

  return (
    <div className="App">
      <Buttons setPosition={setPosition}/>
      <Hover position={position} visibility={visibility} setVisibility={setVisibility}/>
      
      
    </div>
  );
}

export default App;
