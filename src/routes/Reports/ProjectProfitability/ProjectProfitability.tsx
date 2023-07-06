import React, { FC, useEffect, useCallback } from 'react';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

// Components
import BarChart from 'components/Charts/BarChart';
import ProjectsReportsTable from 'components/ProjectsReportsTable/ProjectsReportsTable';
import ReportMoneyCard from 'components/ReportMoneyCard/ReportMoneyCard';

// Store
import reportsStore from 'stores/ReportsStore';

// Types
import { CardName, CardDescription } from 'types/report';

// Styles
import classes from './ProjectProfitability.module.scss';

export interface ProjectProfitabilityInt {
  labelsArr: string[];
  start: string;
  end: string;
}

const ProjectProfitability: FC<ProjectProfitabilityInt> = ({
  labelsArr: getLabels,
  start,
  end
}) => {
  const { reports } = reportsStore;

  useEffect(() => {
    reportsStore.getReportsFromBE(start, end);
  }, [start, end]);

  const getLineData = useCallback(() => {
    return reports ? reports?.data.map((i) => i.totalProfit) : [];
  }, [reports]);
  
  const arr1 = [
    15000, 10000, 18000, 19000, 20000, 18000, 22000, 18500, 19000, 15000, 17000,
    19000, 24000, 5000
  ];
  return (
    <div>
      <Grid container className={classes.mg}>
        <Grid item xs={9}>
          <BarChart
            title="Project profitability"
            labelsArr={getLabels}
            data={arr1}
          />
        </Grid>
        <Grid item xs={3}>
          <div className={classes.columnView}>
            <ReportMoneyCard
              title={CardName.totalMargin}
              money={Math.round(reports?.total.totalMargin ?? 0)}
              description={CardDescription.totalMargin}
            />
            <ReportMoneyCard
              title={CardName.totalRevenue}
              money={Math.round(reports?.total.totalRevenue ?? 0)}
              description={CardDescription.totalRevenue}
            />
            <ReportMoneyCard
              title={CardName.totalWages}
              money={Math.round(reports?.total.totalWages ?? 0)}
              description={CardDescription.totalWages}
            />
            <ReportMoneyCard
              title={CardName.totalProfit}
              money={Math.round(reports?.total.totalProfit ?? 0)}
              description={CardDescription.totalProfit}
            />
          </div>
        </Grid>
      </Grid>
      <ProjectsReportsTable />
    </div>
  );
};
export default observer(ProjectProfitability);
