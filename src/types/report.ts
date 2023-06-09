export interface TotalReport {
  totalRevenue: number;
  totalWages: number;
  totalProfit: number;
  totalMargin: number;
}

export interface ReportType {
  data: TotalReport[];
  total: TotalReport;
}

export enum CardName {
  totalRevenue = 'Total Revenue',
  totalWages = 'Total Wages',
  totalProfit = 'Total Profit',
  totalMargin = 'Total Margin'
}

export enum CardDescription {
  totalRevenue = '(scheduled - ext rate)',
  totalWages = '(scheduled - int rate)',
  totalProfit = '(scheduled - ext rate - int rate)',
  totalMargin = '(profit / revenue)'
}
