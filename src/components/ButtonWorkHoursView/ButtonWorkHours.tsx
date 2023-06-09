import React, { FC } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';

// Styles
import classes from './ButtonWorkHours.module.scss';

interface ButtonWorkHoursViewProps {
  isButtonClick: boolean;
  setIsButtonClick: (value: boolean) => void;
  label: string;
}

const ButtonWorkHours: FC<ButtonWorkHoursViewProps> = ({
  isButtonClick,
  setIsButtonClick,
  label
}) => {
  const handleClick = () => {
    setIsButtonClick(!isButtonClick);
  };
  return (
    <div>
      <Button
        className={clsx(classes.button, {
          [classes.buttonActive]: isButtonClick,
          [classes.buttonInactive]: !isButtonClick
        })}
        onClick={handleClick}
      >
        {label}
      </Button>
    </div>
  );
};

export default ButtonWorkHours;
