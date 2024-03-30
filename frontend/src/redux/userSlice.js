import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    user: Cookies.get("user") || null,
    edit: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            Cookies.set("user", JSON.stringify(action.payload), { expires: 7 }); // Expires in 7 days
        },
        logout(state) {
            state.user = null;
            Cookies.remove("user");
        },
        updateProfile(state, action) {
            state.edit = action.payload;
        },
    },
});

export default userSlice.reducer;

export function Login(user) {
    return async (dispatch) => {
        dispatch(userSlice.actions.login(user));
    };
}

export function Logout() {
    return async (dispatch) => {
        dispatch(userSlice.actions.logout());
    };
}

export function UpdateProfile(edit) {
    return async (dispatch) => {
        dispatch(userSlice.actions.updateProfile(edit));
    };
}