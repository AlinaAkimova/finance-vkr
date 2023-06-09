// Helpers
import axios from 'api/helpers/axios';

// Types
import { User } from 'types/user';
import { AssigmentUser, PlannerUser } from 'types/planner';
import { IProject } from 'types/project';

export interface IProjectsResponse {
  data: IProject[];
}

interface PlannerUserResponse {
  data: User[];
}

export interface PlannerAddingUserResponse {
  data: {
    userId: string;
    defaultRate: number;
    defaultWeeklyCapacity: number;
    defaultExpertize: string;
    workDays: number[];
  };
}

export interface AssignmentUserResponse {
  data: AssigmentUser;
}

export const getPlannerUsers = () =>
  axios.get<PlannerUserResponse>('/planner/users', {
    params: {
      withProjects: true
    }
  });

export const addPlannerUser = (plannerUserdata: PlannerUser) =>
  axios.post<PlannerAddingUserResponse>('/planner/users', plannerUserdata);

export const getPlannerUserProjects = (userId: string) =>
  axios.get<IProjectsResponse>(`/planner/users/${userId}/projects`);

export const addPlannerAssignment = (assignmentData: AssigmentUser) => {
  return axios.post<AssignmentUserResponse>(
    `/planner/users/${assignmentData.userId}/assignment/${assignmentData.projectId}`,
    {
      dailyHours: assignmentData.dailyHours,
      expertize: assignmentData.expertize,
      rate: assignmentData.rate,
      endAt: assignmentData.endAt,
      startAt: assignmentData.startAt
    }
  );
};
