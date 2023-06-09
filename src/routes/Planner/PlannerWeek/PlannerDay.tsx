import React, { FC } from 'react';
import clsx from 'clsx';

// Styles
import classes from './PlannerWeek.module.scss';

interface PlannerDayProps {
  isHeader?: boolean;
  weekDay?: number;
  isWeekend?: boolean;
}

const PlannerDay: FC<PlannerDayProps> = ({ isHeader, weekDay, isWeekend }) => {
  return isHeader ? (
    <div className={classes.wrapperMonth}>{weekDay}</div>
  ) : (
    <div
      className={clsx(classes.wrapperDay, { [classes.weekends]: isWeekend })}
    />
  );
};

export default PlannerDay;
