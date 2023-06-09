// Helpers
import axios from 'api/helpers/axios';

// Types
import { ReportType } from 'types/report';

interface ReportResponse {
  data: ReportType;
}

export const getReports = (start: string, end: string, by: string) => {
  return axios.get<ReportResponse>('/reports/totalProfit', {
    params: {
      start,
      end,
      by
    }
  });
};
