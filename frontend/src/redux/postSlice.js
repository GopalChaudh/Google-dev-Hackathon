import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: {},
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
    },
});

export default postSlice.reducer;

export function SetPosts(posts) {
    return async (dispatch) => {
        dispatch(postSlice.actions.getPosts(posts));
    };
}