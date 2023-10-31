import React, { FC, SyntheticEvent, useCallback } from 'react';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Styles
import classes from './TabsView.module.scss';

interface TabsViewProps {
  placeholder?: string;
  tabs: string[];
  activeTab: number;
  setActiveTab: (newActiveTab: number) => void;
  isPlanner?: boolean;
}

const TabsView: FC<TabsViewProps> = ({
  placeholder,
  tabs,
  activeTab,
  setActiveTab,
  isPlanner
}) => {
  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    [setActiveTab]
  );

  return (
    <Box
      className={clsx(classes.box, {
        [classes.boxWithoutBorder]: !placeholder
      })}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        className={classes.tabs}
        TabIndicatorProps={{ sx: { backgroundColor: '#f36d25' } }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={classes.itemButton}
            label={<span className={classes.tab}>{tab}</span>}
          />
        ))}
      </Tabs>
      {!isPlanner ? null : (
        <Box className={classes.inputBox}>
          <button type="button" className={classes.buttonItem}>
            <AddIcon />
          </button>
          <button type="button" className={classes.buttonItem}>
            <RemoveIcon />
          </button>
          <button type="button" className={classes.buttonItem}>
            <CalendarMonthIcon /> Select date range <ArrowDropDownIcon />
          </button>
          <button type="button" className={classes.buttonItem}>
            <ArrowBackIosIcon />
          </button>
          <button type="button" className={classes.buttonItem}>
            <ArrowForwardIosIcon />
          </button>
        </Box>
      )}
    </Box>
  );
};

export default TabsView;
