import { action, makeObservable, observable, runInAction } from 'mobx';
import { v4 as uuid } from 'uuid';

// Types
import { ICoefficient } from 'types/coefficient';

// Api
import {
  addSalaryCoefficient,
  getSalaryCoefficients
} from 'api/salaryCoefficients';

class SalaryCoefficientsStore {
  @observable
  coefficients: ICoefficient[] = [];

  @observable
  currentCoefficients: ICoefficient[] = [];

  @observable
  loading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  getCoefficients = async () => {
    try {
      this.loading = true;

      const { data } = await getSalaryCoefficients();

      runInAction(() => {
        this.coefficients = data.data;
        this.currentCoefficients = data.data;
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
  saveCoefficient = async (name: string, coefficient: number) => {
    try {
      this.loading = true;

      const { data } = await addSalaryCoefficient(name, coefficient);

      runInAction(() => {
        this.coefficients?.push(data.data);
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
  addNewCoefficient = () => {
    this.currentCoefficients.push({
      id: uuid(),
      name: '',
      coefficient: 0
    });
  };

  @action
  coefficientNameChange = (value: string, id: string) => {
    this.currentCoefficients = this.currentCoefficients.map((item) =>
      item.id === id
        ? {
            ...item,
            name: value,
            coefficient:
              this.coefficients.find((c) => c.name === value.trim())
                ?.coefficient || 0
          }
        : item
    );
  };

  @action
  coefficientChange = (value: string, id: string) => {
    this.currentCoefficients = this.currentCoefficients.map((item) =>
      item.id === id ? { ...item, coefficient: Number(value) } : item
    );
  };

  @action
  removeCoefficient = (coefficient: ICoefficient) => {
    console.log(coefficient.name);
    this.currentCoefficients = this.currentCoefficients.filter(
      (item) => item !== coefficient
    );
  };
}
const salaryStore = new SalaryCoefficientsStore();

export default salaryStore;
