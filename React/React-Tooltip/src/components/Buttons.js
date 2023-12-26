
export default function Buttons({setPosition}){
    return (
        <div className="buttons">
            <button onClick={()=>setPosition("up")}>Up</button>
            <button onClick={()=>setPosition("bottom")}>Bottom</button>
            <button onClick={()=>setPosition("left")}>Left</button>
            <button onClick={()=>setPosition("right")}>Right</button>
        </div>
    )
}