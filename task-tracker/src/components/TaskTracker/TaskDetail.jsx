import './TaskTracker.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TaskDetail({ onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPriority, setEditPriority] = useState('low');
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = () => {
      const savedTasks = localStorage.getItem('taskTracker_tasks');
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const foundTask = tasks.find(t => t.id === taskId);
        setTask(foundTask);
      }
    }

    loadTask();
  }, [taskId])

  const handleSaveClick = () => {
    if (task) {
      onUpdate(task.id, {
        title: editTitle,
        description: editDesc,
        priority: editPriority,
      });
      setIsEditing(false);
      setTask({
        ...task,
        title: editTitle,
        description: editDesc,
        priority: editPriority
      });
    }
  }

  const handleCancelClick = () => {
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditPriority(task.priority);
    setIsEditing(false);
  }

  if (!task) {
    return (
      <div className="task-detail">
        <h2>Задача не найдена</h2>
        <button onClick={() => navigate('/')}>Назад к списку</button>
      </div>
    );
  }

  if(!isEditing) {
      return (
    <div className="task-detail">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Назад
      </button>
      
      <h1>{task.title}</h1>
      <p className="task-description">{task.description}</p>
      
      <div className="task-meta">
        <span className={`priority priority-${task.priority}`}>
          {task.priority === 'high' ? 'Высокий' : 
           task.priority === 'medium' ? 'Средний' : 'Низкий'}
        </span>
        
        <div className="task-date">
          Создана: {new Date(task.createdAt).toLocaleDateString()}
        </div>
        
        <div className="task-status">
          Статус: {task.completed ? '✅ Выполнена' : '🔄 В работе'}
        </div>
      </div>
      
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)}>
          Редактировать
        </button>
        <button onClick={() => onDelete(task.id)}>
          Удалить
        </button>
      </div>
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