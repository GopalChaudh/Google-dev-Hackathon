import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: JSON.parse(window?.localStorage.getItem('theme')) || 'dark',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            window?.localStorage.setItem('theme', JSON.stringify(action.payload));
        },
    },
});

export default themeSlice.reducer;

export function SetTheme(theme) {
    return async (dispatch) => {
        dispatch(themeSlice.actions.setTheme(theme));
    };
}