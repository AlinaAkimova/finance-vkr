import axios from 'api/helpers/axios';

// Types
import { IProject } from 'types/project';
import { IClient, IClientPatch, WorkStatusVariant } from 'types/client';

export interface IClientResponse {
  data: IClient[];
}

export interface IClientRequest {
  data: IClient;
}

export interface AddingClientResponse {
  data: {
    id: string;
    director: string;
    contactPerson: string;
    status: WorkStatusVariant;
    email: string;
    legalTin: string;
    legalOgrn: string;
    legalKpp: string;
    legalAddress: string;
    postalAddress: string;
    legalName: string;
    comment: string;
    projects: Array<IProject>;
  };
}

export const getClients = () => axios.get<IClientResponse>('/clients');

export interface IAddClient {
  director: string;
  contactPerson: string;
  email: string;
  legalTin: string;
  legalOgrn: string;
  legalKpp: string;
  legalAddress: string;
  postalAddress: string;
  legalName: string;
  projectId: string;
  comment: string;
}

export const addClient = (client: IAddClient) => {
  return axios.post<AddingClientResponse>('/clients', {
    ...client,
    status: WorkStatusVariant.Active
  });
};

export const refreshClient = async (request: IClientPatch) =>
  axios.patch<IClientRequest>('/clients', request).then((response) => {
    return <IClient>{
      id: response.data.data.id,
      director: response.data.data.director,
      contactPerson: response.data.data.contactPerson,
      status: response.data.data.status,
      email: response.data.data.email,
      legalTin: response.data.data.legalTin,
      legalOgrn: response.data.data.legalOgrn,
      legalKpp: response.data.data.legalKpp,
      legalAddress: response.data.data.legalAddress,
      postalAddress: response.data.data.postalAddress,
      legalName: response.data.data.legalName,
      comment: response.data.data.comment,
      projects: response.data.data.projects
    };
  });
