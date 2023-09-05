import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {value : {userID: "", username: ""}}

//create a user slice to user state manage
export const userSlice = createSlice({

    name: "user",
    initialState: initialStateValue,
    reducers: {
        userStore: (state,action) => {
            state.value = action.payload;
        },
        userRemove: (state) => {
            state.value = initialStateValue
        }
    }
})

export const {userStore, userRemove} = userSlice.actions;
export default userSlice.reducer;