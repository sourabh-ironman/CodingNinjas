import { createSlice, current } from "@reduxjs/toolkit";

const todayDate = new Date();
let sevenDays = [];
let dateToAdd = todayDate;
for(let i=6; i>=0; i--){
    dateToAdd = todayDate - (i*24*3600*1000);
    let dateString = new Date(dateToAdd).toString().substring(0, 11);
    sevenDays.push({
        dayAndDate: dateString,
        day: dateString.substring(0,4),
        date: dateString.substring(4, 10)
    });
}
console.log('sevenDays ',sevenDays);
const statusRecords = sevenDays.map((dayRec, i)=>{
    return {
        habitDate: dayRec.date,
        habitDay: dayRec.day,
        status: 'none'
    }
})

const initialState = {
    habitRecords: [
        {
            text: 'read a book',
            statusRecords: statusRecords
        },
        {
            text: 'play music',
            statusRecords: statusRecords
        }
    ]
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: initialState,
    reducers: {
        changeStatus:(state, action)=>{
            const currentState = current(state);
            console.log('currentState from changeStatus ',currentState);
            console.log('action.payload from changeStatus ',action.payload);
            const habitIndex = action.payload.habitIndex;
            const statusIndex = action.payload.statusIndex;
            const updatedHabits = currentState.habitRecords.map((habit, i)=>{
                    // console.log('i ',i);
                    // console.log('habitIndex ',habitIndex);
                    if(i === habitIndex){
                        // console.log('habitIndex and i are same')
                        const updatedStatusRecords = habit.statusRecords.map((stats, ind)=>{
                            if(ind === statusIndex){
                                // console.log('stats ',stats);
                                // console.log('stats.status ',stats.status)
                                if(stats.status === 'none'){
                                    // console.log('stats.status are same')
                                    return {
                                        ...stats,
                                        status: 'Done'
                                    }
                                }
                                if(stats.status === 'Done'){
                                    return {
                                        ...stats,
                                        status: 'Not Done'
                                    }
                                }
                                return {
                                    ...stats,
                                    status: 'none'
                                }
                            }
                            return stats;
                        })

                        return {
                            ...habit,
                            statusRecords: updatedStatusRecords
                        }
                    }
                    return habit;
                })
            
            console.log('updatedHabits after update ',updatedHabits);


            return {
                habitRecords: updatedHabits
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase("home/add",(state,action)=>{
            const currentState = current(state);
            console.log('state in extraReducers ',currentState);
            console.log('action.payload ',action.payload);
            let stateToReturn = [...currentState.habitRecords];
            stateToReturn.push({
                text: action.payload,
                statusRecords: statusRecords
            })
            return {
                habitRecords: stateToReturn
            }
        }).addCase("home/updateStatus", (state, action)=>{
            const currentState = current(state);
            console.log('state in extraReducers on changing status ',currentState);
            console.log('action.payload ',action.payload);
            const todayDate = new Date().toString().substring(4,10);
            const updatedHabits = currentState.habitRecords.map((habit, i)=>{
                if(i === action.payload.index){
                    const updatedStatus = habit.statusRecords.map((status, ind)=>{
                        if(status.habitDate === todayDate){
                            return {
                                ...status,
                                status: action.payload.updateValue
                            }
                        }
                        return status;
                    })
                    return {
                        ...habit,
                        statusRecords: updatedStatus
                    }
                }
                return habit;
            })
            return {
                habitRecords: updatedHabits
            }
        })
    }
});

export const calendarReducer = calendarSlice.reducer;
export const calendarActions = calendarSlice.actions;

export const calendarSelector = (state)=>state.calendarReducer;
