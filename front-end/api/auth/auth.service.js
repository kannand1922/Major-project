import axiosInstance from "../axiosInstance/index"; 

class AuthService {
  async login(val) {
    const response = await axiosInstance.post(`/auth/login`, val);
    return response.data;
  }

  async signup(val) {
    const response = await axiosInstance.post(`/auth/register`, val);
    return response.data;
  }
}

export default new AuthService();
