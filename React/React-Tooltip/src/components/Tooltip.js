
export default function Tooltip({position}){
    console.log(position);
    // const pos = ()=>{
    //     return {`tooltip {position}`};
    // }
    return (
        <div className={`tooltip ${position}`}>
            Thanks for Hovering! I'm a tooltip
        </div>
    )
}