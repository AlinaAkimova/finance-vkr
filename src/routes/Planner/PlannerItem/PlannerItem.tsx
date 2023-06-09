import clsx from 'clsx';
import React, { FC, useState } from 'react';

// Types
import { User } from 'types/user';
import { Week } from 'types/week';
import { IProject } from 'types/project';

// Components
import PlannerAssignment from 'components/modals/PlannerAssignment';
import PlannerWeek from '../PlannerWeek';
import PlannerMember from '../PlannerMember';

// Styles
import classes from './PlannerItem.module.scss';

interface PlannerItemProps {
  startWeek: number;
  viewWeeks: number;
  weeks: Week[];
  user: User;
}

const projects: IProject[] = [
  {
    id: '1',
    name: 'testProject',
    startAt: 'project',
    endAt: 'project',
    hasActualContract: true,
    colour: 'project',
    manager: 'project',
    clientId: 'project',
    contractStatus: 'project',
    workStatus: 'project',
    contractCurrency: 'project'
  },
  {
    id: '2',
    name: 'testProject',
    startAt: 'project',
    endAt: 'project',
    hasActualContract: true,
    colour: 'project',
    manager: 'project',
    clientId: 'project',
    contractStatus: 'project',
    workStatus: 'project',
    contractCurrency: 'project'
  },
  {
    id: '3',
    name: 'testProject',
    startAt: 'project',
    endAt: 'project',
    hasActualContract: true,
    colour: 'project',
    manager: 'project',
    clientId: 'project',
    contractStatus: 'project',
    workStatus: 'project',
    contractCurrency: 'project'
  }
];
const project = {
  hoursWeek: 8,
  totalHours: 40
};

const PlannerItem: FC<PlannerItemProps> = ({
  startWeek,
  viewWeeks,
  weeks,
  user
}) => {
  const [isActiveAssignment, setActiveAssignment] = useState<boolean>(false);
  const [isActiveExtraPlanner, setActiveExtraPlanner] =
    useState<boolean>(false);

  return (
    <div className={classes.weeks}>
      <div className={classes.userItem}>
        <PlannerMember
          isActive={isActiveExtraPlanner}
          setActive={setActiveExtraPlanner}
          user={user}
        />
        {weeks.slice(startWeek, startWeek + viewWeeks).map((week) => (
          <PlannerWeek week={week} key={week.numberWeek} />
        ))}
      </div>
      <div>
        <div
          className={clsx(classes.projects, {
            [classes.removeItem]: !isActiveExtraPlanner
          })}
        >
          {projects.map((projectItem) => (
            <div key={projectItem.id} className={classes.userItem}>
              <PlannerMember
                isActive={isActiveExtraPlanner}
                setActive={setActiveExtraPlanner}
                user={user}
                project={projectItem}
              />
              {weeks.slice(startWeek, startWeek + viewWeeks).map((week, id) => (
                <PlannerWeek
                  onClick={() => setActiveAssignment(!isActiveAssignment)}
                  project={project}
                  isProjectLeftside={id === 0}
                  isProjectRightside={id === startWeek + viewWeeks - 1}
                  week={week}
                  key={week.numberWeek}
                />
              ))}
            </div>
          ))}
          <div className={classes.userItem}>
            <PlannerMember
              isActive={isActiveExtraPlanner}
              setActive={setActiveExtraPlanner}
              user={user}
              project={projects[0]}
              isButton
            />
            {weeks.slice(startWeek, startWeek + viewWeeks).map((week) => (
              <PlannerWeek
                onClick={() => setActiveAssignment(!isActiveAssignment)}
                project={project}
                week={week}
                key={week.numberWeek}
                isEmpty
              />
            ))}
          </div>
        </div>
      </div>
      <PlannerAssignment
        active={isActiveAssignment}
        setActive={setActiveAssignment}
        user={user}
      />
    </div>
  );
};

export default PlannerItem;
