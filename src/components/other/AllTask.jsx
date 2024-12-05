import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { getLocalStorage, updateLocalStorage } from '../../utils/localStorage';

const AllTask = () => {
    const [userData, setUserData] = useContext(AuthContext);
    const data = getLocalStorage();

    const handleStatusChange = (taskId, newStatus) => {
        const updatedTasks = data.tasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        
        data.tasks = updatedTasks;
        updateLocalStorage(data);
        setUserData(data.employees);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
            <div className="space-y-4">
                {data.tasks.map(task => (
                    <div key={task.id} className="bg-gray-800 p-4 rounded">
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-gray-400 mb-2">{task.description}</p>
                        <p className="text-sm text-gray-500 mb-2">Assigned to: {task.assignee}</p>
                        <div className="flex items-center gap-4">
                            <select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                className="bg-gray-700 rounded p-1"
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        
                        {task.notes && task.notes.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-sm text-gray-400 mb-2">Employee Notes:</h4>
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
        </div>
    );
};

export default AllTask;