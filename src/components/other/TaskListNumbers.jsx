import React from 'react';
import { getLocalStorage } from '../../utils/localStorage';

const TaskListNumbers = ({ data }) => {
    const storageData = getLocalStorage();
    const userTasks = storageData.tasks.filter(task => task.assignee === data.email);
    
    const counts = {
        total: userTasks.length,
        pending: userTasks.filter(task => task.status === 'pending').length,
        inProgress: userTasks.filter(task => task.status === 'in-progress').length,
        completed: userTasks.filter(task => task.status === 'completed').length
    };

    return (
        <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold">Total Tasks</h3>
                <p className="text-2xl font-bold text-emerald-500">{counts.total}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold">Pending</h3>
                <p className="text-2xl font-bold text-yellow-500">{counts.pending}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold">In Progress</h3>
                <p className="text-2xl font-bold text-blue-500">{counts.inProgress}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold">Completed</h3>
                <p className="text-2xl font-bold text-green-500">{counts.completed}</p>
            </div>
        </div>
    );
};

export default TaskListNumbers;