import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts : [ { id: '1', title: 'Post 1', content: 'This is the content of post 1.', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Post 2', content: 'This is the content of post 2.', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Post 3', content: 'This is the content of post 3.', image: 'https://via.placeholder.com/150' },],

   
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