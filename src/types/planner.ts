import { IProject } from './project';
import { WorkStatusVariant } from './user';

export interface AssigmentUser {
  userId: string;
  projectId: string;
  rate: number;
  expertize: string;
  dailyHours: number;
  startAt: string;
  endAt: string;
}

export interface PlannerUser {
  userId: string;
  defaultRate: number;
  defaultWeeklyCapacity: number;
  defaultExpertize: string;
  workDays: number[];
}

export interface NewPlannerUser {
  id: string;
  img?: string;
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  email: string;
  hasPlanner: boolean;
  role: string;
  name: string;
  workDays: number[];
  colour: string;
  defaultRate: number;
  status: WorkStatusVariant;
  defaultLevel: string;
  defaultLegalStatus: string;
  defaultWeeklyCapacity: number;
  defaultExpertize: string;
  stackItems: boolean;
  isProject: boolean;
  isActiveProjectsView: boolean;
}

export interface PlannerProject extends IProject {
  stackItems: true;
  isProject: true;
}

export interface PlanerProjectTimeline {
  id: string;
  group: string;
  title: string;
  start_time: number;
  end_time: number;
  stackItems: boolean;
  color?: string;
}
