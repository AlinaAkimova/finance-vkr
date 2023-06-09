import React, { FC } from 'react';
import 'react-calendar-timeline/lib/Timeline.css';

interface PlannerSubItemProps {
  project: string;
}

const PlannerSubItem: FC<PlannerSubItemProps> = ({ project }) => {
  return (
    <div style={{ textAlign: 'end', backgroundColor: 'red' }}>{project}</div>
  );
};

export default PlannerSubItem;
