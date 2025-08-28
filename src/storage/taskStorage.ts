import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const TASK_KEYS = "tasks";

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const data = await AsyncStorage.getItem(TASK_KEYS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erreur de chargement des tâches: ", error);
    return [];
  }
}

export const saveTasks = async (tasks: Task[]) => {
    try {
        await AsyncStorage.setItem(TASK_KEYS, JSON.stringify(tasks))
    } catch (error) {
        console.log("Erreur de sauvegarde des tâches: ", error);
    }
}