import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction
} from 'mobx';

// Types
import { IClient, IClientPatch } from 'types/client';

// API
import { getClients, addClient, IAddClient, refreshClient } from 'api/clients';

// Utils
import { sortingByField } from 'utils/sorting';

type AvailableSort = 'legalName' | 'contactPerson' | 'email';

class ClientsStore {
  @observable
  clients: IClient[] | [] = [];

  @observable
  loading: boolean = false;

  @observable
  query: string = '';

  @observable
  sort: AvailableSort = 'legalName';

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
  get filteredClients(): IClient[] {
    return sortingByField(
      this.clients.filter((client) =>
        client.legalName.toLowerCase().includes(this.query.toLowerCase())
      ),
      this.sort as keyof IClient,
      this.sortDir
    );
  }

  @action
  loadClients = async (): Promise<void> => {
    try {
      this.loading = true;

      const { data } = await getClients();

      runInAction(() => {
        this.clients = data.data;
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
  addClient = async (client: IAddClient): Promise<void> => {
    try {
      this.loading = true;
      await addClient(client);
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
        this.loadClients();
      });
    }
  };

  @action
  updateClient = async (client: IClientPatch) => {
    try {
      this.loading = true;

      const data = await refreshClient(client);

      runInAction(() => {
        if (this.clients) {
          const index = this.clients.findIndex((x) => x.id === client.clientId);
          this.clients.splice(index, 1, data);
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

const clientStore = new ClientsStore();

export default clientStore;
