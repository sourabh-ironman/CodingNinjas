import styles from "../styles/calendarView.module.css";
import { useSelector, useDispatch } from "react-redux";
import { calendarActions } from "../redux/reducers/calendarReducer";

export function CalendarView(){
    const todayDate = new Date();
    let sevenDays = [];
    let dateToAdd = todayDate;
    for(let i=6; i>=0; i--){
        dateToAdd = todayDate - (i*24*3600*1000);
        let dateString = new Date(dateToAdd).toString().substring(0, 11);
        sevenDays.push({
            day: dateString.substring(0,4),
            date: dateString.substring(4, 10)
        });
    }
    console.log('sevenDays ',sevenDays);

    const habits = useSelector((state)=>{
        console.log('state from calendarView ',state.calendarReducer.habitRecords);
        return state.calendarReducer.habitRecords;
    });
    console.log('habits ',habits);

    const dispatch = useDispatch();
    function handleStatusChange(habitIndex, statusIndex, status){
        dispatch(calendarActions.changeStatus({habitIndex, statusIndex, status}));
    }

    return(
        <>
        <h1>Calendar View</h1>
        <table>
            <tr>
                <th>Habits</th>
                {
                    sevenDays.map((dayRec, i)=>{
                        return <th key={i}>
                            {dayRec.day} <br/>
                            {dayRec.date}
                        </th>
                    })
                }
            </tr>
            
                {
                    habits.map((habit, i)=>
                        <tr>
                            <td key={i}><strong>{habit.text.toUpperCase()}</strong></td>
                            {
                                habit.statusRecords.map((stat, ind)=>{
                                    return <td className={`${styles.statusData} ${stat.status === 'Done'? styles.greenColor:stat.status === 'Not Done'?styles.redColor:styles.greyColor}`}
                                            onClick={()=>handleStatusChange(i, ind, stat.status)} 
                                            key={ind}>
                                                    {stat.status.toUpperCase()}
                                            </td>
                                })
                            }
                        </tr>
                    )
                }
            
        </table>
        </>
    )
}