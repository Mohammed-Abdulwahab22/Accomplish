import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [], 
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
