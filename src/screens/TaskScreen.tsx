import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Pressable, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TaskItem from "../components/TaskItem";
import { Task } from "../types/task";
import { loadTasks, saveTasks } from "../storage/taskStorage";

const { width } = Dimensions.get("window");

const TaskScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => { loadTasks().then(setTasks); }, []);
  useEffect(() => { saveTasks(tasks); }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: taskText, done: false }]);
      setTaskText("");
    }
  };

  const toggleDone = (id: string) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
  const updateTask = (id: string, newText: string) => setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));

  const filteredTasks = tasks.filter(t => t.text.toLowerCase().includes(searchText.toLowerCase()));

  const dynamicFontSize = width * 0.045; // ajuste proportionnel à la largeur de l'écran

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: dynamicFontSize * 1.2 }]}>📝 Mes tâches</Text>
          <Pressable onPress={() => setShowSearch(!showSearch)}>
            <MaterialIcons 
              name={showSearch ? "add" : "search"} 
              size={28} 
              color="#fff" 
            />
          </Pressable>
        </View>

        {/* Barre de recherche ou ajout de tâche */}
        {showSearch ? (
          <TextInput
            style={[styles.input, { fontSize: dynamicFontSize }]}
            placeholder="Rechercher..."
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
        ) : (
          <>
            <TextInput
              style={[styles.input, { fontSize: dynamicFontSize }]}
              placeholder="Ajouter une tâche..."
              placeholderTextColor="#aaa"
              value={taskText}
              onChangeText={setTaskText}
              multiline
            />
            <Pressable style={styles.addButton} onPress={addTask}>
              <Text style={[styles.addButtonText, { fontSize: dynamicFontSize }]}>Ajouter</Text>
            </Pressable>
          </>
        )}

        {/* Liste */}
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              toggleDone={toggleDone}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#121212" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  title: { fontWeight: "bold", color: "#fff" },
  input: { borderBottomWidth: 1, borderBottomColor: "#555", marginBottom: 10, padding: 5, color: "#fff" },
  addButton: { backgroundColor: "#4DA6FF", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
});

export default TaskScreen;
