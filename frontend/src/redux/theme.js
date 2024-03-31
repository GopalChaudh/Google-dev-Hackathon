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

// Action creator to set theme
export function setThemeAction(theme) {
    return dispatch => {
        dispatch(theme.actions.setTheme(theme));
    };
}
