import React from 'react';

const Header = ({ changeUser, data }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">
                {data ? `Welcome, ${data.email}` : 'Employee Management System'}
            </h1>
            <button
                onClick={changeUser}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full"
            >
                Logout
            </button>
        </div>
    );
};

export default Header;