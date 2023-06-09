// Helpers
import axios from 'api/helpers/axios';

export interface AdminSendLink {
  email: string;
  name: string;
  role: string;
}

export const inviteMemberAdmin = async (
  email: string,
  name: string,
  role: string
) =>
  axios.post<AdminSendLink>('/registration/send-link/admin', {
    email,
    name,
    role
  });

export const inviteMemberOwner = async (
  email: string,
  name: string,
  role: string
) =>
  axios.post<AdminSendLink>('/registration/send-link/owner', {
    email,
    name,
    role
  });
