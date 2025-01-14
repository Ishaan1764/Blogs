import { createSlice } from "@reduxjs/toolkit";

//to track authentication must need initial state
const initialState={
    status:false,
    userData:null,
    isAuthenticated:true
}
const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        //action contains payload
        //these are actions under reducers
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.status=true;
            state.userData=action.payload.userData;
        },

        logout:(state)=>{
            state.isAuthenticated=false;
            state.status=false;
            state.userData=null;
        }
    }
});
export const {login,logout}=authSlice.actions;
export default authSlice.reducer;