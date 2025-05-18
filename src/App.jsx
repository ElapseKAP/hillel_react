import { useEffect, useState, useReducer } from "react";
import SelectField from "components/SelectField/SelectField";

import services from "./services/tasksAPI";
import { existStatus, generateStatusCode, groupByStatus, updateTaskList } from "./utils/helpers";
import { STATUS_TODO, STATUS_IN_PROGRESS, STATUS_DONE } from "./constants/tasks";
import Buttons from "components/Buttons/Buttons";

const InitialArg = {
  [STATUS_TODO]: { name: "To Do" },
  [STATUS_IN_PROGRESS]: { name: "In Progress" },
  [STATUS_DONE]: { name: "Done" },
};

const initStatuses = (initial) => {
  const mapString = localStorage.getItem("statusMap");

  return mapString ? JSON.parse(mapString) : initial;
};

const reducer = (state, action) => {
  let status = { ...state };

  switch (action.type) {
    case "create_status":
      if (!existStatus(state, action.name)) {
        let code = generateStatusCode();
        status = { ...state, [code]: { name: action.name } };
      }
      break;
    case "delete_status":
      if (action.code < 3) {
        return state;
      }
      delete state[action.code];
      status = { ...state };
      break;
    default:
      status = state;
      break;
  }

  return status;
};

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "" });
  const [newStatus, setNewStatus] = useState("");
  const [deletedStatus, setDeletedStatus] = useState("");
  const [statusMap, dispatch] = useReducer(reducer, InitialArg, initStatuses);

  const fetchData = async function () {
    let data = await services.get("tasks");
    data = groupByStatus(data);
    setTaskList(data);
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitCreateTask = (e) => {
    e.preventDefault();
    services.post("tasks", newTask);
    setNewTask({ title: "", status: "" });
  };

  const handleStatusField = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmitCreateStatus = (e) => {
    e.preventDefault();
    dispatch({ type: "create_status", name: newStatus });
    setNewStatus("");
  };

  const handleSelectField = (e) => {
    setDeletedStatus(e.target.value);
  };

  const handleSubmitDeleteStatus = (e) => {
    e.preventDefault();
    dispatch({ type: "delete_status", code: deletedStatus });
    setDeletedStatus("");
  };

  const handleBtnClick = (e) => {
    const status = e.target.getAttribute("data-status-name");
    const taskId = e.target.getAttribute("data-id");

    if (typeof +status == "number" && typeof +taskId == "number") {
      let data = updateTaskList(+status, +taskId, taskList);
      setTaskList(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("statusMap", JSON.stringify(statusMap));
  }, [statusMap]);

  useEffect(() => {
    fetchData();
  }, [newTask]);

  return (
    <div className="task-manager-section">
      <div className="create-form-wrapper">
        <h2 className="title">Create new task</h2>
        <form id="createTask" className="create-task-form" onSubmit={handleSubmitCreateTask}>
          <div className="text-field title">
            <label htmlFor="titleField">Title:</label>
            <input
              type="text"
              id="titleField"
              name="title"
              value={newTask.title}
              onChange={handleInputField}
            />
          </div>

          <div className="select-field status">
            <label htmlFor="statusField">Status:</label>
            <select
              id="statusField"
              className="status-field"
              name="status"
              defaultValue={newTask.status}
              onChange={handleInputField}
              required
            >
              <option value="" disabled={true}>
                Choose a status
              </option>
              {Object.keys(statusMap).map((statusCode) => (
                <option key={statusCode} value={statusCode}>
                  {statusMap[statusCode].name}
                </option>
              ))}
            </select>
          </div>

          <div className="btn-wrapper">
            <button type="submit" className="btn-submit" disabled={!newTask.status}>
              Create Task
            </button>
          </div>
        </form>
      </div>

      <div className="status-form-wrapper">
        <h2 className="title">Create status</h2>
        <form className="create-status-form" id="createStatus" onSubmit={handleSubmitCreateStatus}>
          <div className="text-field status-title">
            <label htmlFor="statusTitle">Status name</label>
            <input
              type="text"
              className="status-title-field"
              id="statusTitle"
              name="statusName"
              value={newStatus}
              onChange={handleStatusField}
            />
          </div>

          <div className="btn-wrapper">
            <button type="submit">Create new Status</button>
          </div>
        </form>

        <div className="statuses-list">
          <p>Existing statuses list</p>
        </div>
      </div>

      <div className="delete-status-form-wrapper">
        <h2 className="title">Delete status</h2>
        <form className="delete-status-form" id="createStatus" onSubmit={handleSubmitDeleteStatus}>
          <div className="select-field status">
            <label htmlFor="status">Status Code:</label>

            <SelectField
              data={statusMap}
              disabledTitle={"Choose the status to delete"}
              attrs={{
                id: "status",
                className: "status-name-field",
                name: "deleteStatus",
                required: true,
              }}
              value={deletedStatus}
              handleSelect={handleSelectField}
            />
          </div>

          <div className="btn-wrapper">
            <button type="submit">Delete Status</button>
          </div>
        </form>
      </div>

      {taskList && (
        <div className="tasks-wrapper" style={{ "--columns": `${Object.keys(taskList).length}` }}>
          {Object.keys(taskList).map((status) => (
            <ul key={status} className={`task-list status-${status}`}>
              {taskList[status].map((task) => (
                <li key={task.id}>
                  <strong>{task.title}</strong>
                  <Buttons
                    taskStatus={task.status}
                    taskId={task.id}
                    statusMap={statusMap}
                    onBtnClick={handleBtnClick}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
