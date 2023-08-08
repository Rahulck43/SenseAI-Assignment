import { createSlice } from "@reduxjs/toolkit";



const userSlice= createSlice({
    name:'user',
    initialState:{
        email:'',
        success:false
    },
    reducers:{
        login:(state,action)=>{
            const {user}=action.payload
            state.email=user.email
            state.success=true
        },
        logout:(state)=>{
            state.email='',
            state.success=false
        }
    }
})


export const {login,logout}=userSlice.actions
export default userSlice.reducer