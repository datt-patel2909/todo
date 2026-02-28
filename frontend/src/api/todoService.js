import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/todo';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTodos = async () => {
    const response = await apiClient.get('/');
    return response.data;
};

export const createTodo = async (todoData) => {
    const response = await apiClient.post('/', todoData);
    return response.data;
};

export const updateTodo = async (id, todoData) => {
    const response = await apiClient.patch(`/${id}`, todoData);
    return response.data;
};

export const deleteTodo = async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
};
