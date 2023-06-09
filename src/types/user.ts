import { IProject } from './project';

export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export enum WorkStatusVariant {
  active = 'Active',
  archived = 'Archived'
}

export enum LevelVariant {
  intern = 'Intern',
  junior = 'Junior',
  middle = 'Middle',
  highMiddle = 'High Middle',
  senior = 'Senior'
}

export enum ExpertizeVariant {
  pa = 'PA',
  qa = 'QA',
  design = 'Design',
  fullstack = 'Fullstack',
  frontend = 'Frontend',
  backend = 'Backend',
  flutter = 'Flutter',
  ios = 'IOS',
  android = 'Android'
}

export interface User {
  id: string;
  img?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  name: string;
  phone?: string;
  hasPlanner: boolean;
  role: string;
  colour: string;
  defaultRate: number;
  currency?: string;
  status: WorkStatusVariant;
  defaultLevel: string;
  defaultLegalStatus: string;
  defaultWeeklyCapacity: number;
  defaultExpertize: string;
  workDays: number[];
  isProject?: boolean;
  projects: IProject[];
}
