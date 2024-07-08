import axios, { AxiosError } from 'axios';

const { VITE_BACKEND_BASE_URL } = import.meta.env;
import { SOMETHING_WENT_WRONG } from '@/constants/globalConstants';
import { User } from '@/types/user';

interface SignUpParams {
  displayName: string;
  email: string;
  password: string;
}

interface SignUpReturn {
  message: string;
  token: string;
  expiresIn: string;
  user: User;
}
export async function signUp({ displayName, email, password }: SignUpParams): Promise<SignUpReturn> {
  try {
    const url = `${VITE_BACKEND_BASE_URL}/auth/register`;
    const data: SignUpParams = {
      displayName,
      email,
      password,
    };
    const response = await axios.post(url, data);
    if (response.status === 200) return response.data;
    // Any other status above 200 will be catch be catch block
    // this below throw just because typescript
    else throw new Error(SOMETHING_WENT_WRONG);
  } catch (error) {
    /*
    How am I doing error handling?
    If I get AxiosErrro like 404 or 401 status or anything
    I sent a message from backend api and I extract the message
    from backend api from catch block then throw an error again
    with that message which will be catch by frontend
    code.
    Or If I get any other error I just throw them (there chances of occuring is less)
    */
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else throw error;
  }
}
