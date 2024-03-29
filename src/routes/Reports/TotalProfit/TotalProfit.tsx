import React, { FC, useEffect } from 'react';
import LineChart from 'components/Charts/LineChart';
import ReportMoneyCard from 'components/ReportMoneyCard/ReportMoneyCard';

import { observer } from 'mobx-react-lite';

// Store
import reportsStore from 'stores/ReportsStore';

// Types
import { CardName, CardDescription } from 'types/report';

// Styles
import classes from './TotalProfit.module.scss';

export interface TotalProfitInt {
  labelsArr: string[];
  start: string;
  end: string;
}

const TotalProfit: FC<TotalProfitInt> = ({
  labelsArr: getLabels,
  start,
  end
}) => {
  const { reports } = reportsStore;

  useEffect(() => {
    reportsStore.getReportsFromBE(start, end);
  }, [start, end]);

  const arr1 = [12300, 18500, 22000, 10000, 25000, 23678, 15689];

  return (
    <div>
      <LineChart labelsArr={getLabels} data={arr1} />
      <div className={classes.rowView}>
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
    </div>
  );
};
export default observer(TotalProfit);
