import React, { FC, useState } from 'react';

// Components
import TitleManagementPages from 'components/TitleManagementPages';
import TableClients from './TableClients/TableClients';

// Styles
import classes from './Clients.module.scss';

const Clients: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className={classes.wrapper}>
      <TitleManagementPages
        title="Clients"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonLabel="Add client"
        placeholder="Search client..."
        tabs={['All', 'Active', 'Archived']}
      />
      <div className={classes.tableView}>
        <TableClients activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Clients;
