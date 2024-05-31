import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFollowed : false,
    followersCount : 0,
    followingCount : 0,
    modalVisible : false,
    selectedPost : null
    

};

const profilePageSlice = createSlice({
    name: 'profilePage',
    initialState,
    reducers: {
       toggleFollow: state => {
        state.isFollowed = !state.isFollowed;
        state.followersCount += state.isFollowed ? 1 : state.followersCount;
       },
       setFollowersCount: (state, action) => {
        state.followersCount = action.payload;
       },
       setFollowingCount: (state, action) => {
        state.followingCount = action.payload;
       },
       setModalVisible: state => {
        state.modalVisible = !state.modalVisible;
       },
       setSelectedPost: (state, action) => {
        state.selectedPost = action.payload;
       }
    }
});

export const {toggleFollow, setFollowersCount, setFollowingCount, setModalVisible, setSelectedPost} = profilePageSlice.actions;
export default profilePageSlice.reducer;
