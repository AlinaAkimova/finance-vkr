import React, { FC, useState } from 'react';

// Components
import TitleManagementPages from 'components/TitleManagementPages/TitleManagementPages';
import TableTeam from 'routes/Team/TableTeam/TableTeam';

// Styles
import classes from './Team.module.scss';

const Team: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className={classes.wrapper}>
      <TitleManagementPages
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        title="Team"
        buttonLabel="Add members"
        placeholder="Search member..."
        tabs={['All', 'Active', 'Archived', 'Employee', 'Contractor']}
      />
      <div className={classes.tableView}>
        <TableTeam activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Team;
