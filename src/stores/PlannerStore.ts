import { action, makeObservable, observable } from 'mobx';

// API
import {
  addPlannerAssignment,
  addPlannerUser,
  getPlannerUserProjects,
  getPlannerUsers
} from 'api/planner';

// Types
import {
  PlannerUser,
  AssigmentUser,
  PlannerProject,
  PlanerProjectTimeline
} from 'types/planner';
import { User } from 'types/user';

class PlannerStore {
  @observable
  users: User[] = [];

  @observable
  usersProjects: PlanerProjectTimeline[] = [];

  @observable
  addedUser?: PlannerUser;

  @observable
  openedUsers: { userId: string; projectIds: string[] }[] = [];

  @observable
  assignment?: AssigmentUser;

  constructor() {
    makeObservable(this);
  }

  @action
  getPlannerUsers = async () => {
    try {
      const { data } = await getPlannerUsers();
      this.users = data.data.map((user) => {
        return {
          isProject: false,
          ...user
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  @action
  setProjectsView = (isActive: boolean, userId: string) => {
    this.users = this.users.map((user) =>
      userId === user.id
        ? {
            ...user,
            isActiveProjectsView: isActive
          }
        : user
    );
  };

  @action
  addPlannerUser = async (plannerUser: PlannerUser) => {
    console.log('newUser', plannerUser);
    try {
      const { data } = await addPlannerUser(plannerUser);
      this.addedUser = data.data;
    } catch (error) {
      console.error(error);
    }
  };

  @action
  assignmentPlannerUser = async (assignmentData: AssigmentUser) => {
    try {
      const { data } = await addPlannerAssignment(assignmentData);

      this.assignment = data.data;
    } catch (error) {
      console.error(error);
    }
  };

  @action
  getPlannerUserProjects = async (userId: string) => {
    if (this.openedUsers.find((user) => user.userId === userId)) {
      this.openedUsers = this.openedUsers.filter(
        (user) => user.userId !== userId
      );
      return;
    }
    try {
      const { data } = await getPlannerUserProjects(userId);

      const userProjects: PlannerProject[] = data.data.map((project) => {
        return {
          stackItems: true,
          isProject: true,
          ...project
        };
      });
      this.openedUsers.push({
        userId,
        projectIds: userProjects.map((project) => project.id)
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const plannerStore = new PlannerStore();

export default plannerStore;
