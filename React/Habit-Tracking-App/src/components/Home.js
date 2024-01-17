import { useSelector, useDispatch } from "react-redux"
import styles from "../styles/home.module.css";
import { homeActions } from "../redux/reducers/homeReducer";
import { habitSelector } from "../redux/reducers/homeReducer";
import { useState } from "react";

export function Home(){
    const habitsSelect = useSelector(habitSelector);
    const habits = habitsSelect.habits;
    // console.log('habits ',habits);
    const dispatch = useDispatch();

    const [habitToAdd, sethabitToAdd] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(!habitToAdd.length){
            return;
        }
        console.log('form submitted');
        dispatch(homeActions.add(habitToAdd));
        dispatch(homeActions.toggleShowAddHabitForm());
        sethabitToAdd('');
    }

    function handleUpdateStatus(event,index){
        console.log('status updated to ',event.target.innerText, ' on index ',index);
        const updateValue = event.target.innerText;
        dispatch(homeActions.updateStatus({updateValue, index}));
        dispatch(homeActions.toggleShowStatusOption(index));
    }
    return (
        <>
        <h1>Habits  </h1>
        <div className={styles.habitList}>
            {
            habits.map((habit, i)=>{
                return (
                    <div className={styles.habitCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.habitText}>
                                {habit.text}
                            </div>
                            <div className={styles.habitStatusOptions}>
                                <img onClick={()=>dispatch(homeActions.toggleShowStatusOption(i))} src="https://cdn-icons-png.flaticon.com/128/2311/2311524.png" alt="dots"/>
                            </div>
                            {
                                habit.showStatusOptions &&
                                <div className={styles.habitStatusList}>
                                    <ul>
                                        <li onClick={(e)=>handleUpdateStatus(e,i)}>Done</li>
                                        <li onClick={(e)=>handleUpdateStatus(e,i)}>Not Done</li>
                                        <li onClick={(e)=>handleUpdateStatus(e,i)}>None</li>
                                    </ul>
                                </div>
                            }
                        </div>

                        <div>
                            <strong>Status: {habit.status}</strong>
                        </div>
                    </div>
                )
            })
        }
        <div className={styles.habitCard}>
            {
                !habitsSelect.showAddHabitForm &&
                <img onClick={()=>dispatch(homeActions.toggleShowAddHabitForm())} 
                    className={styles.plusImage} src="https://cdn-icons-png.flaticon.com/128/3524/3524388.png" 
                    alt="create habit"/>
            }

            {
                habitsSelect.showAddHabitForm &&
                <form onSubmit={handleSubmit} className={styles.createHabitForm}>
                    <input type="text" 
                            placeholder="Add Habit" 
                            value={habitToAdd} 
                            onChange={(e)=>sethabitToAdd(e.target.value)}/><br/>
                    <button type="submit">Add</button>
                    <button type="button" onClick={()=>dispatch(homeActions.toggleShowAddHabitForm())} >Cancel</button>
                </form>
            }
        </div>
    </div>
    </>
    )
}