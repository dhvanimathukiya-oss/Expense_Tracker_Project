import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'users',

    initialState : {
        users : []
    },

    reducers : {
        setusers : (state,action) =>{
            state.users = action.payload;
        },

        adduser : (state,action) => {
            state.users.push = (action.payload)
        }
    }
}) 

export const {setusers,adduser}=userSlice.actions
export default userSlice.reducer
