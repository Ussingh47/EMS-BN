export const setLocalStorage = () => {
    if (!localStorage.getItem('ems-data')) {
        const initialData = {
            employees: [
                {
                    id: 1,
                    email: 'employee@test.com',
                    password: 'employee123',
                    role: 'employee',
                    name: 'Test Employee'
                }
            ],
            tasks: []
        };
        localStorage.setItem('ems-data', JSON.stringify(initialData));
    }
};

export const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('ems-data'));
};

export const updateLocalStorage = (data) => {
    localStorage.setItem('ems-data', JSON.stringify(data));
};