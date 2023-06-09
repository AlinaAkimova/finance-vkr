import React, { FC, useState } from 'react';

// Components
import TitleManagementPages from 'components/TitleManagementPages';
import TableProjects from './TableProjects';

// Styles
import classes from './Projects.module.scss';

const Projects: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className={classes.wrapper}>
      <TitleManagementPages
        title="Projects"
        buttonLabel="Add project"
        placeholder="Search project..."
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={['All', 'Active', 'Archived']}
      />
      <div className={classes.tableView}>
        <TableProjects activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Projects;
