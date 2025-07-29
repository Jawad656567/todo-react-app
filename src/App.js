import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [loading, setLoading] = useState(false);

  // 📦 Fetch todos from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch todos:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add todo
  const handleAdd = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    try {
      const res = await axios.post('/api/todos', { text: trimmed });
      setTodos([res.data, ...todos]);
      setInput('');
    } catch (err) {
      console.error('❌ Failed to add todo:', err.message);
    }
  };

  // ✅ Toggle complete
  const handleToggle = async (id) => {
    try {
      const res = await axios.put(`/api/todos/${id}`);
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error('❌ Failed to update todo:', err.message);
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete todo:', err.message);
    }
  };

  // 🧠 Filtering logic
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 My Todo List</h1>

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={input}
          placeholder="Enter new task"
          onChange={e => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addBtn}>Add</button>
      </div>

      <div style={styles.filters}>
        <button
          style={filter === 'all' ? styles.activeBtn : styles.filterBtn}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          style={filter === 'pending' ? styles.activeBtn : styles.filterBtn}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          style={filter === 'completed' ? styles.activeBtn : styles.filterBtn}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <p>Loading todos...</p>
      ) : (
        <ul style={styles.list}>
          {filteredTodos.length === 0 ? (
            <p>No todos to show.</p>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo._id} style={styles.listItem}>
                <span
                  onClick={() => handleToggle(todo._id)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDelete(todo._id)}
                  style={styles.deleteBtn}
                >
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 10,
    background: '#fefefe',
    fontFamily: 'Arial',
  },
  heading: {
    textAlign: 'center',
    color: '#222',
  },
  inputGroup: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    border: '1px solid #aaa',
  },
  addBtn: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterBtn: {
    padding: '8px 14px',
    background: '#eee',
    border: '1px solid #ccc',
    borderRadius: 5,
    cursor: 'pointer',
  },
  activeBtn: {
    padding: '8px 14px',
    background: '#007bff',
    color: 'white',
    border: '1px solid #007bff',
    borderRadius: 5,
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#dc3545',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default App;
