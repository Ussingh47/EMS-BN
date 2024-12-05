import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
import CreateEmployee from '../other/CreateEmployee';

const AdminDashboard = (props) => {
    return (
        <div className='h-screen w-full p-7 overflow-y-auto'>
            <Header changeUser={props.changeUser} />
            <CreateEmployee />
            <CreateTask />
            <AllTask />
        </div>
    );
};

export default AdminDashboard;