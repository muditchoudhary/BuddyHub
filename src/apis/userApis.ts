import axios, { AxiosError } from 'axios';

const { VITE_BACKEND_BASE_URL } = import.meta.env;
import { User } from '@/types/user';
import { SOMETHING_WENT_WRONG } from '@/constants/globalConstants';

interface getUserReturn {
  user: User;
}
export async function getUser(token: string): Promise<getUserReturn> {
  try {
    const url = `${VITE_BACKEND_BASE_URL}/user/full`;
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) return response.data;
    else throw new Error(SOMETHING_WENT_WRONG);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) throw new Error('Unauthorized. Sign in again');
      throw new Error(error.response?.data.message);
    } else throw error;
  }
}
