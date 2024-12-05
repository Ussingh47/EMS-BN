import React, { useState } from 'react';
import { getLocalStorage, updateLocalStorage } from '../../utils/localStorage';

const CreateEmployee = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = getLocalStorage();
        
        // Check if email already exists
        if (data.employees.some(emp => emp.email === email)) {
            setMessage('Email already exists!');
            return;
        }

        const newEmployee = {
            id: Date.now(),
            email,
            password,
            name,
            role: 'employee'
        };

        data.employees.push(newEmployee);
        updateLocalStorage(data);
        
        setEmail('');
        setPassword('');
        setName('');
        setMessage('Employee created successfully!');
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Employee</h2>
            {message && (
                <div className={`p-3 rounded mb-4 ${message.includes('successfully') ? 'bg-green-600' : 'bg-red-600'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Employee Name"
                    className="w-full p-2 rounded bg-gray-800"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Employee Email"
                    className="w-full p-2 rounded bg-gray-800"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Employee Password"
                    className="w-full p-2 rounded bg-gray-800"
                    required
                />
                <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full"
                >
                    Create Employee
                </button>
            </form>
        </div>
    );
};

export default CreateEmployee;