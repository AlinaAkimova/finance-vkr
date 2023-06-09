import React, { FC } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

interface IProps {
  isVisible: string;
  onClean(): void;
}

const EndLineAdronment: FC<IProps> = ({ isVisible, onClean }) => {
  return (
    <InputAdornment position="end">
      <IconButton
        sx={{
          visibility: isVisible ? 'visible' : 'hidden'
        }}
        onClick={onClean}
      >
        <Close />
      </IconButton>
    </InputAdornment>
  );
};

export default EndLineAdronment;
