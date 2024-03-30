import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/data";

const initialState = {
    user: JSON.parse(window?.localStorage.getItem('user')) || user,
    edit: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            window?.localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state) {
            state.user = {};
            window?.localStorage.removeItem('user');
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