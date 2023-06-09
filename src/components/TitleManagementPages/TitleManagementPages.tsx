import React, { FC, useState } from 'react';

// Styles
import classes from './TitleManagementPages.module.scss';

// Components
import ButtonView from '../ButtonView/ButtonView';
import TabsView from '../Tabs/TabsView';

interface PageTableViewProps {
  title: string;
  buttonLabel: string;
  placeholder: string;
  isPlanner?: boolean;
  tabs: string[];
  activeTab: number;
  setActiveTab: (newActiveTab: number) => void;
}

const TitleManagementPages: FC<PageTableViewProps> = ({
  title,
  buttonLabel,
  placeholder,
  isPlanner,
  tabs,
  activeTab,
  setActiveTab
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleContainer}>
        <div className={classes.title}>{title}</div>
        <div className={classes.button}>
          <ButtonView
            label={buttonLabel}
            isButtonClick={modalIsOpen}
            setIsButtonClick={setModalIsOpen}
          />
        </div>
      </div>
      <TabsView
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        placeholder={placeholder}
        tabs={tabs}
        isPlanner={isPlanner}
      />
    </div>
  );
};

export default TitleManagementPages;
