import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFollowed : false,
    followersCount : 0,
    followingCount : 0,
    modalVisible : false,
    selectedPost : null,
    posts:[ { id: '1', title: 'Post 1', content: 'This is the content of post 1.', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Post 2', content: 'This is the content of post 2.', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Post 3', content: 'This is the content of post 3.', image: 'https://via.placeholder.com/150' },],
    profileName : 'Profile Name',
    profileImage : 'https://via.placeholder.com/150',
    profileBio : 'Profile Bio',

    

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
       },
       setPosts: (state, action) => {
        state.posts = action.payload;
       },
       setprofileName: (state, action) => {
        state.profileName = action.payload;
       },
       setprofileImage: (state, action) => {
        state.profileImage = action.payload;
       },
       setprofileBio: (state, action) => {
        state.profileBio = action.payload;
       },
    }
});

export const {toggleFollow, setFollowersCount, setFollowingCount, setModalVisible, setSelectedPost,setPosts,setprofileName,setprofileImage,setprofileBio} = profilePageSlice.actions;
export default profilePageSlice.reducer;
