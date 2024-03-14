//final
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import { Input, CheckBox, Button, Text, Stack } from 'react-native-elements'; 


export default function App() {
  const [tasks, setTasks] = useState([
    { id: "1", description: "Task 1", completed: false },
    { id: "2", description: "Task 2", completed: true }
  ]);

  const [newTaskDescription, setNewTaskDescription] = useState("");

  const addTask = () => {
    if (newTaskDescription.trim() !== "") {
      const newTask = {
        id: String(Date.now()),
        description: newTaskDescription,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskDescription("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderItem = ({ item }) => (
    <View style={item.completed ? styles.completedTask : styles.task}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text style={item.completed ? styles.completedText : styles.taskText}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter task description"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 25
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  completedTask: {
    flexDirection: 'row',
    alignItems: 'center',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  taskText: {
    marginLeft: 10
  },
  completedText: {
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
});
