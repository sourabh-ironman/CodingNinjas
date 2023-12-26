
import Tooltip from "./Tooltip";

export default function Hover({position, visibility, setVisibility}){
    return (
        <div className="hover-and-tooltip">
            <div className="hover" 
                onMouseEnter={()=>setVisibility(true)}
                onMouseLeave={()=>setVisibility(false)}>
                Hover over me!
            </div>            
                {
                    visibility &&
                    <Tooltip position={position}/>
                }            
        </div>
    )
}