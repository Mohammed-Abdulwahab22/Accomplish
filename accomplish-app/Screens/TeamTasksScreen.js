import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TeamTasksScreen() {
  const tasks = [
    { id: '1', task: 'Task 1', description: 'This is the description of task 1.' },
    { id: '2', task: 'Task 2', description: 'This is the description of task 2.' },
    { id: '3', task: 'Task 3', description: 'This is the description of task 3.' },
  ];

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Team Tasks</Text>
      </View>
      <FlatList
        data={tasks}
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
});
