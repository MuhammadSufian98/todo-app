import React, { useEffect, useState, useContext } from "react";
import "./mp.css";
import Delete from "./delete.png";
import Edit from "./pen.png";
import axios from "axios";
import { TaskContext } from "../../context.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MainPage() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_FRONTEND_ROUTES;

  const {
    Tasks,
    GetTask,
    FilterTask,
    ChangeFilterTF,
    setChangeFilterTF,
    setSearchRN,
    Task,
    setTask,
  } = useContext(TaskContext);

  useEffect(() => {
    GetTask();
  }, []);

  const [fieldSB, setFieldSB] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");
  const [displayedTasksCount, setDisplayedTasksCount] = useState(Tasks.length);

  useEffect(() => {
    setDisplayedTasksCount(ChangeFilterTF ? Tasks.length : FilterTask.length);
  }, [ChangeFilterTF, FilterTask, Tasks]);

  const handleDelete = async (taskId) => {
    try {
      const GetToken = localStorage.getItem("Token");

      await axios.delete(`${apiUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${GetToken}`,
        },
      });
      GetTask();
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  const ToEditFunction = async (event) => {
    if (event.key === "Enter" && editTaskId) {
      try {
        const GetToken = localStorage.getItem("Token");

        await axios.patch(
          `${apiUrl}/tasks/${editTaskId}`,
          {
            Task: editTaskValue,
          },
          {
            headers: {
              Authorization: `Bearer ${GetToken}`,
            },
          }
        );
        console.log("Task updated successfully");
        setEditTaskId(null);
        setEditTaskValue("");
        GetTask();
      } catch (err) {
        console.log("Error updating task:", err);
      }
    }
  };

  const Cancel = () => {
    setEditTaskId(null);
    setEditTaskValue("");
  };

  const ChangeClass = (taskId, taskValue) => {
    setEditTaskId(taskId);
    setEditTaskValue(taskValue);
  };

  function handleChangeSB(event) {
    if (event.key === "Enter") {
      const searchValue = event.target.value;
      setSearchRN(searchValue);
      setChangeFilterTF(false);
    }
  }

  function LogOut() {
    localStorage.removeItem("Token");
    navigate("/");
    toast.success("Logged out", {
      className: "toast",
      autoClose: 3000,
    });
  }

  const renderTasks = (tasks) => {
    return tasks.map((taskSaved, index) => (
      <div className={`TaskRender-BTN-Outter`} key={index}>
        <div className={`TaskRender-BTN`}>
          <div className="TaskRender">
            <p>{taskSaved.roll_no}</p>
            <p>{taskSaved.Task}</p>
          </div>
          <div className="Edit-Del-Div">
            {editTaskId === taskSaved._id && (
              <div className="EditDiv">
                <div className="EditHeading">
                  <h1>EDIT</h1>
                  <p>Editing Task: {editTaskValue}</p>
                </div>
                <div className="InputEdit">
                  <input
                    className="SearchBarCustom"
                    type="text"
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)}
                    onKeyDown={ToEditFunction}
                    placeholder="Edit task"
                  />
                  <button onClick={Cancel} className="BTNstyling">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <img
              src={Edit}
              onClick={() => ChangeClass(taskSaved._id, taskSaved.Task)}
              alt="Edit"
              className="ShowDivEdit"
            />
            <img
              src={Delete}
              onClick={() => handleDelete(taskSaved._id)}
              alt="Delete"
              className="ShowDivEdit"
            />
          </div>
        </div>
        <div className="divider"></div>
      </div>
    ));
  };

  return (
    <div className="MainMostOutter">
      <div className="MainOutter">
        <div className="Search-TasksNo">
          <div className="NoOfTasksOutter">
            <div className="NoOfTasks">
              <p>Number of tasks currently showing:</p>
              <p>{displayedTasksCount}</p>
            </div>
          </div>
          <div className="SubmitDiv">
            <input
              className="SearchBarCustom"
              type="text"
              placeholder="Search by Roll no"
              onKeyDown={handleChangeSB}
              onChange={(e) => setFieldSB(e.target.value)}
              value={fieldSB}
            />
            <button onClick={LogOut} className="BTNstyling">
              Log out
            </button>
          </div>
        </div>

        <div className="TaskDiv">
          {ChangeFilterTF ? renderTasks(Tasks) : renderTasks(FilterTask)}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
