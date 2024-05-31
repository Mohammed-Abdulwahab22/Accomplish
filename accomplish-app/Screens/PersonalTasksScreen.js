import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Feather, Fontisto } from '@expo/vector-icons';
import MyProgressCircle from '../Components/ProgressCircle';
import { PieChart } from 'react-native-svg-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import DailyTasksScreen from '../Components/DailyTasksScreen';

const useAsyncStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) setStoredValue(JSON.parse(value));
      } catch (error) {
        console.error('Error loading from async storage:', error);
      }
    };

    loadValue();
  }, [key]);

  useEffect(() => {
    const saveValue = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Error saving to async storage:', error);
      }
    };

    saveValue();
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

const useModal = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);
  return { isVisible, openModal, closeModal };
};

const TaskItem = ({ task, listIndex, taskIndex, toggleTaskCompletion }) => {
  const deadline = task.deadline ? new Date(task.deadline) : null;
  const isDeadlinePassed = deadline && deadline < new Date();
  const truncatedTaskName = task.name.length > 9 ? task.name.slice(0, 9) + '...' : task.name;

  return (
    <TouchableOpacity
      key={taskIndex}
      style={[styles.taskContainer, task.completed ? styles.taskCompleted : null]}
      onPress={() => toggleTaskCompletion(listIndex, taskIndex)}
    >
      {task.completed ? (
        <MaterialCommunityIcons name="check-underline-circle" size={27} color="gold" />
      ) : (
        <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="black" />
      )}
      <View style={styles.taskDetails}>
        <Text style={[styles.task, task.completed ? styles.taskTextCompleted : null, isDeadlinePassed ? styles.deadlinePassed : null]}>
          {truncatedTaskName}
        </Text>
        {deadline && (
          <Text style={[styles.deadline, isDeadlinePassed ? styles.deadlinePassed : styles.deadlineNotPassed]}>
            Deadline: {deadline.toLocaleDateString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const ListItem = ({ item, index, deleteList, openAddTasksModal, calculateProgress }) => (
    
  <TouchableOpacity style={[styles.card, { backgroundColor: '#B644DA' }]} onPress={() => openAddTasksModal(index)}>
    <Text style={styles.cardText}>{item.name}</Text>
    <TouchableOpacity onPress={() => deleteList(index)} style={styles.deleteButton}>
      <Entypo name="trash" size={24} color="black" />
    </TouchableOpacity>
    <MyProgressCircle progress={calculateProgress(item)} />
  </TouchableOpacity>
);

const getRandomColor = () => {
  const colors = ['#FF5733', '#EEAB9D', '#33FF57', '#337CFF', '#D933FF', '#33FFE6', '#FF5733', '#57FF33'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getPieChartData = (tasks) => {
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  if (tasks.length === 0) {
    return { pieData: [], allCompleted: false };
  }

  if (completedTasks.length === tasks.length) {
    return {
      pieData: [{
        value: 1,
        svg: { fill: 'green' },
        key: `all-completed`,
      }],
      allCompleted: true
    };
  }

  const pieData = pendingTasks.map((task, index) => ({
    value: 1,
    svg: { fill: getRandomColor() },
    key: `pie-${index}`,
    task: task
  }));

  return { pieData, allCompleted: false };
};


export default function PersonalTasksScreen() {
  const [lists, setLists] = useAsyncStorage('lists', []);
  const [listName, setListName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const addListModal = useModal();
  const addTasksModal = useModal();
  const dailyTasksModal = useModal();

  const deleteList = (index) => {
    const newList = lists.filter((_, i) => i !== index);
    setLists(newList);
    setSelectedTask(null);
  };

  const addList = () => {
    if (listName.trim() !== '') {
      setLists([...lists, { name: listName, tasks: [] }]);
      setListName('');
      addListModal.closeModal();
      setSelectedTask(null);
    }
  };

  const addTask = () => {
    if (taskName.trim() !== '') {
      const newList = [...lists];
      newList[selectedListIndex].tasks.push({ name: taskName, completed: false, deadline: taskDeadline.toISOString() });
      setLists(newList);
      setTaskName('');
      setShowDatePicker(false);
      setSelectedTask(null);
    }
  };

  const toggleTaskCompletion = (listIndex, taskIndex) => {
    const newList = [...lists];
    newList[listIndex].tasks[taskIndex].completed = !newList[listIndex].tasks[taskIndex].completed;
    setLists(newList);
  };

  const calculateProgress = (list) => {
    const totalTasks = list.tasks.length;
    const completedTasks = list.tasks.filter(task => task.completed).length;
    return totalTasks === 0 ? 0 : completedTasks / totalTasks;
  };
  

  return (
    <View style={styles.container}>
      <View style={{ top: '82%', zIndex: 1 }}>
        <TouchableOpacity style={styles.addListsButton} onPress={addListModal.openModal}>
          <Image source={require('../assets/add.png')} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <View style={{ top: '-95%', left: '45%', zIndex: 1 }}>
          <TouchableOpacity style={styles.addTasksButton} onPress={dailyTasksModal.openModal}>
            <FontAwesome5 name="clipboard-list" size={38} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={addListModal.isVisible} animationType="fade" transparent>
        <View style={styles.AddingListModalContainer}>
          <View style={styles.InsideAddingListModalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter list name"
              value={listName}
              onChangeText={setListName}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={addListModal.closeModal} style={styles.button}>
                <MaterialIcons name="cancel" size={52} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={addList} style={styles.button}>
                <Entypo name="add-to-list" size={50} color="lightgreen" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={addTasksModal.isVisible} animationType="fade">
        <View style={styles.AddingTasksModalContainer}>
          <TouchableOpacity style={styles.backgroundPress} onPress={() => setSelectedTask(null)} />
          <View style={styles.InsideAddingTasksModalContainer}>
            <PieChart data={getPieChartData(lists[selectedListIndex]?.tasks || []).pieData} style={styles.pieChart}/>
            {selectedTask && (
              <View style={styles.taskDetailsBox}>
                <Text style={styles.taskDetailsText}>Task: {selectedTask.name}</Text>
                <Text style={styles.taskDetailsText}>Deadline: {selectedTask.deadline ? new Date(selectedTask.deadline).toLocaleDateString() : 'N/A'}</Text>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter task name"
              value={taskName}
              onChangeText={setTaskName}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
                <Fontisto name="date" size={35} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity onPress={addTask} style={styles.button}>
                <Entypo name="add-to-list" size={50} color="lightgreen" />
              </TouchableOpacity>
              <TouchableOpacity onPress={addTasksModal.closeModal} style={styles.button}>
                <MaterialIcons name="cancel" size={52} color="red" />
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker value={taskDeadline} mode="date" display="default" onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setTaskDeadline(selectedDate);
              }} />
            )}
            <ScrollView contentContainerStyle={styles.tasksContainer}>
              {lists[selectedListIndex]?.tasks.map((task, taskIndex) => (
                <TaskItem key={taskIndex} task={task} listIndex={selectedListIndex} taskIndex={taskIndex} toggleTaskCompletion={toggleTaskCompletion} />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lists.map((item, index) => (
          <ListItem key={index} item={item} index={index} deleteList={deleteList} openAddTasksModal={(i) => {
            setSelectedListIndex(i);
            addTasksModal.openModal();
          }} calculateProgress={calculateProgress} />
        ))}
      </ScrollView>

      <Modal visible={dailyTasksModal.isVisible} animationType="fade" transparent>
        <DailyTasksScreen closeModal={dailyTasksModal.closeModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262450',
    paddingTop: 40,
  },
  addListsButton: {
    position: 'absolute',
    right: 20,
    bottom: 8,
    zIndex: 1,
  },
  addTasksButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    zIndex: 1,
  },
  AddingListModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  InsideAddingListModalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  AddingTasksModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  InsideAddingTasksModalContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    marginHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    height: 180,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    padding: 10,
  },
  pieChart: {
    height: 200,
    marginBottom: 10,
  },
  tasksContainer: {
    flexGrow: 1,
    paddingTop: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskDetails: {
    marginLeft: 10,
    flex: 1,
  },
  task: {
    fontSize: 16,
    color: '#333',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deadline: {
    marginTop: 5,
    fontSize: 12,
  },
  deadlinePassed: {
    color: 'red',
  },
  deadlineNotPassed: {
    color: 'green',
  },
  taskDetailsBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginTop: 10,
  },
  taskDetailsText: {
    fontSize: 14,
    color: '#333',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
});

