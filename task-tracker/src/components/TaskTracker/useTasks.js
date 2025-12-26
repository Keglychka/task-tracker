import { useState, useEffect, useRef, useMemo } from "react"

export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriority, setSelectedPriority] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);

    const isFirstLoad = useRef(true);

    useEffect(() => {
        try {
            setLoading(true);
            const savedTasks = localStorage.getItem('taskTracker_tasks');
            
            if (savedTasks) {
                const parsedTasks = JSON.parse(savedTasks);
                if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
                    setTasks(parsedTasks);
                }
            }
            
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
            console.error('Ошибка загрузки задач:', e);
        }
        
        isFirstLoad.current = false;
    }, []);

    useEffect(() => {
        if (isFirstLoad.current) {
            return;
        }
        
        if (tasks.length === 0) {
            return;
        }
        
        try {
            localStorage.setItem('taskTracker_tasks', JSON.stringify(tasks));
        } catch (e) {
            setError(e);
            console.error('Ошибка сохранения задач:', e);
        }
    }, [tasks]);

    function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    function createTask(taskData) {
        const newTask = {
            id: generateId(),
            title: taskData.title,
            description: taskData.desc || '',
            completed: false,
            createdAt: new Date().toISOString(),
            priority: taskData.priority || 'low',
        };
        
        setTasks(prevTasks => [...prevTasks, newTask]);
        return newTask;
    }

    function updateTask(id, updates) {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === id 
                    ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                    : task
            )
        );
    }

    function deleteTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        return true;
    }

    function toggleTask(id) {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === id 
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(searchQuery);
        }, 700);
        
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredTasks = useMemo(() => {
        let result = tasks;
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(task => 
                task.title.toLowerCase().includes(query)
            );
        }
        
        if (selectedPriority.length > 0) {
            result = result.filter(task => 
                selectedPriority.includes(task.priority)
            );
        }

        if (sortOrder === 'newest') {
            result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else if (sortOrder === "oldest") {
            result = [...result].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }
        
        return result;
    }, [tasks, searchQuery, selectedPriority, sortOrder]);

    const togglePriority = (priority) => {
    if (selectedPriority.includes(priority)) {
        setSelectedPriority(prev => prev.filter(p => p !== priority));
    } else {
        setSelectedPriority(prev => [...prev, priority]);
    }
};

    return {
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
        updateTask,
        deleteTask,
        toggleTask,
    };
}