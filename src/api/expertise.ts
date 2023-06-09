import axios from 'api/helpers/axios';

import { IRate, IRateAdd } from 'types/rate';

interface IExpertiseResponse {
  data: IRate[];
}

interface IExpertiseRequest {
  data: IRateAdd;
}

interface IExpertiseDelete {
  id: string;
}

export const getExpertise = async (projectId: string) =>
  axios.get<IExpertiseResponse>(`/expertises/${projectId}`);

export const addExpertise = async (projectId: string, request: IRateAdd) =>
  axios.post<IExpertiseRequest>(`/expertises/${projectId}`, request);

export const deleteExpertise = async (projectId: string, id: string) =>
  axios.delete<IExpertiseDelete>(`/expertises/${projectId}`, { data: { id } });
