import { configureStore } from '@reduxjs/toolkit';
import profilePageReducer  from './reducers/profilePageReducer';
import TeamTasksScreenReducer from './reducers/TeamTasksScreenReducer';
import publicTimeLineReducer from './reducers/PublicTimLineReducer';

export default configureStore({
    reducer: {
        profilePage: profilePageReducer,
        teamTasks: TeamTasksScreenReducer,
        publicTimeLine: publicTimeLineReducer  

    },
});
