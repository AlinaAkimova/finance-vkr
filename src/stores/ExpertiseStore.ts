import { action, makeObservable, observable, runInAction } from 'mobx';

// Types
import { IRate, IRateAdd } from 'types/rate';

// API
import { getExpertise, addExpertise, deleteExpertise } from 'api/expertise';

class ExpertiseStore {
  @observable
  expertises: IRate[] = [];

  @observable
  loading: boolean = false;

  @observable
  query: string = '';

  constructor() {
    makeObservable(this);
  }

  @action
  setQuery = (query: string): void => {
    this.query = query;
  };

  @action
  loadExpertises = async (projectId: string): Promise<void> => {
    try {
      this.loading = true;

      const { data } = await getExpertise(projectId);

      runInAction(() => {
        this.expertises = data.data;
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
  addExpertise = async (
    projectId: string,
    expertise: IRateAdd
  ): Promise<void> => {
    try {
      this.loading = true;
      await addExpertise(projectId, expertise);
      const { data } = await addExpertise(projectId, expertise);

      runInAction(() => {
        this.expertises?.push(data.data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
        this.loadExpertises(projectId);
      });
    }
  };

  @action
  deleteExpertise = async (expertise: IRate): Promise<void> => {
    try {
      this.loading = true;
      if (expertise.id) {
        await deleteExpertise(expertise.projectId, expertise.id);
      }

      runInAction(() => {
        if (expertise.id) {
          const index: number = this.expertises.findIndex(
            (x) => x.id === expertise.id
          );
          this.expertises?.splice(index, 1);
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

const expertiseStore = new ExpertiseStore();
export default expertiseStore;
