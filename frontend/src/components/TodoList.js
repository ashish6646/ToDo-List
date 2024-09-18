import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/TodoList.css'; // Import the CSS file

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueCategory, setDueCategory] = useState('Today');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterDueCategory, setFilterDueCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(data);
        setFilteredTodos(data);
      } catch (error) {
        console.error('Error fetching todos', error);
      }
    };
    fetchTodos();
  }, [token]);

  const addTodo = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/todos',
        { task: newTodo, priority, dueCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, data]);
      setNewTodo('');
      setPriority('Low');
      setDueCategory('Today');
      filterTodos(filterPriority, filterDueCategory);
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      filterTodos(filterPriority, filterDueCategory);
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  const filterTodos = (priority, dueCategory) => {
    let filtered = todos;
    if (priority) {
      filtered = filtered.filter((todo) => todo.priority === priority);
    }
    if (dueCategory) {
      filtered = filtered.filter((todo) => todo.dueCategory === dueCategory);
    }
    setFilteredTodos(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="todo-container">
      <button 
        className="logout" 
        onClick={handleLogout}
      >
        Logout
      </button>
      <h1>To-Do List Manager</h1>
      <div className="form-container">
        <input
          className="input-field"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Task"
        />
        <select
          className="input-field"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          className="input-field"
          value={dueCategory}
          onChange={(e) => setDueCategory(e.target.value)}
        >
          <option value="Today">By Today</option>
          <option value="Tomorrow">By Tomorrow</option>
          <option value="This Week">By This Week</option>
          <option value="This Month">By This Month</option>
        </select>
        <button 
          className="add-button" 
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <div className="filter-container">
        <select
          className="filter-field"
          value={filterPriority}
          onChange={(e) => {
            setFilterPriority(e.target.value);
            filterTodos(e.target.value, filterDueCategory);
          }}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          className="filter-field"
          value={filterDueCategory}
          onChange={(e) => {
            setFilterDueCategory(e.target.value);
            filterTodos(filterPriority, e.target.value);
          }}
        >
          <option value="">All Due Categories</option>
          <option value="Today">By Today</option>
          <option value="Tomorrow">By Tomorrow</option>
          <option value="This Week">By This Week</option>
          <option value="This Month">By This Month</option>
        </select>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <div className="todo-text">
              <div><span className="label">Task:</span> {todo.task}</div>
              <div><span className="label">Priority:</span> {todo.priority}</div>
              <div><span className="label">Due:</span> {todo.dueCategory}</div>
            </div>
            <button 
              className="delete-button" 
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
