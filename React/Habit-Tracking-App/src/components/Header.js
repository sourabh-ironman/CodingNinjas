import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { headerAction } from "../redux/reducers/headerReducer";
import { useEffect } from "react";

export function Header(){
    const dispatch = useDispatch();
    const showHomePage = useSelector((state)=>{
        // console.log('state showHomePage from Header ',state.headerReducer.showHomePage);
        return state.headerReducer.showHomePage;
    });
    const navigate = useNavigate();
    console.log('')

    useEffect(()=>{
        showHomePage ? navigate('/') : navigate('/calendarView');
    },[showHomePage])

    return (
        <>
            <div className="navbar">
                <h1> HABIT TRACKER</h1>
                <button onClick={()=> dispatch(headerAction.toggle())}>Toggle View</button>
            </div>
            <hr/>
            <Outlet/>
        </>
    )
}