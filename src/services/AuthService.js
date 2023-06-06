import http from '../utils/axios';

export const checkToken = async (token) => {
  if (!token) return [true, 'token not found!'];
  try {
    if (!http.defaults.headers.Authorization) {
      http.defaults.headers.Authorization = `Bearer ${token}`;
    }
    const response = await http.get('/api/user/init').then((res) => res.data);
    return [false, response];
  } catch (error) {
    console.log({ error });
    return [true, error.message];
  }
};

export const login = async (username, password) => {
  try {
    const { otp_secret } = await http
      .post('/api/auth/v1/login', {
        username,
        password,
      })
      .then((res) => res.data);
    return [false, otp_secret];
  } catch (error) {
    console.log({ error });
    return [true, error.message];
  }
};

export const otpValidation = async (mode, otp_secret, otp_code) => {
  try {
    const { token } = await http
      .post(`/api/auth/v1/otp-validate/${mode}`, {
        otp_secret,
        otp_code,
      })
      .then((res) => res.data);
    return [false, token];
  } catch (error) {
    console.log({ error });
    return [true, error.message];
  }
};

export const logout = async () => {
  try {
    const response = await http.delete('/api/auth/v1/logout').then((res) => res.data);
    http.defaults.headers.Authorization = null;
    return [false, response];
  } catch (error) {
    console.log({ error });
    return [true, error.message];
  }
};
