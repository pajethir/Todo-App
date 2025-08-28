import React from "react";
import TaskScreen from "./src/screens/TaskScreen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <TaskScreen />
      <StatusBar style="auto" />
    </>
  );
}
