import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState
} from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Close from '@mui/icons-material/Close';

// Layouts
import Profile from 'layouts/ProfileLayout';

// Stores
import projectsStore from 'stores/ProjectsStore';
import clientsStore from 'stores/ClientsStore';

// Types
import { ColourCodeProjectVariant, ColourProjectVariant } from 'types/project';

// Styles
import classes from './AddProjectModal.module.scss';

interface AddProjectModalProps {
  isOpen: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const AddProjectModal: FC<AddProjectModalProps> = ({ isOpen, setOpen }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f36d25'
      }
    }
  });

  const [name, setName] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [clientId, setClientId] = useState<string>('client');
  const [color, setColor] = useState<string>('');
  const [colorCode, setColorCode] = useState<string>('');
  const [selectedField, setSelectedField] = useState<string>('');

  const { clients } = clientsStore;

  useEffect(() => {
    clientsStore.loadClients();
  }, []);

  const addProject = useCallback(
    (cName: string, cClientId: string, cColorCode: string) => {
      projectsStore.addProject(cName, cClientId, cColorCode);
    },
    []
  );

  const clearModal = useCallback(() => {
    setName('');
    setClient('');
    setColor('');
  }, []);

  const closeModal = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const changeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const changeClient = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  }, []);

  const colorChange = useCallback((event: { target: { value: string } }) => {
    setColor(event.target.value);
  }, []);

  const saveClientId = useCallback((id: string) => {
    setClientId(id);
  }, []);

  return (
    <Profile isOpen={isOpen} handleClose={closeModal}>
      <ThemeProvider theme={theme}>
        <div className={classes.wrapper}>
          <div className={classes.headerContainer}>
            <div>Add project</div>
            <IconButton
              onClick={() => {
                closeModal();
                clearModal();
              }}
            >
              <Close className={classes.close} />
            </IconButton>
          </div>
          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={3}>
              <div
                className={clsx(classes.name, {
                  [classes.selectedName]: selectedField === 'projectName'
                })}
              >
                Project name
              </div>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                fullWidth
                color="primary"
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onFocus={() => setSelectedField('projectName')}
                onBlur={() => setSelectedField('')}
                className={classes.fullTextField}
                onChange={changeName}
                value={name}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={3}>
              <div
                className={clsx(classes.name, {
                  [classes.selectedName]: selectedField === 'client'
                })}
              >
                Client
              </div>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                variant="standard"
                select
                fullWidth
                color="primary"
                InputProps={{
                  classes: {
                    root: classes.font
                  }
                }}
                onFocus={() => setSelectedField('client')}
                onBlur={() => setSelectedField('')}
                className={classes.fullTextField}
                value={client}
                onChange={changeClient}
              >
                {clients.map((option) => (
                  <MenuItem
                    key={option.id}
                    onClick={() => saveClientId(option.id)}
                    value={option.legalName}
                  >
                    {option.legalName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.gridBox}>
            <Grid item xs={3}>
              <div
                className={clsx(classes.name, {
                  [classes.selectedName]: selectedField === 'colorLabel'
                })}
              >
                Color label
              </div>
            </Grid>
            <Grid item xs={9}>
              <Select
                className={clsx(classes.font, {
                  [classes.colorRed]: color === ColourProjectVariant.red,
                  [classes.colorBlue]: color === ColourProjectVariant.blue,
                  [classes.colorPurple]: color === ColourProjectVariant.purple,
                  [classes.colorLightPurple]:
                    color === ColourProjectVariant.lightPurple,
                  [classes.colorOrange]: color === ColourProjectVariant.orange,
                  [classes.colorLightGreen]:
                    color === ColourProjectVariant.lightGreen,
                  [classes.colorGreen]: color === ColourProjectVariant.green,
                  [classes.colorIndigo]: color === ColourProjectVariant.indigo,
                  [classes.colorYellow]: color === ColourProjectVariant.yellow
                })}
                fullWidth
                onFocus={() => setSelectedField('colorLabel')}
                onBlur={() => setSelectedField('')}
                value={color}
                onChange={colorChange}
                variant="standard"
              >
                <MenuItem
                  onClick={() => setColorCode(ColourCodeProjectVariant.red)}
                  value={ColourProjectVariant.red}
                  style={{ color: ColourCodeProjectVariant.red }}
                >
                  Red
                </MenuItem>
                <MenuItem
                  onClick={() => setColorCode(ColourCodeProjectVariant.blue)}
                  value={ColourProjectVariant.blue}
                  style={{ color: ColourCodeProjectVariant.blue }}
                >
                  Blue
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setColorCode(ColourCodeProjectVariant.lightPurple)
                  }
                  value={ColourProjectVariant.lightPurple}
                  style={{ color: ColourCodeProjectVariant.lightPurple }}
                >
                  Light Purple
                </MenuItem>
                <MenuItem
                  onClick={() => setColorCode(ColourCodeProjectVariant.purple)}
                  value={ColourProjectVariant.purple}
                  style={{ color: ColourCodeProjectVariant.purple }}
                >
                  Purple
                </MenuItem>
                <MenuItem
                  onClick={() => setColorCode(ColourCodeProjectVariant.orange)}
                  value={ColourProjectVariant.orange}
                  style={{ color: ColourCodeProjectVariant.orange }}
                >
                  Orange
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setColorCode(ColourCodeProjectVariant.lightGreen)
                  }
                  value={ColourProjectVariant.lightGreen}
                  style={{ color: ColourCodeProjectVariant.lightGreen }}
                >
                  Light Green
                </MenuItem>
                <MenuItem
                  onClick={() => setColorCode(ColourCodeProjectVariant.green)}
                  value={ColourProjectVariant.green}
                  style={{ color: ColourCodeProjectVariant.green }}
                >
                  Green
                </MenuItem>
                <MenuItem
                  onClick={() => setColorCode(ColourCodeProjectVariant.indigo)}
                  value={ColourProjectVariant.indigo}
                  style={{ color: ColourCodeProjectVariant.indigo }}
                >
                  Indigo
                </MenuItem>
                <MenuItem
                  onClick={() => setColorCode(ColourCodeProjectVariant.yellow)}
                  value={ColourProjectVariant.yellow}
                  style={{ color: ColourCodeProjectVariant.yellow }}
                >
                  Yellow
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
          <div className={classes.buttonBox}>
            <Button
              className={classes.buttonWithoutBorders}
              onClick={clearModal}
            >
              DELETE
            </Button>
            <Button
              className={classes.buttonWithoutBorders}
              onClick={() => {
                closeModal();
                clearModal();
              }}
            >
              CANCEL
            </Button>
            <Button
              className={classes.save}
              onClick={() => {
                closeModal();
                clearModal();
                addProject(name, clientId, colorCode);
              }}
            >
              SAVE
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </Profile>
  );
};

export default observer(AddProjectModal);
