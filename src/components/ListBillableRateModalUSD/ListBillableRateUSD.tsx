import React, { FC, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

import { observer } from 'mobx-react-lite';

// Icons
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Components
import SetNewBillableRate from 'components/modals/SetNewBillableRateModal';

// Stores
import rateStore from 'stores/RateStore';
import expertiseStore from 'stores/ExpertiseStore';

// Types
import { IRate } from 'types/rate';

// Styles
import classes from './ListBillableRateUSD.module.scss';

export interface IBillableList {
  projectId: string;
  checked: boolean;
}

const ListBillableRate: FC<IBillableList> = ({ projectId, checked }) => {
  const [onSetClick, setOnSetClick] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | undefined>('');
  const { expertises } = expertiseStore;

  useEffect(() => {
    expertiseStore.loadExpertises(projectId);
  }, []);

  const dollarChange = (item: IRate) => {
    return (Number(item.rate) / rateStore.rate).toFixed(2);
  };

  const handleOnClick = (id: string | undefined) => {
    setCurrentId(id);
    setOnSetClick((prev) => !prev);
  };

  return (
    <List className={classes.list}>
      {expertises?.map((item) => (
        <ListItem key={item.id} component="div" disableGutters>
          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={3}>
              <Chip
                label={item.expertise}
                className={classes.chipColor}
                variant="filled"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRubleIcon />
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.font
                  }
                }}
                disabled
                value={item.rate}
                variant="standard"
              />
            </Grid>

            {checked ? (
              <Grid item xs={2}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.font
                    }
                  }}
                  variant="standard"
                  value={dollarChange(item)}
                  disabled
                />
              </Grid>
            ) : (
              ''
            )}

            {checked ? (
              <Grid item xs={2}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyExchangeIcon />
                      </InputAdornment>
                    ),
                    classes: {
                      root: classes.font
                    }
                  }}
                  variant="standard"
                  value={rateStore.rate}
                  disabled
                />
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={2}>
              <Button onClick={() => handleOnClick(item.id)}>INFO</Button>
            </Grid>
          </Grid>
        </ListItem>
      ))}
      <SetNewBillableRate
        item={expertises.find((exp) => exp.id === currentId)}
        projectId={projectId}
        isOpen={onSetClick}
        setOpen={setOnSetClick}
        checked={checked}
      />
    </List>
  );
};
export default observer(ListBillableRate);
