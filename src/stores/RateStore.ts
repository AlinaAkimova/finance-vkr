import api from 'api';
import { action, makeObservable, observable } from 'mobx';

class RateStore {
  @observable
  rate: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action
  getDollarRate = async () => {
    try {
      this.rate = await api.rate.getDollarRate();
    } catch (error) {
      console.error(error);
    }
  };
}

const rateStore = new RateStore();

export default rateStore;
