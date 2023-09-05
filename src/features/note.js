import { createSlice } from "@reduxjs/toolkit";


//create a note slice to note state manage
const initialStateValue = {value : 
    {
        _id: "", 
        title: "",
        note: "",
        category: "",
        owner: ""
    }}

export const noteSlice = createSlice({

    name: "note",
    initialState: initialStateValue,
    reducers: {
        noteStore: (state,action) => {
            state.value = action.payload;
            console.log("redux state " + state.value)
        },
    }
})

export const {noteStore} = noteSlice.actions;
export default noteSlice.reducer;