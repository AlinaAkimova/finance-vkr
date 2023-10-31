import React, {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  useCallback
} from 'react';
import { observer } from 'mobx-react-lite';
import dayjs, { Dayjs } from 'dayjs';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Switch from '@mui/material/Switch';
import Fade from '@mui/material/Fade';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';

// Icons
import Close from '@mui/icons-material/Close';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Types
import {
  ContractStatusVariant,
  IProject,
  WorkStatusVariant,
  ColourProjectOptions,
  ColourType
} from 'types/project';
import { IClient } from 'types/client';

// Components
import SetNewBillableRate from 'components/modals/SetNewBillableRateModal';
import DatePicker from 'components/DatePicker';
import ListBillableRateUSD from 'components/ListBillableRateModalUSD';

// Theme
import theme from 'theme';

// Stores
import rateStore from 'stores/RateStore';
import projectsStore from 'stores/ProjectsStore';
import clientsStore from 'stores/ClientsStore';
import membersStore from 'stores/MembersStore';

// Styles
import classes from './ProjectAdminModal.module.scss';

interface IProps {
  item: IProject;
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const getClientName = (
  clients: IClient[],
  clientId: string
): string | undefined => {
  return clients.find((client) => clientId === client.id)?.legalName;
};

const getClientId = (clients: IClient[], name: string): string | undefined => {
  return clients.find((client) => name === client.legalName)?.id;
};

const ProjectAdmin: FC<IProps> = ({ item, isOpen, setOpen }) => {
  const { members } = membersStore;
  const { clients } = clientsStore;

  const [colour, setColour] = useState<ColourType | undefined>(
    ColourProjectOptions.find((col) => col.code === item.colour)
  );
  const [name, setName] = useState<string>(item.name);
  const [clientId, setClientId] = useState<string | undefined>(item.clientId);
  const [clientLegalName, setClientLegalName] = useState<string | undefined>(
    getClientName(clients, item.clientId)
  );
  const [manager, setManager] = useState<string>(item.manager);
  const [workStatus, setWorkStatus] = useState<string | undefined>(
    item.workStatus
  );
  const [contractStatus, setContractStatus] = useState<string | undefined>(
    item.contractStatus
  );
  const [startAt, setStartAt] = useState<Dayjs>(dayjs(item.startAt));
  const [endAt, setEndAt] = useState<Dayjs>(dayjs(item.endAt));
  const [contractCurrency, setContractCurrency] = useState<string | undefined>(
    item.contractCurrency
  );
  const [isBillable, setIsBillable] = useState<boolean>(false);
  const [onSetClick, setOnSetClick] = useState<boolean>(false);
  const [buttonContractStatus, setButtonContractStatus] =
    useState<boolean>(true);

  const handleUpdateProject = useCallback(() => {
    projectsStore.updateProjects(item.id, {
      name,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
      billableStatus: true,
      clientId,
      manager,
      contractStatus,
      status: workStatus,
      currency: 'RUB',
      archivedLink: 'http/google.com',
      colour: colour?.code
    });
  }, [
    item.id,
    name,
    startAt,
    endAt,
    clientId,
    manager,
    contractStatus,
    workStatus,
    colour
  ]);

  const handleUpdate = useCallback(() => {
    setName(item.name);
    setClientId(item.clientId);
    setManager(item.manager);
    setWorkStatus(item.workStatus);
    setContractStatus(item.contractStatus);
    setColour(ColourProjectOptions.find((col) => col.code === item.colour));
    setStartAt(dayjs(item.startAt));
    setEndAt(dayjs(item.endAt));
    setContractCurrency(item.contractCurrency);
    setIsBillable(!isBillable);
    setClientLegalName(getClientName(clients, item.clientId));
  }, [item, clients, isBillable]);

  useEffect(() => {
    if (isOpen) {
      handleUpdate();
    }
  }, [isOpen, handleUpdate]);

  useEffect(() => {
    projectsStore.loadProjects();
    clientsStore.loadClients();
    membersStore.loadMembers();
  }, []);

  const setNameByRow = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const clientNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setClientLegalName(e.target.value);
    setClientId(getClientId(clients, e.target.value));
  }, [clients]);

  const managerChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setManager(e.target.value);
  }, []);

  const statusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWorkStatus(e.target.value);
  }, []);

  const contractStatusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setContractStatus(e.target.value);
    },
    []
  );

  const colorChange = (e: { target: { value: string } }) => {
    setColour(ColourProjectOptions.find((col) => col.value === e.target.value));
  };

  const contractCurrencyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setContractCurrency(e.target.value);
    },
    []
  );

  const startAtChange = useCallback((changeEventDate: Dayjs | null) => {
    if (changeEventDate) {
      setStartAt(changeEventDate);
    }
  }, []);

  const endAtChange = useCallback((changeEventDate: Dayjs | null) => {
    if (changeEventDate) {
      setEndAt(changeEventDate);
    }
  }, []);

  const billableChange = useCallback(() => {
    setIsBillable((prev) => !prev);
  }, []);

  const handleOnClick = useCallback((cIsButtonClick: boolean) => {
    setOnSetClick(!cIsButtonClick);
  }, []);

  const handleClose = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  return (
    <Profile isOpen={isOpen} handleClose={handleClose}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} className={classes.gridBox}>
          <Grid item xs={11}>
            <h2 className={classes.pageName}>Project settings</h2>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => handleClose()}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <Box className={classes.textFieldBox}>
          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Project name</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                value={name}
                onChange={setNameByRow}
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Client</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={clientNameChange}
                value={clientLegalName}
              >
                {clients.map((option) => (
                  <MenuItem key={option.id} value={option.legalName}>
                    {option.legalName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Project manager</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={managerChange}
                value={manager}
              >
                {members
                  .filter((member) => member.role === 'MANAGER')
                  .map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Status</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="standard-basic"
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={statusChange}
                value={workStatus}
              >
                {Object.values(WorkStatusVariant).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.font}>Contract status</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="standard-basic"
                variant="standard"
                select={buttonContractStatus}
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={contractStatusChange}
                value={contractStatus}
              >
                <MenuItem onClick={() => setButtonContractStatus(false)}>
                  <AddCircleOutlineIcon />
                  Add new contract status
                </MenuItem>
                {Object.values(ContractStatusVariant).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Color label</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                select
                color="primary"
                fullWidth
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onChange={colorChange}
                value={colour?.value}
              >
                {ColourProjectOptions.map((col) => {
                  return (
                    <MenuItem
                      key={col.code}
                      value={col.value}
                      style={{ color: col.code }}
                    >
                      {col.value}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>
                Link to legal archive
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="standard"
                fullWidth
                autoFocus
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Start date</Typography>
            </Grid>
            <Grid item xs={9}>
              <DatePicker date={startAt} onChange={startAtChange} />
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.font}>End date</Typography>
            </Grid>
            <Grid item xs={9}>
              <DatePicker date={endAt} onChange={endAtChange} />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.gridBox}>
            <Grid item xs={3}>
              <Typography className={classes.font}>Billable rate</Typography>
            </Grid>
            <Grid item xs={3}>
              <Switch checked={isBillable} onChange={billableChange} />
            </Grid>
            <Grid item xs={6}>
              <Fade in={isBillable}>
                <Grid container spacing={1} className={classes.gridBox}>
                  <Grid item xs={7}>
                    <Typography className={classes.font}>
                      Contract currency
                    </Typography>
                  </Grid>

                  <Grid item xs={5}>
                    <FormControl fullWidth onChange={contractCurrencyChange}>
                      <NativeSelect
                        className={classes.font}
                        defaultValue={contractCurrency}
                      >
                        <option value="Rubbles">Rubles</option>
                        <option value="USD">USD</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Fade>
            </Grid>
          </Grid>

          <Collapse in={isBillable}>
            <Grid container className={classes.gridBox}>
              <Grid item xs={12}>
                <Typography className={classes.font}>
                  Project billable rate
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ListBillableRateUSD
                  projectId={item.id}
                  checked={contractCurrency === 'USD'}
                />
              </Grid>
            </Grid>
          </Collapse>

          <Collapse in={isBillable}>
            <Grid container spacing={1} className={classes.gridBox}>
              <Grid item xs={3}>
                <Chip label="n/a" className={classes.chip} variant="filled" />
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
                    },
                    disableUnderline: true
                  }}
                  disabled
                  value={0}
                  variant="standard"
                />
              </Grid>

              {contractCurrency === 'USD' && (
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
                      },
                      disableUnderline: true
                    }}
                    variant="standard"
                    value={0}
                    disabled
                  />
                </Grid>
              )}

              {contractCurrency === 'USD' && (
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
                      },
                      disableUnderline: true
                    }}
                    variant="standard"
                    value={rateStore.rate}
                    disabled
                  />
                </Grid>
              )}

              <Grid item xs={2}>
                <Button
                  onClick={() => {
                    handleOnClick(onSetClick);
                  }}
                >
                  SET
                </Button>
                <SetNewBillableRate
                  projectId={item.id}
                  isOpen={onSetClick}
                  setOpen={setOnSetClick}
                  checked={contractCurrency === 'USD'}
                />
              </Grid>
            </Grid>
          </Collapse>

          <Box className={classes.buttonBox}>
            <Button className={classes.cancel} onClick={() => handleClose()}>
              CANCEL
            </Button>
            <Button
              className={classes.save}
              onClick={() => {
                handleUpdateProject();
                handleClose();
              }}
            >
              SAVE
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Profile>
  );
};
export default observer(ProjectAdmin);
