import React, { FC, useCallback } from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

// Components
import AddClientModal from 'components/modals/AddClientModal';
import AddMember from 'components/modals/AddMemberModal';
import AddProjectModal from 'components/modals/AddProjectModal';

// Styles
import classes from './ButtonView.module.scss';

enum ButtonLabels {
  projects = 'Add project',
  team = 'Add members',
  clients = 'Add client',
  planner = 'Add person'
}

interface ButtonProps {
  label: string;
  isButtonClick: boolean;
  setIsButtonClick: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ButtonView: FC<ButtonProps> = ({
  label,
  isButtonClick,
  setIsButtonClick
}) => {
  const handleOnClick = useCallback((cIsButtonClick: boolean) => {
    setIsButtonClick(!cIsButtonClick);
  }, []);

  const handleClose = useCallback(() => {
    setIsButtonClick(false);
  }, []);

  const getModal = () => {
    switch (label) {
      case ButtonLabels.team:
        return <AddMember isOpen={isButtonClick} setOpen={setIsButtonClick} />;
      case ButtonLabels.clients:
        return (
          <AddClientModal open={isButtonClick} handleClose={handleClose} />
        );
      case ButtonLabels.projects:
        return (
          <AddProjectModal isOpen={isButtonClick} setOpen={setIsButtonClick} />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => handleOnClick(isButtonClick)}
        className={classes.button}
      >
        <Add className={classes.addIcon} />
        <span className={classes.text}>{label}</span>
      </Button>
      {getModal()}
    </div>
  );
};

export default ButtonView;
