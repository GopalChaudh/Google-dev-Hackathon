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

export const { setPosts } = postSlice.actions;

// Async action creator to fetch and set posts
export function fetchPosts() {
    return async (dispatch) => {
        try {
            // Perform asynchronous operation to fetch posts
            const posts = await fetchPostsFromAPI();
            // Dispatch the setPosts action with the fetched posts
            dispatch(setPosts(posts));
        } catch (error) {
            // Handle errors, if any
            console.error('Error fetching posts:', error);
        }
    };
}

// Example function to fetch posts from an API
async function fetchPostsFromAPI() {
    // Simulated asynchronous operation
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ /* fetched posts */ });
        }, 1000);
    });
}
