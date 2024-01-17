import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    habits: [
        {text: "read a book", status: "None", showStatusOptions:false},
        {text: "play music", status: "None",showStatusOptions:false}
    ],
    showAddHabitForm: false
};



const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {
        add: (state, action)=>{
            const currentState = current(state);
            console.log('habit to add is ',action.payload);
            console.log('state is ',currentState);
            const updatedHabits = currentState.habits.map((habit, i)=>{
                return habit;
            });
            updatedHabits.push({text: action.payload, status:"none",showStatusOptions:false})
            return {
                ...currentState,
                habits: updatedHabits
            }
        },
        toggleShowStatusOption: (state, action)=>{
            const currentState = current(state);
            console.log('state from toggleShowStatusOption ',currentState);
            console.log('action.payload ',action.payload);
            const index = action.payload;
            const updatedHabits = currentState.habits.map((habit,i)=>{
                if(i === index){
                    return {
                        ...habit,
                        showStatusOptions: !habit.showStatusOptions
                    }
                }
                return habit;
            })
            return {
                ...currentState,
                habits:updatedHabits
            };
        },
        toggleShowAddHabitForm:(state, action)=>{
            const currentState = current(state);
            return {
                ...currentState,
                showAddHabitForm: !currentState.showAddHabitForm
            }
        },
        updateStatus: (state, action)=>{
            const currentState = current(state);
            console.log('data to update action.payload ',action.payload);
            console.log('updateStatus state ',currentState);
            const updatedHabits = currentState.habits.map((habit, i)=>{
                if(i === action.payload.index){
                    return{
                        ...habit,
                        status: action.payload.updateValue
                    }
                }
                return habit;
            });

            return{
                ...currentState,
                habits: updatedHabits
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase("calendar/changeStatus", (state, action)=>{
            const currentState = current(state);
            console.log('state in extraReducers from homeReducer ',currentState);
            console.log('action.payload from homeReducer ',action.payload);
            let updateStatus = currentState;

            if(action.payload.statusIndex === 6){
                if(action.payload.status === 'none'){
                    updateStatus = 'Done'
                }
                else if(action.payload.status === 'Done'){
                    updateStatus = 'Not Done'
                }
                else{
                    updateStatus = 'none'
                }
            

            const updateHabits = currentState.habits.map((habit, i)=>{
                if(i === action.payload.habitIndex){
                    return {
                        ...habit,
                        status: updateStatus
                    }
                }
                return habit;
            })
            console.log('updateHabits from extraReducers of homeReducer ',updateHabits);

            return{
                ...currentState,
                habits: updateHabits
            }
        }
        })
    }
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;

export const habitSelector = (state)=>state.homeReducer;