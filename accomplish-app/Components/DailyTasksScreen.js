import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DailyTasksScreen() {
  const [uncompletedtaskList, setUncompletedTaskList] = useState([]);
  const [completedtaskList, setCompletedTaskList] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadTasks();
    console.log('Loaded tasks in daily tasks screen:', "uncompletedTasks", uncompletedtaskList, "completedTasks", completedtaskList);
  }, []);

  useEffect(() => {
    saveTasks();
    console.log('Saved tasks in daily tasks screen:', "uncompletedTasks", uncompletedtaskList, "completedTasks", completedtaskList);
  }, [uncompletedtaskList, completedtaskList]);

  const clearTasks = async () => {
    try {
      await AsyncStorage.removeItem('uncompletedTasks');
      await AsyncStorage.removeItem('completedTasks');
      setUncompletedTaskList([]);
      setCompletedTaskList([]);
      console.log('Cleared tasks in daily tasks screen:', "uncompletedTasks", uncompletedtaskList, "completedTasks", completedtaskList);
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const uncompletedTasks = await AsyncStorage.getItem('uncompletedTasks');
      const completedTasks = await AsyncStorage.getItem('completedTasks');

      setUncompletedTaskList(uncompletedTasks ? JSON.parse(uncompletedTasks) : []);
      setCompletedTaskList(completedTasks ? JSON.parse(completedTasks) : []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedtaskList));
      await AsyncStorage.setItem('completedTasks', JSON.stringify(completedtaskList));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (newTask.trim().length === 0) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }

    const newTaskItem = {
      id: Date.now(),
      task: newTask,
    };

    setUncompletedTaskList([...uncompletedtaskList, newTaskItem]);
    setNewTask('');

    console.log('Added task in daily tasks screen:', "uncompletedTasks", uncompletedtaskList);
  };

  const completeTask = (task) => {
    setUncompletedTaskList(uncompletedtaskList.filter(t => t.id !== task.id));
    setCompletedTaskList([...completedtaskList, task]);
    console.log('Completed task in daily tasks screen:', "uncompletedTasks", uncompletedtaskList, "completedTasks", completedtaskList);
  };

  const uncompleteTask = (task) => {
    setCompletedTaskList(completedtaskList.filter(t => t.id !== task.id));
    setUncompletedTaskList([...uncompletedtaskList, task]);
    console.log('Uncompleted task in daily tasks screen:', "uncompletedTasks", uncompletedtaskList, "completedTasks", completedtaskList);
  };

  const renderUncompletedTask = ({ item }) => (
    <TouchableOpacity onPress={() => completeTask(item)} style={styles.task}>
      <View style={styles.circle}>
        <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="black" />
      </View>
      <View style={styles.taskTextContainer}>
      <Text style={styles.taskText}>{item.task}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCompletedTask = ({ item }) => (
    <TouchableOpacity onPress={() => uncompleteTask(item)} style={styles.taskCompleted}>
      <View style={styles.circleCompleted}>
        <MaterialCommunityIcons name="check-underline-circle" size={24} color="gold" />
      </View>
      <View style={styles.taskTextContainer}>
      <Text style={[styles.taskText, styles.taskTextCompleted]}>{item.task}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={uncompletedtaskList}
        renderItem={renderUncompletedTask}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      <FlatList
        data={completedtaskList}
        renderItem={renderCompletedTask}
        keyExtractor={item => item.id.toString()}
        style={styles.listCompleted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  list: {
    flex: 1,
  },
  listCompleted: {
    flex: 1,
    marginTop: 20,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    textDecorationLine: 'line-through',
  },
  circle: {
    marginRight: 10,
  },
  circleCompleted: {
    marginRight: 10,
    position: 'absolute',
  },
  taskText: {
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
  },
  taskTextContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:(0,0,0,0.8),
  },
});
