import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Feather, Fontisto } from '@expo/vector-icons';
import MyProgressCircle from '../Components/ProgressCircle';
import { PieChart } from 'react-native-svg-charts'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function PersonalTasksScreen() {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');
  const [addingListModal, setAddingListModal] = useState(false);

  const [addingTasksModal, setAddingTasksModal] = useState(false);
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [taskName, setTaskName] = useState('');

  const [dailyTasksModal, setDailyTasksModal] = useState(false);

  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);



  useEffect(() => {
    loadLists();

  }, [])

  useEffect(() => {
    saveLists();

  }, [lists])
  

  const loadLists = async () => {
    try {
      const storedLists = await AsyncStorage.getItem('lists');
      if (storedLists !== null) {
        setLists(JSON.parse(storedLists));
      }
    } catch (error) {
      console.error('Error loading lists:', error);
    }
  };

  const saveLists = async () => {
    try {
      await AsyncStorage.setItem('lists', JSON.stringify(lists));
    } catch (error) {
      console.error('Error saving lists:', error);
    }
  };

  const deleteList = (index) => {
    const newList = lists.filter((_, i) => i !== index);
    setLists(newList);
  };

  const addList = () => {
    if (listName.trim() !== '') {
      setLists([...lists, { name: listName, tasks: [] }]);
      setListName('');
      closeAddListModal();
    }
  };



  const addTask = () => {
    if (taskName.trim() !== '') {
      const newList = [...lists];
      newList[selectedListIndex].tasks.push({ name: taskName, completed: false, deadline: taskDeadline });
      setLists(newList);
      setTaskName('');
      setShowDatePicker(false);

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

 
  const TaskItem = ({ task, listIndex, taskIndex }) => {
    console.log('Task Deadline:', task.deadline); // Add this line
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
          <Text style={[styles.task, task.completed ? styles.taskTextCompleted : null]}>{task.name}</Text>
          {task.deadline instanceof Date && (
            <Text style={styles.deadline}>Deadline: {task.deadline.toLocaleDateString()}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const openAddListModal = () => {
    setAddingListModal(true);
  };

  const closeAddListModal = () => {
    setAddingListModal(false);
  };

  const openAddTasksModal = (index) => {
    setSelectedListIndex(index);
    setAddingTasksModal(true);
  };

  const closeAddTasksModal = () => {
    setAddingTasksModal(false);
  };

  const openDailyTasksModal = () => {
    setDailyTasksModal(true);
  };

  const closeDailyTasksModal = () => {
    setDailyTasksModal(false);
  };



  const ListItem = ({ item, index }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: getRandomColor() }]} onPress={() => openAddTasksModal(index)}>
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

  

  const getPieChartData = () => {
    const tasks = lists[selectedListIndex]?.tasks || [];
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
    }));

    return { pieData, allCompleted: false };
  };


  return (
    <View style={styles.container}>

      <View style={{ top: '85%', zIndex: 1 }}>
        <TouchableOpacity style={styles.addListsButton} onPress={openAddListModal}>
          <Ionicons name="add-circle-sharp" size={50} color="darkblue" />
        </TouchableOpacity>
        <View style={{ top: '-78%', left: '45%', zIndex: 1 }}>
          <TouchableOpacity style={styles.addTasksButton} onPress={openDailyTasksModal}>
            <FontAwesome5 name="clipboard-list" size={35} color="red" />
          </TouchableOpacity>
        </View>
      </View>


      <Modal visible={addingListModal} animationType="fade" transparent>
        <View style={styles.AddingListModalContainer}>
          <View style={styles.InsideAddingListModalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter list name"
              value={listName}
              onChangeText={setListName}
            />

            <View style={styles.buttonsContainer}>

              <TouchableOpacity onPress={closeAddListModal} style={styles.button}>
                <MaterialIcons name="cancel" size={52} color="red" />
              </TouchableOpacity>

              <TouchableOpacity onPress={addList} style={styles.button}>
                <Entypo name="add-to-list" size={50} color="lightgreen" />
              </TouchableOpacity>


            </View>

          </View>
        </View>
      </Modal>

      <Modal visible={addingTasksModal} animationType="fade">
        <View style={styles.AddingTasksModalContainer}>
          <View style={styles.InsideAddingTasksModalContainer}>
            <PieChart data={getPieChartData().pieData} style={{ height: 200, width: 200, top: '-35%' }} />
            {getPieChartData().allCompleted && (
              <View style={styles.checkIconContainer}>
                <Feather name="check-circle" size={50} color="green" />
              </View>
            )}
            {/* Tasks */}
            <ScrollView style={styles.tasksContainer}>
              {lists[selectedListIndex]?.tasks.map((task, index) => (
                <TaskItem key={index} task={task} listIndex={selectedListIndex} taskIndex={index} />
              ))}
            </ScrollView>

            <TextInput
              style={styles.inputTasks}
              placeholder="Enter task name"
              value={taskName}
              onChangeText={setTaskName}
            />
            {showDatePicker && (
              <DateTimePicker
                value={taskDeadline}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || taskDeadline;
                  setTaskDeadline(currentDate);
                  if (selectedDate) {
                    setShowDatePicker(false); 
                  }
                }}

              />
            )}

            <View style={styles.buttonsContainerTasks}>
              <TouchableOpacity onPress={closeAddTasksModal} style={styles.button}>
                <Ionicons name="arrow-back" size={52} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={addTask} style={styles.button}>
                <Entypo name="add-to-list" size={50} color="lightgreen" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
                <Fontisto name="date" size={45} color="black" />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <Modal visible={dailyTasksModal} animationType="fade">

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={closeDailyTasksModal} style={styles.button}>
            <MaterialIcons name="cancel" size={52} color="red" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/*Lists*/}
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {lists.map((list, index) => (
          <ListItem key={index} item={list} index={index} />
        ))}
      </ScrollView>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: "#E6F7FF"
  },
  addListsButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '-42%',
    right: '-40%',
    zIndex: 1,
  },
  AddingListModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  AddingTasksModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,


  },
  InsideAddingTasksModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: '35%',
    padding: 20,
    width: '80%',
  },
  InsideAddingListModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: '5%',
    padding: 20,
    width: '80%',
  },
  input: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3399ff',
    padding: 10,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
  },
  inputTasks: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3399ff',
    padding: 10,
    fontSize: 16,
    bottom: '22%',
  },
  buttonsContainerTasks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 70,
    bottom: '65%',
  },

  button: {
    marginHorizontal: 10,

  },
  card: {
    width: '80%',
    aspectRatio: 4 / 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    position: 'relative',

  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollViewContent: {
    alignItems: 'flex-start',
    paddingBottom: 0,
    zIndex: -1

  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  tasksContainer: {
    maxHeight: 200,
    width: '120%',
    marginTop: 20,
    bottom: '25%',
    backgroundColor: '#E3F9E5',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    padding: 2,
  },
  task: {
    fontSize: 25,
    marginVertical: 5,
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    marginRight: 10,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    // opacity: 0.5,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
  },
  progressCircleContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  checkIconContainer: {
    position: 'absolute',
    top: '-9%',
    left: '58%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  datePicker: {
    marginTop: 10,
    width: 200,
  },
  taskDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadline: {
    fontSize: 14,
    marginLeft: 10,
    color: 'grey',
  },

})