import { action, makeObservable, observable } from 'mobx';

// Types
import { User } from 'types/user';

// Api
import { getProfile } from 'api/auth';

class ProfileStore {
  @observable
  profile: User | null = null;

  @observable
  loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  setProfile = (profile: User | null) => {
    this.profile = profile;
  };

  @action
  getProfile = async () => {
    const { data } = await getProfile();
    this.profile = data.data;
  };
}

const profileStore = new ProfileStore();
export default profileStore;
