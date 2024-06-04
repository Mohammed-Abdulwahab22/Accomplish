import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts : [ ],

   
};

const publicTimeLineSlice = createSlice({
    name: 'publicTimeLine',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
    },
});

export const { addPost } = publicTimeLineSlice.actions;
export default publicTimeLineSlice.reducer;