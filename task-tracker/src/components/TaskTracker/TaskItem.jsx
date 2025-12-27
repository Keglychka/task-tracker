import './TaskTracker.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);
  const navigate = useNavigate();

  const handleSaveClick = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDesc,
      priority: editPriority,
    })
    setIsEditing(false);
  }

  const handleCancelClick = () => {
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditPriority(task.priority);
    setIsEditing(false);
  }

  if(!isEditing) {
      return (
      <div className={`task-item ${task.completed ? 'completed' : ''}`}>
        <div className="task-content">
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id)}
            className="task-checkbox"
          />
          <div className="task-text">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <span className={`priority priority-${task.priority}`}>
              {task.priority === 'high' ? 'Высокий' : 
              task.priority === 'medium' ? 'Средний' : 'Низкий'}
            </span>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="delete-btn"
          aria-label="Редактировать задачу"
        >
          ✎
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="delete-btn"
          aria-label="Удалить задачу"
        >
          🗑
        </button>
        <button className='delete-btn' onClick={() => navigate(`/tasks/${task.id}`)}>Открыть</button>
      </div>
    );
  }

  return(
    <section className='task-form'>
      <label htmlFor='task-title'>Заголовок задачи:</label>
        <input required type='text' id='task-title' name='task-title' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        <label htmlFor='task-desc'>Описание задачи</label>
        <textarea type='text' id='task-desc' name='task-desc' value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
        <label htmlFor='task-priority'>Приоритет задачи:</label>
        <select id='task-priority' name='task-priority' value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
          <option value='low'>Низкий</option>
          <option value='medium'>Средний</option>
            <option value='high'>Высокий</option>
        </select>

      <button onClick={handleSaveClick}>Сохранить</button>
      <button onClick={handleCancelClick}>Отмена</button>
    </section>
  )
  
}