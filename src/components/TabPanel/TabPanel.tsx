import React, { FC, ReactNode } from 'react';

interface ITabs {
  children: ReactNode;
  value: number;
  index: number;
}

const TabPanel: FC<ITabs> = ({ children, value, index }) => {
  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        value === index ? children : null
      }
    </div>
  );
};

export default TabPanel;
