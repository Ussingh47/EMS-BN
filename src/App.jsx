import React, { useState, useContext } from 'react';

import Login from './components/Auth/Login';
import AdminDashboard from './components/dashboard/AdminDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import { AuthContext } from './context/AuthProvider';
import { getLocalStorage } from './utils/localStorage';


const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useContext(AuthContext);

    const handleLogin = (email, password) => {
        const data = getLocalStorage();
        const user = data.employees.find(emp => 
            emp.email === email && emp.password === password
        );

        if (user) {
            setCurrentUser(user);
        } else if (email === 'admin@gmail.com' && password === 'admin123') {
            setCurrentUser({ role: 'admin', email: 'admin@gmail.com' });
        } else {
            throw new Error('Invalid credentials!');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    if (!currentUser) {
        return <Login handleLogin={handleLogin} />;
    }

    return currentUser.role === 'admin' ? (
        <AdminDashboard changeUser={handleLogout} />
    ) : (
        <EmployeeDashboard changeUser={handleLogout} data={currentUser} />
    );
};

export default App;