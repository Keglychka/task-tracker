import TaskItem from "./TaskItem";

export default function TaskList({tasks, onToggle, onDelete, onUpdate}) {
    if (tasks.length === 0) {
        return <div className="empty-state">Задач пока нет</div>
    }

    return (
        <div className="tasks-container">
        {tasks.map(task => (
            <TaskItem 
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            />
        ))}
        </div>
  );
}