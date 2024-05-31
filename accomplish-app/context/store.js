// store.js

import { configureStore } from '@reduxjs/toolkit';
import profilePageReducer from './reducers/profilePageReducer';

export default configureStore({
    reducer: {
        profilePage: profilePageReducer,
        // Other reducers if any
    },
});
