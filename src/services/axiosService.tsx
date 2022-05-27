import axios from 'axios';

import baseURL from '../constans/urls';

export const axiosService = axios.create({ baseURL });
