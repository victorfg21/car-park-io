import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7143',
});

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Acess-Control-Allow-Origin'] = '*';

export default api;