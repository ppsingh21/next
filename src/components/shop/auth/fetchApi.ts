import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const isAuthenticate = () =>
  typeof window !== 'undefined' && localStorage.getItem('jwt')
    ? JSON.parse(localStorage.getItem('jwt')!)
    : false;

export const isAdmin = () =>
  typeof window !== 'undefined' && localStorage.getItem('jwt')
    ? JSON.parse(localStorage.getItem('jwt')!).user.role === 1
    : false;

export const loginReq = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = { email, password };
  try {
    const res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({
  name,
  email,
  password,
  cPassword,
}: {
  name: string;
  email: string;
  password: string;
  cPassword: string;
}) => {
  const data = { name, email, password, cPassword };
  try {
    const res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
