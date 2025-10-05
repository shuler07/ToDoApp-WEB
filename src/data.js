const DEBUG = true;

export const API_ROUTES = DEBUG ? {
    authenticate: 'http://localhost:8000/authenticate_user',
    refresh: 'http://localhost:8000/refresh_user',
    register: 'http://localhost:8000/register',
    login: 'http://localhost:8000/login',
    signout: 'http://localhost:8000/signout',
    create_note: 'http://localhost:8000/create_new_note',
    get_notes: 'http://localhost:8000/get_notes',
    update_note: 'http://localhost:8000/update_note',
    delete_note: 'http://localhost:8000/delete_note'
} : {
    authenticate: 'https://todoapp-api-hy80.onrender.com/authenticate_user',
    refresh: 'https://todoapp-api-hy80.onrender.com/refresh_user',
    register: 'https://todoapp-api-hy80.onrender.com/register',
    login: 'https://todoapp-api-hy80.onrender.com/login',
    signout: 'https://todoapp-api-hy80.onrender.com/signout',
    create_note: 'https://todoapp-api-hy80.onrender.com/create_new_note',
    get_notes: 'https://todoapp-api-hy80.onrender.com/get_notes',
    update_note: 'https://todoapp-api-hy80.onrender.com/update_note',
    delete_note: 'https://todoapp-api-hy80.onrender.com/delete_note'
};

export const SECTION_NAME_BY_KEY = {
    not_completed: "Not completed",
    completed: "Completed",
    trash: 'Trash'
};

export const COLORS_BY_TAGS = {
    favorite: 'green',
    important: 'red'
};