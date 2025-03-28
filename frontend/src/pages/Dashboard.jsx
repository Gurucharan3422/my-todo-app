import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [expectedTime, setExpectedTime] = useState('');

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found! Please log in.');
        return;
      }
      try {
        const response = await axios.get('https://my-todo-app-3iv4.onrender.com/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert(error?.response?.data?.message || 'Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  // Handle task creation
  const handleCreateTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to create a task.');
      return;
    }

    if (!taskName || !description || !expectedTime) {
      alert('Please fill out all fields!');
      return;
    }

    try {
      const response = await axios.post(
        'https://my-todo-app-3iv4.onrender.com/api/tasks',
        {
          taskName,
          description,
          expectedTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setTasks([...tasks, response.data]); // Add the newly created task to the state
        alert('Task created successfully!');
        setTaskName('');
        setDescription('');
        setExpectedTime('');
      } else {
        alert('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert(error?.response?.data?.message || 'Failed to create task');
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to delete a task.');
      return;
    }

    console.log(`Attempting to delete task with ID: ${taskId}`);
    const url = `https://my-todo-app-3iv4.onrender.com/api/tasks/${taskId}`;

    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          // If the task is deleted successfully, remove it from state
          setTasks(tasks.filter(task => task._id !== taskId));
          alert('Task deleted successfully!');
        } else {
          alert('Failed to delete task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert(error?.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  return (
    <div>
      <h1 style={{ color: '#4CAF50', display: 'inline' }}>Welcome to Guru Todo App</h1>
      <h1>Dashboard</h1>
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Expected Time (minutes)"
          value={expectedTime}
          onChange={(e) => setExpectedTime(e.target.value)}
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      <h2>Your Tasks</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id}>
              <p>Task Name: {task.taskName}</p>
              <p>Description: {task.description}</p>
              <p>Expected Time: {task.expectedTime} minutes</p>
              <p>Status: {task.status}</p>
              {task.status === 'pending' && (
                <>
                  {/* <button onClick={() => handleMarkComplete(task._id)}>Mark as Completed</button> */}
                  <button 
                    onClick={() => handleDeleteTask(task._id)} 
                    style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                    Delete Task
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;