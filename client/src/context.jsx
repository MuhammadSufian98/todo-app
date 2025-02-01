import React, { createContext, useState } from "react";
import axios from "axios";

export const TaskContext = createContext();

export const TODOProvider = ({ children }) => {
  const [Tasks, setTasks] = useState([]);
  const [SearchRN, setSearchRN] = useState("");
  const [FilterTask, setFilteredTasks] = useState([]);
  const [ChangeFilterTF, setChangeFilterTF] = useState(false);
  const [Task, setTask] = useState("");
  const [TaskImageSwitch, setTaskImageSwitch] = useState("MainPage");

  const GetTask = async () => {
    try {
      const GetToken = localStorage.getItem("Token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${GetToken}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };
  

  return (
    <TaskContext.Provider
      value={{
        Tasks,
        setTasks,
        SearchRN,
        setSearchRN,
        FilterTask,
        setFilteredTasks,
        ChangeFilterTF,
        setChangeFilterTF,
        Task,
        setTask,
        GetTask,
        TaskImageSwitch,
        setTaskImageSwitch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
