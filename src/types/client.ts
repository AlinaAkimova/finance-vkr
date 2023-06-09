import { IProject } from './project';

export interface IClient {
  id: string;
  director: string;
  contactPerson: string;
  status: WorkStatusVariant;
  email?: string;
  legalTin: string;
  legalOgrn: string;
  legalKpp: string;
  legalAddress: string;
  postalAddress: string;
  legalName: string;
  comment: string;
  projects: IProject[];
}

export interface IClientPatch {
  clientId: string;
  director: string;
  contactPerson: string;
  status: WorkStatusVariant;
  legalTin: string;
  legalOgrn: string;
  legalKpp: string;
  legalAddress: string;
  postalAddress: string;
  legalName: string;
  projectsIds: string[];
  comment?: string;
}

export enum WorkStatusVariant {
  Active = 'Active',
  Archived = 'Archived'
}
