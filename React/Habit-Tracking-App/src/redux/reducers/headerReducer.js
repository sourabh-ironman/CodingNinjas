import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showHomePage:true
}

const headerSlice = createSlice({
    name: 'header',
    initialState:initialState,
    reducers:{
        toggle:(state, action)=>{
            state.showHomePage = !state.showHomePage;
        }
    }
});

export const headerReducer = headerSlice.reducer;
export const headerAction = headerSlice.actions;