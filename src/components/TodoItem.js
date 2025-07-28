function TodoItem({ todo, index, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => onToggle(index)}>{todo.text}</span>
      <button onClick={() => onDelete(index)}>🗑️</button>
    </div>
  );
}

export default TodoItem;
