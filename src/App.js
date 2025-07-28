import React, { useState } from 'react';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setTodos([...todos, { text: trimmed, completed: false }]);
      setInput('');
    }
  };

  const handleToggle = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const handleDelete = (index) => {
    const filtered = todos.filter((_, i) => i !== index);
    setTodos(filtered);
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="container">
      <h1>✅ Todo Tracker</h1>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="todo-section">
        <h2>🕒 Pending Tasks</h2>
        {activeTodos.length === 0 && <p className="empty">No tasks to do!</p>}
        {activeTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={todos.indexOf(todo)}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="todo-section completed-section">
        <h2>✅ Completed Tasks</h2>
        {completedTodos.length === 0 && <p className="empty">Nothing completed yet.</p>}
        {completedTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={todos.indexOf(todo)}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
