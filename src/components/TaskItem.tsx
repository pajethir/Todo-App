import React, { useState } from "react";
import { Text, Pressable, StyleSheet, TextInput, View, Dimensions } from "react-native";
import { Task } from "../types/task";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  task: Task;
  toggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

const { width } = Dimensions.get("window");
const dynamicFontSize = width * 0.045;

const TaskItem: React.FC<Props> = ({ task, toggleDone, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleSave = () => {
    onUpdate(task.id, text.trim() || task.text); 
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.textContainer} onPress={() => toggleDone(task.id)}>
        {isEditing ? (
          <TextInput
            style={[styles.input, task.done && styles.doneText, { fontSize: dynamicFontSize }]}
            value={text}
            onChangeText={setText}
            onBlur={handleSave}
            autoFocus
            multiline
            placeholder="Modifier la tâche..."
            placeholderTextColor="#aaa"
          />
        ) : (
          <Text style={[styles.text, task.done && styles.doneText, { fontSize: dynamicFontSize }]}>
            {task.text}
          </Text>
        )}
      </Pressable>

      <View style={styles.actions}>
        <Pressable onPress={() => setIsEditing(!isEditing)}>
          <MaterialIcons 
            name={isEditing ? "check" : "edit"}
            size={24} 
            color={isEditing ? "green" : "#4DA6FF"} 
          />
        </Pressable>
        <Pressable onPress={() => onDelete(task.id)}>
          <MaterialIcons name="delete" size={24} color="#FF6B6B" /> 
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderColor: "#333",
    backgroundColor: "#1E1E1E",
    borderRadius: 6,
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: "#fff",
  },
  input: {
    color: "#fff",
    borderBottomWidth: 1,
    borderColor: "#555",
    padding: 2,
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
  },
});

export default TaskItem;
