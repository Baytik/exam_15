import axios from 'axios';
import {apiURL} from "./apiURL";

const axiosAPI = axios.create({
    baseURL: apiURL
});

export default axiosAPI;