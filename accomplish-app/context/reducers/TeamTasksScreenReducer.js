import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [ { id: '1', title: 'Post 1', content: 'This is the content of post 1.', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Post 2', content: 'This is the content of post 2.', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Post 3', content: 'This is the content of post 3.', image: 'https://via.placeholder.com/150' },], 
    addProject: [],
    selectedProject: null,
    projectDone: false,
    deleteProject: false,
    editProject: null,
};

const teamTasksSlice = createSlice({
    name: 'teamTasks',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setSelectedProject: (state, action) => {
            state.selectedTask = action.payload;
        },
        setProjectDone: (state, action) => {
            state.projectDone = action.payload;
        },
        setDeleteProject: (state, action) => {
            state.deleteProject = action.payload;
        },
        setEditProject: (state, action) => {
            state.editProject = action.payload;
        },
        setAddproject: (state, action) => {
            state.addProject = action.payload;
        },
    },
}); 
     
export const { setProjects, setSelectedProject, setProjectDone, setDeleteProject, setEditProject ,setAddproject} = teamTasksSlice.actions;
export default teamTasksSlice.reducer;
