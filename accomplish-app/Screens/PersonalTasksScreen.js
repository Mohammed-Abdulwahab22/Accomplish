import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Feather, Fontisto } from '@expo/vector-icons';
import MyProgressCircle from '../Components/ProgressCircle';
import { PieChart } from 'react-native-svg-charts'
import DateTimePicker from '@react-native-community/datetimepicker';
import DailyTasksScreen from '../Components/DailyTasksScreen';


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

  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    loadLists();
    console.log("loaded the lists of personal tasks screen.");
  }, [])

  useEffect(() => {
    saveLists();
    console.log("saved the lists of personal tasks screen.",lists);
  }, [lists])
  

  const loadLists = async () => {
    try {
      const storedLists = await AsyncStorage.getItem('lists');
      if (storedLists !== null) {
        const parsedLists = JSON.parse(storedLists);
        const listsWithDates = parsedLists.map(list => ({
          ...list,
          tasks: list.tasks.map(task => ({
            ...task,
            deadline: task.deadline ? new Date(task.deadline) : null,
          })),
        }));
        setLists(listsWithDates);
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
    setSelectedTask(null);
    console.log("deleted list at index: ", index);
  };

  const addList = () => {
    if (listName.trim() !== '') {
      setLists([...lists, { name: listName, tasks: [] }]);
      setListName('');
      closeAddListModal();
      setSelectedTask(null);
      console.log('added list: ', listName);
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
      console.log('added task: ', taskName , 'to list: ', lists[selectedListIndex].name);
    }
  };

  const toggleTaskCompletion = (listIndex, taskIndex) => {
    const newList = [...lists];
    newList[listIndex].tasks[taskIndex].completed = !newList[listIndex].tasks[taskIndex].completed;
    setLists(newList);
    console.log('completed task: ', lists[listIndex].tasks[taskIndex].name, 'in list: ', lists[listIndex].name);
  };

  const calculateProgress = (list) => {
    const totalTasks = list.tasks.length;
    const completedTasks = list.tasks.filter(task => task.completed).length;
    return totalTasks === 0 ? 0 : completedTasks / totalTasks;
  };

  const MAX_CHARACTERS = 9;

  const TaskItem = ({ task, listIndex, taskIndex }) => {
    const deadline = task.deadline ? new Date(task.deadline) : null;
    const isDeadlinePassed = deadline && deadline < new Date();

    const truncatedTaskName = task.name.length > MAX_CHARACTERS ? task.name.slice(0, MAX_CHARACTERS) + '...' : task.name;
  
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
  
  const openAddListModal = () => {
    setAddingListModal(true);
    setSelectedTask(null);
    console.log("opened adding list modal");
  };

  const closeAddListModal = () => {
    setAddingListModal(false);
    setSelectedTask(null);
    console.log("closed adding list modal");
  };

  const openAddTasksModal = (index) => {
    setSelectedListIndex(index);
    setAddingTasksModal(true);
    setSelectedTask(null);
    console.log("opened adding tasks modal");
  };

  const closeAddTasksModal = () => {
    setAddingTasksModal(false);
    setSelectedTask(null);
    console.log("closed adding tasks modal");
  };

  const openDailyTasksModal = () => {
    setDailyTasksModal(true);
    setSelectedTask(null);
    console.log("opened daily tasks modal");
  };

  const closeDailyTasksModal = () => {
    setDailyTasksModal(false);
    setSelectedTask(null);
    console.log("closed daily tasks modal");
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
      // onPress: () => toggleTaskCompletion(selectedListIndex, index),
      onPress: () => setSelectedTask(task),

    }));

    return { pieData, allCompleted: false };
  };
  const TaskDetailsBox = ({ task }) => {
    if (!task) return null;
  
    return (
      <View style={styles.taskDetailsBox}>
        <Text style={styles.taskDetailsText}>Task: {task.name}</Text>
        <Text style={styles.taskDetailsText}>Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</Text>
      </View>
    );
  };

  const BackgroundPress = ({ onPress }) => (
    <TouchableOpacity
      style={styles.backgroundPress}
      activeOpacity={1}
      onPress={onPress}
    />
  );
  const closeTaskDetailsBox = () => {
    setSelectedTask(null);
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
        <BackgroundPress onPress={closeTaskDetailsBox} />

          <View style={styles.InsideAddingTasksModalContainer}>
            <PieChart data={getPieChartData().pieData} style={{ height: 200, width: 200, top: '-35%' }} />
            {getPieChartData().allCompleted && (
              <View style={styles.checkIconContainer}>
                <Feather name="check-circle" size={50} color="green" />
              </View>
            )}
            {/* Tasks */}
            <TaskDetailsBox task={selectedTask} />

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
            <MaterialIcons name="cancel" size={35} color="red" />
          </TouchableOpacity>
        </View>
        <DailyTasksScreen />
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
    bottom: '66%',
    justifyContent: 'center',
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
    backgroundColor: '#EDE6E6',
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

  taskDetailsBox: {
    position: 'absolute',
    top: '5%',
    left: '28%',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  taskDetailsText: {
    fontSize: 16,
  },
  backgroundPress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  deadlinePassed: {
    color: 'red',
  },
  deadlineNotPassed:
  {
    color: 'green',
  }
})