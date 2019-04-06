import axios from 'axios';

export const getTimers = () => {
    return axios.get('/api/timers')
  };

export const getUserTimers = id => {
    return axios.get(`/api/timers/user/${id}`)
};

export const postTimer = data => {
    return axios.post('/api/timers/', data)
};

export const storeSession = id => {
    return axios.post('/api/session/', id);
};

export const getSession = () => {
    return axios.get('/api/session/');
};