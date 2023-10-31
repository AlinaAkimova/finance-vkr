import React, { FC, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';

// Types
import { ICoefficient } from 'types/coefficient';

// Stores
import salaryStore from 'stores/SalaryCoefficientsStore';

// Styles
import classes from './SelectCoefficientTextField.module.scss';

interface SelectCoefficientTextFieldProps {
  coefficient: ICoefficient;
}

const SelectCoefficientTextField: FC<SelectCoefficientTextFieldProps> = ({
  coefficient
}) => {
  const {
    coefficients,
    currentCoefficients,
    coefficientNameChange,
    coefficientChange,
    removeCoefficient,
    saveCoefficient
  } = salaryStore;

  const [selectState, setSelectState] = useState<boolean>(true);

  const options = useMemo(
    () => coefficients.map((i) => (i.name ? `${i.name}` : '')),
    [coefficients]
  );

  const handleAddCoefficient = useCallback(() => {
    setSelectState(false);
  }, []);

  const handleClickSave = useCallback(() => {
    setSelectState(true);
  }, []);

  const makeOptionInactive = (option: string) => {
    const findOption = currentCoefficients.find((item) => item.name === option);
    return findOption !== undefined;
  };

  return (
    <Grid container spacing={1.3}>
      <Grid item xs={7.5}>
        <TextField
          select={selectState}
          fullWidth
          placeholder="Coefficient"
          value={coefficient.name}
          onChange={(e) =>
            coefficientNameChange(e.target.value, coefficient.id)
          }
          InputProps={{
            classes: {
              root: classes.font
            }
          }}
          variant="standard"
        >
          <MenuItem
            className={clsx(classes.addIcon, classes.font)}
            onClick={handleAddCoefficient}
          >
            <Add className={classes.add} />
            Add a new coefficient
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              className={classes.font}
              disabled={makeOptionInactive(option)}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2.5}>
        <TextField
          InputProps={{
            classes: {
              root: classes.font
            }
          }}
          variant="standard"
          placeholder="Value"
          value={coefficient.coefficient}
          onChange={(e) => coefficientChange(e.target.value, coefficient.id)}
        />
      </Grid>
      <Grid item xs={1}>
        {selectState ? (
          <IconButton onClick={() => removeCoefficient(coefficient)}>
            <Close />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              handleClickSave();
              saveCoefficient(
                coefficient.name ? coefficient.name : '',
                coefficient.coefficient ? coefficient.coefficient : 0
              );
            }}
          >
            <Done />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default observer(SelectCoefficientTextField);
