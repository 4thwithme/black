import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig | undefined = { headers: { 'x-dark-token': sessionStorage.getItem('x-dark-token') } };


const loginUser = (name: string, pass: string) => axios.put('auth', { name, password: pass });

const logoutUser = () => axios.delete('auth', config);

const getAllUsers = () => axios.get('users', config);

const getAllChats = () => axios.get('chat', config);

const getChatTimeline = (chatId: string) => axios.get(`chat/${chatId}`, config);


export default {
  loginUser,
  logoutUser,
  getAllUsers,
  getAllChats,
  getChatTimeline,
}
