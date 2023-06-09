import axios from 'api/helpers/axios';

// Types
import { IProject, IProjectPatch } from '../types/project';

interface IProjectsResponse {
  data: [
    {
      id: string;
      name: string;
      startAt: string;
      endAt: string;
      hasActualContract: boolean;
      colour?: string;
      manager: string;
      clientId: string;
      contractStatus?: string;
      status?: string;
      contractCurrency?: string;
      assignedHours?: number;
    }
  ];
}

interface IProjectResponse {
  data: {
    id: string;
    name: string;
    startAt: string;
    endAt: string;
    hasActualContract: boolean;
    colour?: string;
    manager: string;
    clientId: string;
    contractStatus?: string;
    status?: string;
    contractCurrency?: string;
    assignedHours?: number;
  };
}

export const getProjects = (): Promise<IProject[]> => {
  return axios.get<IProjectsResponse>('/projects').then((response) => {
    return response.data.data.map((project) => {
      return <IProject>{
        id: project.id,
        name: project.name,
        startAt: project.startAt,
        endAt: project.endAt,
        hasActualContract: project.hasActualContract,
        colour: project.colour,
        manager: project.manager,
        clientId: project.clientId,
        contractStatus: project.contractStatus,
        workStatus: project.status,
        contractCurrency: project.contractCurrency,
        assignedHours: project.assignedHours
      };
    });
  });
};

export const addProject = async (
  name: string,
  clientId: string,
  colour: string | undefined
) =>
  axios.post<IProjectResponse>('/projects', {
    name,
    clientId,
    colour
  });

export const refreshProject = (
  id: string,
  request: IProjectPatch
): Promise<IProject> => {
  return axios
    .patch<IProjectResponse>(`/projects/${id}`, request)
    .then((response) => {
      return <IProject>{
        id: response.data.data.id,
        name: response.data.data.name,
        startAt: response.data.data.startAt,
        endAt: response.data.data.endAt,
        hasActualContract: response.data.data.hasActualContract,
        colour: response.data.data.colour,
        manager: response.data.data.manager,
        clientId: response.data.data.clientId,
        contractStatus: response.data.data.contractStatus,
        workStatus: response.data.data.status,
        contractCurrency: response.data.data.contractCurrency,
        assignedHours: response.data.data.assignedHours
      };
    });
};
