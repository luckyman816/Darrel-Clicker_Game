import axios from 'axios';
const api = axios.create({
    baseURL: `https://darrel-clicker-game-backend-1.onrender.com/api`,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;