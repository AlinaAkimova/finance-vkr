import React, { FC, useState } from 'react';

// Components
import TitleManagementPages from 'components/TitleManagementPages';
import CalendarTimeline from './CalendarTimeline';

// Styles
import classes from './NewPlanner.module.scss';

const NewPlanner: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className={classes.wrapper}>
      <TitleManagementPages
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title="Planner"
        buttonLabel="Add person"
        placeholder="Search member..."
        tabs={['Team', 'Projects']}
        isPlanner
      />
      <div className={classes.tableView}>
        <CalendarTimeline />
      </div>
    </div>
  );
};

export default NewPlanner;
