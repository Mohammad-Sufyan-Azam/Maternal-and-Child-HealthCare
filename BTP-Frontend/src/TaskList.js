import React, { useState } from 'react';
import './TaskList.css';

const tasksData = [
  { id: 1, text: "Group 1 Add Phone Number", done: false },
  { id: 2, text: "Group 2 give weekly update", done: false },
  { id: 3, text: "Group 1 send updates", done: false },
  { id: 4, text: "Send brochure to both Groups", done: false },
];

const TaskList = () => {
  const [tasks, setTasks] = useState(tasksData);

  const handleCheckboxChange = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    }));
  };

  return (
    <div className="task-list">
      <h4 className="task-list-heading">Tasks</h4>
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => handleCheckboxChange(task.id)}
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`}>{task.text}</label>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
