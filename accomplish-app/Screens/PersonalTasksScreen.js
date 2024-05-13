import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

export default function PersonalTasksScreen() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  const addList = () => {
    setLists([...lists, []]);
  };

  const addTask = (listIndex, taskName, duration) => {
    const newTask = { name: taskName, duration: duration };
    const updatedLists = [...lists];
    updatedLists[listIndex].push(newTask);
    setLists(updatedLists);
  };

  const renderGanttChart = (listIndex) => {
    return (
      <Svg width="100%" height="100">
        {lists[listIndex].map((task, index) => (
          <Rect
            key={index}
            x={index * 50} // adjust positioning as needed
            y={10}
            width={parseInt(task.duration) * 10} // adjust scaling as needed
            height={20}
            fill="blue"
          />
        ))}
      </Svg>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {lists.map((list, listIndex) => (
        <View key={listIndex}>
          <Text>List {listIndex + 1}</Text>
          <TouchableOpacity onPress={() => addTask(listIndex, "New Task", "1")}>
            <Text>Add Task</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Task Name"
            onChangeText={(text) => setTasks({ ...tasks, [listIndex]: { name: text, duration: tasks[listIndex]?.duration || "1" } })}
          />
          <TextInput
            placeholder="Duration (in days)"
            onChangeText={(text) => setTasks({ ...tasks, [listIndex]: { name: tasks[listIndex]?.name || "New Task", duration: text } })}
          />
          <View style={styles.ganttChartContainer}>{renderGanttChart(listIndex)}</View>
        </View>
      ))}
      <TouchableOpacity onPress={addList}>
        <Text>Add List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  ganttChartContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
