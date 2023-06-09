// Helpers
import axios from 'api/helpers/axios';

// Types
import { User } from 'types/user';

export interface RegisterResponse {
  user: User;
}
export const register = (password: string, hash: string) => {
  return axios.post<RegisterResponse>(`/registration?hash=${hash}`, {
    password
  });
};
