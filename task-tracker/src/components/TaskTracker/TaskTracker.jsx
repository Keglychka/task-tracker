import './TaskTracker.css'
import TaskForm from './TaskForm'
import useTasks from './useTasks';
import TaskList from './TaskList';
import TaskSearch from './TaskSearch';
import TaskFilter from './TaskFilter';
import { useState } from 'react';

export default function TaskTracker () {
  const [showForm, setShowForm] = useState(false);

    const { 
    tasks, 
    loading, 
    error,
    searchQuery,
    filteredTasks,
    selectedPriority,
    sortOrder,
    setSortOrder,
    setSelectedPriority,
    togglePriority,
    setSearchQuery,
    createTask, 
    toggleTask, 
    deleteTask,
    updateTask,
  } = useTasks();
  
  if (loading) {
    return <div className="loading">Загрузка задач...</div>;
  }
  
  if (error) {
    return <div className="error">Ошибка: {error.message}</div>;
  }

    return (
    <div className='task-tracker'>
      <header className='task-header'>
        <h1>Task Tracker</h1>

        <div className="stats">
          {tasks.filter(t => t.completed).length}/{tasks.length} задач выполнено
        </div>
      </header>

      <TaskSearch 
          query={searchQuery}
          setQuery={setSearchQuery}
      />

      <button className='toggle-form-btn' onClick={() => setShowForm(!showForm)}>Создать задачу</button>
      {showForm && <TaskForm onSubmit={createTask} />}

      <TaskFilter 
      selectedPriorities={selectedPriority}
      onPriorityToggle={togglePriority}
      onSelectAll={() => setSelectedPriority([])}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
      
      <section className='task-list-container'>
        <h2>Ваши задачи:</h2>
        <TaskList 
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </section>
    </div>
  );
}