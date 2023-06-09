import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction
} from 'mobx';

// Types
import { IMemberPatch } from 'types/member';
import { User } from 'types/user';

// Utils
import { sortingByField } from 'utils/sorting';

// API
import { getMembers, refreshMember } from 'api/members';

type AvailableSort =
  | 'name'
  | 'email'
  | 'defaultLevel'
  | 'defaultExpertize'
  | 'defaultRate';

class MembersStore {
  @observable
  members: User[] = [];

  @observable
  loading: boolean = false;

  @observable
  query: string = '';

  @observable
  sort: AvailableSort = 'name';

  @observable
  sortDir: 1 | -1 = 1;

  constructor() {
    makeObservable(this);
  }

  @action
  setQuery = (query: string): void => {
    this.query = query;
  };

  @action
  setSort = (newSort: AvailableSort): void => {
    this.sortDir = (this.sort === newSort ? -this.sortDir : 1) as 1 | -1;
    this.sort = newSort;
  };

  @computed
  get filteredMembers(): User[] {
    return sortingByField(
      this.members.filter((member) =>
        member.name.toLowerCase().includes(this.query.toLowerCase())
      ),
      this.sort as keyof User,
      this.sortDir
    );
  }

  @action
  loadMembers = async () => {
    try {
      this.loading = true;

      const { data } = await getMembers();

      runInAction(() => {
        this.members = data.data;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  updateMembers = async (member: IMemberPatch) => {
    try {
      this.loading = true;

      const data = await refreshMember(member);

      runInAction(() => {
        if (this.members) {
          const index = this.members.findIndex((x) => x.id === member.userId);
          this.members.splice(index, 1, data);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

const membersStore = new MembersStore();

export default membersStore;
