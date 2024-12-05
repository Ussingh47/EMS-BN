import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { getLocalStorage, updateLocalStorage } from '../../utils/localStorage';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [userData, setUserData] = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = getLocalStorage();
        
        const newTask = {
            id: Date.now(),
            title,
            description,
            assignee,
            status: 'pending'
        };

        data.tasks.push(newTask);
        updateLocalStorage(data);
        setUserData(data.employees);
        
        setTitle('');
        setDescription('');
        setAssignee('');
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    className="w-full p-2 rounded bg-gray-800"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                    className="w-full p-2 rounded bg-gray-800"
                    required
                />
                <input
                    type="email"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    placeholder="Assignee Email"
                    className="w-full p-2 rounded bg-gray-800"
                    required
                />
                <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default CreateTask;