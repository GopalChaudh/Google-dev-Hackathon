import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './userSlice.js';
import postReducer from './postSlice.js';
import themeReducer from './theme.js';

const rootReducer = combineReducers({
    user: userReducer,
    posts: postReducer,
    theme: themeReducer,
});

export { rootReducer };
