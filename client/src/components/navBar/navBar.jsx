import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./navBarStyles.css";
import { TaskContext } from "../../context.jsx";
import { toast } from "react-toastify";

function NavBar() {
  const {
    SearchRN,
    setFilteredTasks,
    Tasks,
    Task,
    setTask,
    GetTask,
    TaskImageSwitch,
    setTaskImageSwitch,
  } = useContext(TaskContext);
  const [fieldRN, setFieldRN] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const apiUrl = import.meta.env.VITE_FRONTEND_ROUTES;

  useEffect(() => {
    setCurrentDate(new Date().toDateString());

    if (SearchRN) {
      const filtered = Tasks.filter(
        (task) => task.roll_no.toString() === SearchRN
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(Tasks);
    }
  }, [SearchRN, Tasks, setFilteredTasks]);

  async function handleTaskSave() {
    const newTask = { Task, ID: fieldRN };
    try {
      await axios.post(`${apiUrl}/api/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      GetTask();
      setTask("");
    } catch (err) {
      toast.error("Error saving tasks", {
        className: "toast",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="Test">
      <div className="MainBody">
        <div className="AppLogo">
          <h1>TO-DO APP</h1>
          <p id="currentDate">{currentDate}</p>
        </div>
        <div className="Divider"></div>
        <div className="ProfileDiv">
          <h1>Muhammad Sufian</h1>
        </div>
        <div className="Divider"></div>
        <div className="Image-Tasks-Switch">
          <button
            className="SubmitBTN"
            onClick={() => setTaskImageSwitch("MainPage")}
          >
            Tasks
          </button>
        </div>

        <div
          className={
            TaskImageSwitch != "MainPage"
              ? "Display-none"
              : "SearchBar-RollNoDiv"
          }
        >
          <input
            className="SearchBar"
            type="text"
            placeholder="Enter roll no"
            value={fieldRN}
            onChange={(e) => setFieldRN(e.target.value)}
          />
          <input
            className="SearchBar"
            type="text"
            onChange={(e) => setTask(e.target.value)}
            value={Task}
            placeholder="Add new task"
          />
          <button onClick={handleTaskSave} className="SubmitBTN">
            Submit
          </button>
        </div>
      </div>
      <div className="DividerCustom"></div>
    </div>
  );
}

export default NavBar;
