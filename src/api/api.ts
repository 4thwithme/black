import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig | undefined = { headers: { 'x-dark-token': sessionStorage.getItem('x-dark-token') }};


const loginUser = (name: string, pass: string) => axios.put('auth', { name, password: pass });

const logoutUser = () => axios.delete('auth', config);

const getAllUsers = () => axios.get('users', config);

const getAllChats = () => axios.get('chat', config);

const getChatTimeline = (chatId: string, limit: number, offset: number) => axios.get('chat/timeline',{...config, params: { chatId, limit, offset }});


export default {
  loginUser,
  logoutUser,
  getAllUsers,
  getAllChats,
  getChatTimeline,
}
