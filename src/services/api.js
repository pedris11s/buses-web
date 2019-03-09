import axios from 'axios';
import {API_ROOT} from "../config";

export default axios.create({
  baseURL: `${API_ROOT}`,
});
