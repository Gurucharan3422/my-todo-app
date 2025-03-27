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
        const response = await axios.get('https://my-todo-app-3iv4.onrender.com', {
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

  // Create a new task
  const handleCreateTask = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to create a task.');
      return;
    }
    if (!taskName || !description || !expectedTime) {
      alert('All fields are required!');
      return;
    }
    try {
      const newTask = { taskName, description, expectedTime };
      const response = await axios.post('https://my-todo-app-3iv4.onrender.com/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, response.data]);
      setTaskName('');
      setDescription('');
      setExpectedTime('');
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      alert(error?.response?.data?.message || 'Failed to create task');
    }
  };

  // Mark task as completed
  const handleMarkComplete = async (taskId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to update a task.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: 'completed' }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: 'completed' } : task));
      alert('Task marked as completed!');
    } catch (error) {
      console.error('Error marking task as complete:', error);
      alert(error?.response?.data?.message || 'Failed to update task');
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
                <button onClick={() => handleMarkComplete(task._id)}>
                  Mark as Completed
                </button>
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