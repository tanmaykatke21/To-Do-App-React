import { useState, useRef } from 'react';
import './App.css'; // Ensure this path points to your CSS file

function ToDo() {
  const rTask = useRef("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]); // Array to store tasks with their checked state

  const hTask = (event) => {
    setTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();

    if (task === "") {
      alert("Task cannot be blank");
      rTask.current.focus();
      return;
    }
    if (task.trim() === "") {
      alert("Task cannot contain only spaces");
      setTask("");
      rTask.current.focus();
      return;
    }
    // Add new task to the tasks array with initial checked state as false
    setTasks([...tasks, { text: task, checked: false }]);
    setTask(""); // Clear the input field after adding the task
  };

  const handleCheckboxChange = (index) => {
    const newTasks = tasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return { ...task, checked: !task.checked };
      }
      return task;
    });
    setTasks(newTasks);
  };

  // Separate tasks into uncompleted and completed
  const uncompletedTasks = tasks.filter(task => !task.checked);
  const completedTasks = tasks.filter(task => task.checked);

  return (
    <>
      <center>
        <div className="container">
          <h1 class="head">To Do List</h1>
        </div>
        <form onSubmit={addTask}>
          <div className="container">
            <input type="text" placeholder="Enter task" className="inputs" onChange={hTask} ref={rTask} value={task}/>
            <input type="submit" value="Add Task" className="inputs" />
          </div>
        </form>
        {uncompletedTasks.map((task, index) => (
          <div key={index} className="tasks">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(tasks.indexOf(task))}
              checked={task.checked}
            />
            <span className={task.checked ? 'strikethrough' : ''}>
              {task.text}
            </span>
          </div>
        ))}
        {completedTasks.map((task, index) => (
          <div key={index + uncompletedTasks.length} className="tasks">
            <input type="checkbox" onChange={() => handleCheckboxChange(tasks.indexOf(task))} checked={task.checked}/>
            <span className={task.checked ? 'strikethrough' : ''}>
              {task.text}
            </span>
          </div>
        ))}
      </center>
    </>
  );
}

export default ToDo;
