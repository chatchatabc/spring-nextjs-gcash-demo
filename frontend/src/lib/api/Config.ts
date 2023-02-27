import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

export default instance;
