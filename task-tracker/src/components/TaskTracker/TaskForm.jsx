import './TaskTracker.css';
import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('low');

    const handleSubmitClick = e => {
        e.preventDefault();

        const taskData = {
            title: title,
            desc: desc,
            priority: priority,
        }

        onSubmit(taskData);

        setTitle('');
        setDesc('');
        setPriority('low');
    }

    return (
        <section className='task-form' >
            <h2>Добавить новую задачу</h2>
                <form onSubmit={handleSubmitClick}>
                    <label htmlFor='task-title'>Заголовок задачи:</label>
                    <input required type='text' id='task-title' name='task-title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor='task-desc'>Описание задачи</label>
                    <textarea type='text' id='task-desc' name='task-desc' value={desc} onChange={(e) => setDesc(e.target.value)} />
                    <label htmlFor='task-priority'>Приоритет задачи:</label>
                    <select id='task-priority' name='task-priority' value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value='low'>Низкий</option>
                        <option value='medium'>Средний</option>
                        <option value='high'>Высокий</option>
                    </select>

                    <button type='submit'>Создать задачу</button>
                </form>
        </section>
    )
}