import React, { FC, useEffect } from 'react';
import { Grid } from '@mui/material';

// Components
import BarChart from 'components/Charts/BarChart';
import MembersReportTable from 'components/MembersReportTable/MembersReportTable';
import DoughnutChart from 'components/Charts/DoughnutChart/DoughnutChart';
import ReportMoneyCard from 'components/ReportMoneyCard/ReportMoneyCard';

// Stores
import membersStore from 'stores/MembersStore';
import reportsStore from 'stores/ReportsStore';

// Types
import { CardName, CardDescription } from 'types/report';

// Styles
import classes from './ResourceProfitability.module.scss';

const ResourceProfitability: FC = () => {
  const { filteredMembers } = membersStore;
  const members = filteredMembers;

  useEffect(() => {
    membersStore.loadMembers();
  }, []);

  const namesLabels = members.map((member) => member.name);

  const arr1 = [
    15000, 10000, 18000, 19000, 20000, 18000, 22000, 18500, 19000, 15000, 17000,
    19000, 24000, 5000
  ];

  const { reports } = reportsStore;

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <BarChart
            labelsArr={namesLabels}
            title="Resource profitability"
            data={arr1}
          />
        </Grid>
        <Grid item xs={4}>
          <DoughnutChart />
        </Grid>
        <Grid item xs={2}>
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
      <MembersReportTable />
    </div>
  );
};
export default ResourceProfitability;
