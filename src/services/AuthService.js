import http from '../utils/axios';

const checkToken = async (token) => {
  if (!token) return; // skip
  try {
    return await http
      .get('/api/user/init', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data);
  } catch (error) {
    return null;
  }
};

const AuthService = {
  checkToken,
};

export default AuthService;
