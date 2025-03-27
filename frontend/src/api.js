import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-todo-app-3iv4.onrender.com',
});

export default instance;

export const loginUser = async (data) => {
  try {
    const response = await instance.post('/auth/login', data);
    return response;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await instance.post('/auth/register', data);
    return response;
  } catch (error) {
    console.error('Register API Error:', error);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await instance.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error('Get Profile API Error:', error);
    throw error;
  }
};