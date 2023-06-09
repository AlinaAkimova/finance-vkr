import axios from 'api/helpers/axios';
import { User } from 'types/user';

// Types
import { IMemberPatch } from 'types/member';

export interface IMembersResponse {
  data: User[];
}

export interface IMemberResponse {
  data: User;
}

export const getMembers = () => axios.get<IMembersResponse>('/profile/all');

export const refreshMember = async (request: IMemberPatch) =>
  axios.patch<IMemberResponse>('/profile', request).then((response) => {
    return <User>{
      id: response.data.data.id,
      email: response.data.data.email,
      name: response.data.data.name,
      phone: response.data.data.phone,
      role: response.data.data.role,
      colour: response.data.data.colour,
      defaultRate: response.data.data.defaultRate,
      currency: response.data.data.currency,
      status: response.data.data.status,
      defaultLevel: response.data.data.defaultLevel,
      defaultLegalStatus: response.data.data.defaultLegalStatus,
      defaultWeeklyCapacity: response.data.data.defaultWeeklyCapacity,
      defaultExpertize: response.data.data.defaultExpertize
    };
  });
