import './TaskTracker.css'
import { useState } from 'react'

export default function TaskPriorityFilter({ selectedPriorities, onPriorityToggle, sortOrder, setSortOrder }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSortOrder = () => {
        if (sortOrder === null) {
            setSortOrder('oldest');
        } else if (sortOrder === 'oldest') {
            setSortOrder('newest');
        } else if (sortOrder === 'newest') {
            setSortOrder(null);
        }
    };

    const getButtonText = () => {
        if (sortOrder === null) return "По дате создания";
        if (sortOrder === 'oldest') return "По дате создания ▼";
        if (sortOrder === 'newest') return "По дате создания ▲";
    };

    return (
        <div className='priority-dropdown'>
            <button className='dropdown-button' onClick={() => setIsOpen(!isOpen)}>
                <span>Фильтры {isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <label className="dropdown-item">
                        <input
                        type="checkbox"
                        checked={selectedPriorities.includes('high')}
                        onChange={() => onPriorityToggle('high')}
                        />
                        <span className="priority-high">Высокий приоритет</span>
                    </label>
                    
                    <label className="dropdown-item">
                        <input
                        type="checkbox"
                        checked={selectedPriorities.includes('medium')}
                        onChange={() => onPriorityToggle('medium')}
                        />
                        <span className="priority-medium">Средний приоритет</span>
                    </label>

                    <label className="dropdown-item">
                        <input
                        type="checkbox"
                        checked={selectedPriorities.includes('low')}
                        onChange={() => onPriorityToggle('low')}
                        />
                        <span className="priority-low">Низкий приоритет</span>
                    </label>
                    <div>
                        <label className='dropdown-item'>
                            <button className='sort-button' onClick={toggleSortOrder}><span>{getButtonText()}</span></button>
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
}