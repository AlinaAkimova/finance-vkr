import { action, makeObservable, observable, runInAction } from 'mobx';

// API
import { getReports } from 'api/reports';

// Types
import { ReportType } from 'types/report';

class ReportsStore {
  @observable
  reports: ReportType | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  getReportsFromBE = async (start: string, end: string) => {
    try {
      const { data } = await getReports(start, end, 'month');
      runInAction(() => {
        this.reports = data.data;
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const reportsStore = new ReportsStore();

export default reportsStore;
