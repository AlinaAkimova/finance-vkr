import React, { FC, ReactNode } from 'react';

// Styles
import classes from './EmptyTableBody.module.scss';

interface EmptyRowsProps {
  image: ReactNode;
  text: string;
}

const EmptyTableBody: FC<EmptyRowsProps> = ({ image, text }) => {
  return (
    <div className={classes.emptyRows}>
      <div>{image}</div>
      <div className={classes.emptyRowsText}>{text}</div>
    </div>
  );
};

export default EmptyTableBody;
