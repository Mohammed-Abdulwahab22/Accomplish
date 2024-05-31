import React,{useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setProjects, setSelectedProject, setProjectDone, setDeleteProject, setEditProject, setAddproject} from '../context/reducers/TeamTasksScreenReducer';
export default function TeamTasksScreen() {
  const { projects, selectedProject, projectDone, deleteProject, editProject,addProject } = useSelector(state => state.teamTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      dispatch(setProjects(data));
    };

    fetchProjects();
  }, [dispatch]);
  
  const handleAddproject = () => {
    dispatch(setAddproject());
  }

  const handleProjectDone = (id) => {
    dispatch(setProjectDone(id));
  };

  const handleEditProject = (id) => {
    dispatch(setEditProject(id));
  };

  const handleDeleteProject = (id) => {
    dispatch(setDeleteProject(id));
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.taskCard}>
      <View style={styles.taskItem}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{item.task}</Text>
          <View style={styles.taskActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="checkmark-circle-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="create-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="trash-bin-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <View style={{top:'82%', zIndex: 1}}>
    <TouchableOpacity style={styles.addListsButton} >
          <Image source={require('../assets/add.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
    </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Team Projects</Text>
      </View>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262450',
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#1E1C3C',
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  flatListContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  taskCard: {
    width: '90%',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#43436B',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  taskItem: {
    width: '100%',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  taskActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  taskDescription: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  addListsButton: {
    position: 'absolute',
    right: 20,
    bottom: 8,
    zIndex: 1,
  },
});
