// Helpers
import axios from 'api/helpers/axios';

// Types
import { User } from 'types/user';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface LoginResponse {
  data: {
    profile: User;
    token: TokenData;
  };
}

export interface ProfileResponse {
  data: User;
}

export const login = (email: string, password: string, uuid: string) =>
  axios.post<LoginResponse>('/auth/login', {
    email,
    password,
    uuid
  });

export const refresh = (refreshToken: string, uuid: string) =>
  axios.post<LoginResponse>('/auth/refresh-token', {
    refreshToken,
    uuid
  });

export const getProfile = () => axios.get<ProfileResponse>('/profile');

export const logout = () => axios.post<'ok'>('/auth/logout');
