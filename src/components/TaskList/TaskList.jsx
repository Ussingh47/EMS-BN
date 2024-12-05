import React, { useState } from 'react';
import { getLocalStorage, updateLocalStorage } from '../../utils/localStorage';

const TaskList = ({ data }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [note, setNote] = useState('');
    const storageData = getLocalStorage();
    const userTasks = storageData.tasks.filter(task => task.assignee === data.email);

    const handleStatusChange = (taskId, newStatus) => {
        const updatedTasks = storageData.tasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        
        storageData.tasks = updatedTasks;
        updateLocalStorage(storageData);
    };

    const handleNoteSubmit = (taskId) => {
        const timestamp = new Date().toLocaleString();
        const updatedTasks = storageData.tasks.map(task => {
            if (task.id === taskId) {
                const notes = task.notes || [];
                return {
                    ...task,
                    notes: [...notes, { text: note, timestamp }]
                };
            }
            return task;
        });
        
        storageData.tasks = updatedTasks;
        updateLocalStorage(storageData);
        setNote('');
        setSelectedTask(null);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
            {userTasks.map(task => (
                <div key={task.id} className="bg-gray-800 p-4 rounded">
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-gray-400 mb-2">{task.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                        <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            className="bg-gray-700 rounded p-1"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button
                            onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full text-sm"
                        >
                            {selectedTask === task.id ? 'Close Notes' : 'Add Note'}
                        </button>
                    </div>

                    {selectedTask === task.id && (
                        <div className="mt-4 space-y-3">
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Add your notes here..."
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                rows="3"
                            />
                            <button
                                onClick={() => handleNoteSubmit(task.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
                                disabled={!note.trim()}
                            >
                                Submit Note
                            </button>
                        </div>
                    )}

                    {task.notes && task.notes.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold text-sm text-gray-400 mb-2">Previous Notes:</h4>
                            <div className="space-y-2">
                                {task.notes.map((note, index) => (
                                    <div key={index} className="bg-gray-700 p-2 rounded text-sm">
                                        <p className="text-gray-300">{note.text}</p>
                                        <p className="text-xs text-gray-500 mt-1">{note.timestamp}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskList;