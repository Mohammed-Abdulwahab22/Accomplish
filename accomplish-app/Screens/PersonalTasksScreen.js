import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TodoItem = ({ title, completed, onPress, onDelete }) => (
  <View style={styles.todoItem}>
    <TouchableOpacity onPress={onPress}>
      <AntDesign name={completed ? 'checkcircle' : 'checkcircleo'} size={24} color="gold" />
    </TouchableOpacity>
    <Text style={[styles.todoText, completed && styles.completedText]}>{title}</Text>
    <TouchableOpacity onPress={onDelete}>
      <Entypo name="cross" size={24} color="red" />
    </TouchableOpacity>
  </View>
);

const ListItem = ({ name, onPress, onDelete }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <View style={styles.listIcon}>
      <Entypo name="list" size={20} color="black" />
    </View>
    <Text>{name}</Text>
    <TouchableOpacity onPress={onDelete}>
      <Entypo name="cross" size={24} color="red" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const PersonalTasksScreen = () => {
  const [lists, setLists] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [lists]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('lists', JSON.stringify(lists));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const savedLists = await AsyncStorage.getItem('lists');
      if (savedLists !== null) {
        setLists(JSON.parse(savedLists));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const toggleTodo = (listIndex, todoIndex) => {
    setLists((prevLists) =>
      prevLists.map((list, i) =>
        i === listIndex
          ? {
              ...list,
              todos: list.todos.map((todo, j) =>
                j === todoIndex ? { ...todo, completed: !todo.completed } : todo
              ),
            }
          : list
      )
    );
  };

  const deleteTodo = (listIndex, todoIndex) => {
    setLists((prevLists) =>
      prevLists.map((list, i) =>
        i === listIndex ? { ...list, todos: list.todos.filter((todo, j) => j !== todoIndex) } : list
      )
    );
  };

  const deleteList = (listIndex) => {
    setLists((prevLists) => prevLists.filter((list, i) => i !== listIndex));
    setSelectedListIndex(null);
  };

  const renderTodo = ({ item: { title, completed }, index }) => (
    <TodoItem
      title={title}
      completed={completed}
      onPress={() => toggleTodo(selectedListIndex, index)}
      onDelete={() => deleteTodo(selectedListIndex, index)}
    />
  );

  const addTodo = () => {
    if (newTodo.trim() !== '' && selectedListIndex !== null) {
      setLists((prevLists) =>
        prevLists.map((list, index) =>
          index === selectedListIndex
            ? { ...list, todos: [...list.todos, { title: newTodo, completed: false }] }
            : list
        )
      );
      setNewTodo('');
    }
  };

  const completedCount =
    lists.length > 0 && selectedListIndex !== null
      ? lists[selectedListIndex].todos.filter((todo) => todo.completed).length
      : 0;

  const createList = () => {
    if (newListName.trim() !== '') {
      setLists([...lists, { name: newListName, todos: [] }]);
      setNewListName('');
    }
  };

  const toggleSelectedList = (index) => {
    setSelectedListIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Lists</Text>
      <FlatList
        style={{ top: 35 }}
        data={lists}
        renderItem={({ item, index }) => (
          <ListItem
            name={item.name}
            onPress={() => toggleSelectedList(index)}
            onDelete={() => deleteList(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {selectedListIndex !== null && (
        <>
          <FlatList
            style={{ top: 35 }}
            data={lists[selectedListIndex].todos}
            renderItem={renderTodo}
            keyExtractor={(item, index) => index.toString()}
          />
          <Text style={styles.completedText}>Completed: {completedCount}</Text>
          <View style={styles.addTodoContainer}>
            <TextInput
              style={styles.input}
              value={newTodo}
              onChangeText={setNewTodo}
              placeholder="Add a new task..."
            />
            <TouchableOpacity onPress={addTodo}>
              <Entypo name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.addListContainer}>
        <TextInput
          style={styles.input}
          value={newListName}
          onChangeText={setNewListName}
          placeholder="Enter list name..."
        />
        <TouchableOpacity style={styles.addButton} onPress={createList}>
          <Text style={styles.addButtonText}>Create New List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    top: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  completedText: {
    color: '#ccc',
    textDecorationLine: 'line-through',
  },
  addTodoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    bottom: 20,
  },
  addListContainer: {
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listIcon: {
    marginRight: 10,
  },
});

export default PersonalTasksScreen;
