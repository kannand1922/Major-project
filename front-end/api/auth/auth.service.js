import axios from "axios";
import { apiPath } from "../../constants";
class AuthService {
  async login(val) {
    const response = await axios.post(`${apiPath}/auth/login`, val);
    return response.data;
  }

  async signup(val) {
    const response = await axios.post(`${apiPath}/auth/register`, val);
    return response.data;
  }
}

export default new AuthService();
