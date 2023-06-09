import clsx from 'clsx';
import React, { FC } from 'react';
import { Week } from 'types/week';
import PlannerDay from './PlannerDay';

// Styles
import classes from './PlannerWeek.module.scss';

interface PlannerWeekProps {
  week: Week;
  isHeader?: boolean;
  project?: {
    hoursWeek: number;
    totalHours: number;
  };
  onClick?: () => void;
  isEmpty?: boolean;
  isProjectLeftside?: boolean;
  isProjectRightside?: boolean;
}

const PlannerWeek: FC<PlannerWeekProps> = ({
  week,
  isHeader,
  project,
  onClick,
  isEmpty,
  isProjectLeftside,
  isProjectRightside
}) => {
  const { numberWeek, days, workTime, month } = week;
  const persWorkTime = (workTime / 40) * 100;
  return (
    <div
      className={clsx({
        [classes.wrapperWithoutBorder]: project,
        [classes.wrapper]: !project
      })}
    >
      <div
        onClick={onClick}
        className={clsx(classes.workTime, {
          [classes.removeItem]: isHeader || isEmpty,
          [classes.colorWorkTime2]: persWorkTime <= 90,
          [classes.colorWorkTime3]: persWorkTime <= 80,
          [classes.colorWorkTime4]: persWorkTime <= 70,
          [classes.colorWorkTime5]: persWorkTime <= 60,
          [classes.colorWorkTime6]: persWorkTime <= 50,
          [classes.colorWorkTime7]: persWorkTime <= 40,
          [classes.colorWorkTime8]: persWorkTime <= 30,
          [classes.colorWorkTime9]: persWorkTime <= 20,
          [classes.colorWorkTime10]: persWorkTime <= 10,
          [classes.colorWorkTime11]: persWorkTime === 0,
          [classes.project]: project,
          [classes.projectLeftside]: isProjectLeftside,
          [classes.projectRightside]: isProjectRightside
        })}
      >
        {project ? (
          `${project.hoursWeek} h/d ${project.totalHours}`
        ) : (
          <>
            {workTime}hrs
            <br />
            {(week.workTime / 40) * 100}%
          </>
        )}
      </div>
      <div
        className={clsx(classes.numberWeek, {
          [classes.removeItem]: !isHeader
        })}
      >
        {numberWeek}
      </div>
      <div
        className={clsx(classes.month, {
          [classes.removeItem]: !isHeader
        })}
      >
        {month}
      </div>
      <div className={classes.weekItem}>
        <div className={classes.week}>
          {days.map((day, id) => (
            <PlannerDay
              weekDay={day}
              isHeader={isHeader}
              key={day}
              isWeekend={id === 5 || id === 6}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlannerWeek;
