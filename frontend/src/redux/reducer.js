import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice.js';
import postSlice from './postSlice.js';
import themeSlice from './theme.js';

const rootReducer = combineReducers({
    user: userSlice,
    posts: postSlice,
    theme: themeSlice,
});

export { rootReducer };