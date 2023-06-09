import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

// Icons
import Close from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useFormik } from 'formik';
import * as yup from 'yup';

// Components
import EndLineAdornment from 'components/EndLineAdornment';

// Stores
import clientStore from 'stores/ClientsStore';
import projectsStore from 'stores/ProjectsStore';

// Theme
import theme from 'theme';

// Types
import { IProject } from 'types/project';

// Styles
import classes from './AddClientModal.module.scss';

interface IProps {
  open: boolean;
  handleClose: () => void;
}

enum Names {
  companyName = 'companyName',
  projectsId = 'projects',
  directorName = 'directorName',
  contactName = 'contactName',
  phone = 'phone',
  email = 'email',
  postalAddress = 'postalAddress',
  legalAddress = 'legalAddress',
  link = 'link',
  tin = 'tin',
  ogrn = 'ogrn',
  kpp = 'kpp',
  commentary = 'commentary'
}

// eslint-disable-next-line no-useless-escape
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const validationSchema = yup.object({
  [Names.companyName]: yup
    .string()
    .ensure()
    .trim('Remove whitespaces')
    .min(3, 'Minimum length is 3 characters')
    .required('Company name is required'),
  [Names.directorName]: yup.string().trim('Remove whitespaces'),
  [Names.contactName]: yup.string().trim('Remove whitespaces'),
  [Names.phone]: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  [Names.email]: yup.string().email('This email is not valid'),
  [Names.postalAddress]: yup.string(),
  [Names.legalAddress]: yup.string(),
  [Names.link]: yup.string().url('This url is not valid'),
  [Names.tin]: yup
    .string()
    .matches(/^(([0-9]{12})|([0-9]{10}))?$/, 'TIN should has 10 or 12 digits'),
  [Names.ogrn]: yup
    .string()
    .matches(/^([0-9]{13})?$/, 'OGRN should has 13 digits'),
  [Names.kpp]: yup.string().matches(/^([0-9]{9})?$/, 'KPP should has 9 digits'),
  [Names.commentary]: yup
    .string()
    .max(100, 'Commentary cannot be more than 100 characters')
});

const AddClientModal: FC<IProps> = ({ open, handleClose }) => {
  const [selectedField, setSelectedField] = useState<Names | null>(null);
  const [autocompleteValue, setAutocompleteValue] = useState<
    IProject[] | undefined
  >();

  const { projects, loading } = projectsStore;

  useEffect(() => {
    projectsStore.loadProjects();
  }, []);

  const formik = useFormik({
    initialValues: {
      [Names.companyName]: '',
      [Names.directorName]: '',
      [Names.contactName]: '',
      [Names.phone]: '',
      [Names.email]: '',
      [Names.postalAddress]: '',
      [Names.legalAddress]: '',
      [Names.link]: '',
      [Names.tin]: '',
      [Names.ogrn]: '',
      [Names.kpp]: '',
      [Names.commentary]: ''
    },
    validationSchema,
    onSubmit: (values) => {
      clientStore.addClient({
        director: values.directorName,
        contactPerson: values.contactName,
        email: values.email,
        legalTin: values.tin,
        legalOgrn: values.ogrn,
        legalKpp: values.kpp,
        legalAddress: values.legalAddress,
        postalAddress: values.postalAddress,
        legalName: values.companyName,
        projectId:
          Array.isArray(autocompleteValue) && autocompleteValue.length !== 0
            ? autocompleteValue[0].id
            : '',
        comment: values.commentary
      });
      handleClose();
    }
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <ThemeProvider theme={theme}>
        <form onSubmit={formik.handleSubmit}>
          <Box className={classes.container}>
            <Box className={classes.header}>
              <Typography variant="h5">New client`s profile</Typography>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <Box className={classes.main}>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.companyName
                  })}
                >
                  Company name
                </Typography>
                <TextField
                  name={Names.companyName}
                  variant="standard"
                  fullWidth
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.companyName}
                        onClean={() => {
                          formik.setFieldValue(Names.companyName, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.companyName)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                  error={
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                  placeholder="New Company Name"
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.element}>
                <Typography variant="body1" className={classes.name}>
                  Status
                </Typography>
                <Typography
                  variant="body1"
                  className={clsx([classes.name, classes.selectedName])}
                >
                  Active
                </Typography>
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.projectsId
                  })}
                >
                  Projects
                </Typography>
                <Autocomplete
                  multiple
                  limitTags={2}
                  color="primary"
                  options={projects || []}
                  getOptionLabel={(option: IProject) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder={
                        !autocompleteValue?.length ? 'Start typing' : ''
                      }
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      style={{
                        marginLeft: 0,
                        color: option?.colour
                      }}
                    >
                      {option.name}
                    </li>
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        sx={{
                          color: 'white',
                          backgroundColor: option?.colour
                        }}
                      />
                    ))
                  }
                  className={classes.textField}
                  disableClearable
                  disableCloseOnSelect
                  onFocus={() => setSelectedField(Names.projectsId)}
                  onBlur={() => setSelectedField(null)}
                  value={autocompleteValue}
                  onChange={(_event, value) => {
                    setAutocompleteValue(value);
                  }}
                  popupIcon={<AddCircleOutlineOutlinedIcon />}
                />
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.directorName
                  })}
                >
                  Director name
                </Typography>
                <TextField
                  name={Names.directorName}
                  variant="standard"
                  fullWidth
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.directorName}
                        onClean={() => {
                          formik.setFieldValue(Names.directorName, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.directorName)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.directorName}
                  error={
                    formik.touched.directorName &&
                    Boolean(formik.errors.directorName)
                  }
                  placeholder="Director name"
                  helperText={
                    formik.touched.directorName && formik.errors.directorName
                  }
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.contactName
                  })}
                >
                  Contact name
                </Typography>
                <TextField
                  name={Names.contactName}
                  variant="standard"
                  fullWidth
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.contactName}
                        onClean={() => {
                          formik.setFieldValue(Names.contactName, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.contactName)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.contactName}
                  error={
                    formik.touched.contactName &&
                    Boolean(formik.errors.contactName)
                  }
                  placeholder="Contact name"
                  helperText={
                    formik.touched.contactName && formik.errors.contactName
                  }
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.phone
                  })}
                >
                  Phone
                </Typography>
                <TextField
                  name={Names.phone}
                  variant="standard"
                  type="phone"
                  fullWidth
                  color="primary"
                  InputProps={{
                    type: 'numeric',
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.phone}
                        onClean={() => {
                          formik.setFieldValue(Names.phone, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.phone)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  placeholder="+79998881122"
                  helperText={formik.touched.phone && formik.errors.phone}
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.email
                  })}
                >
                  Email
                </Typography>
                <TextField
                  name={Names.email}
                  variant="standard"
                  fullWidth
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.email}
                        onClean={() => {
                          formik.setFieldValue(Names.email, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.email)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  placeholder="company@gmail.com"
                  helperText={formik.touched.email && formik.errors.email}
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]:
                      selectedField === Names.postalAddress
                  })}
                >
                  Postal Address
                </Typography>
                <TextField
                  name={Names.postalAddress}
                  variant="standard"
                  fullWidth
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.postalAddress}
                        onClean={() => {
                          formik.setFieldValue(Names.postalAddress, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.postalAddress)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.postalAddress}
                  error={
                    formik.touched.postalAddress &&
                    Boolean(formik.errors.postalAddress)
                  }
                  placeholder="644100"
                  helperText={
                    formik.touched.postalAddress && formik.errors.postalAddress
                  }
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.legalAddress
                  })}
                >
                  Legal address
                </Typography>
                <TextField
                  name={Names.legalAddress}
                  variant="standard"
                  fullWidth
                  multiline
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.legalAddress}
                        onClean={() => {
                          formik.setFieldValue(Names.legalAddress, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.legalAddress)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.legalAddress}
                  error={
                    formik.touched.legalAddress &&
                    Boolean(formik.errors.legalAddress)
                  }
                  placeholder="Olga, 21, Zhukova st, Omsk city, Russian Federation"
                  helperText={
                    formik.touched.legalAddress && formik.errors.legalAddress
                  }
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.link
                  })}
                >
                  Link to legal archive
                </Typography>
                <TextField
                  name={Names.link}
                  variant="standard"
                  fullWidth
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.link}
                        onClean={() => {
                          formik.setFieldValue(Names.link, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.link)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.link}
                  error={formik.touched.link && Boolean(formik.errors.link)}
                  placeholder="https://google.com"
                  helperText={formik.touched.link && formik.errors.link}
                  className={classes.textField}
                />
              </Box>
              <Box className={classes.elementMultiple}>
                <Box className={classes.wrapper}>
                  <Typography
                    variant="body1"
                    className={clsx(classes.smallName, {
                      [classes.selectedName]: selectedField === Names.tin
                    })}
                  >
                    TIN
                  </Typography>
                  <TextField
                    name={Names.tin}
                    variant="standard"
                    fullWidth
                    color="primary"
                    InputProps={{
                      classes: {
                        root: classes.font
                      },
                      endAdornment: (
                        <EndLineAdornment
                          isVisible={formik.values.tin}
                          onClean={() => {
                            formik.setFieldValue(Names.tin, '', true);
                          }}
                        />
                      )
                    }}
                    onFocus={() => setSelectedField(Names.tin)}
                    onBlur={() => setSelectedField(null)}
                    onChange={formik.handleChange}
                    value={formik.values.tin}
                    error={formik.touched.tin && Boolean(formik.errors.tin)}
                    placeholder="1234567890"
                    helperText={formik.touched.tin && formik.errors.tin}
                    className={classes.smallTextField}
                  />
                </Box>
                <Box className={classes.wrapper}>
                  <Typography
                    variant="body1"
                    className={clsx(classes.smallName, {
                      [classes.selectedName]: selectedField === Names.ogrn
                    })}
                  >
                    OGRN
                  </Typography>
                  <TextField
                    name={Names.ogrn}
                    variant="standard"
                    fullWidth
                    color="primary"
                    InputProps={{
                      classes: {
                        root: classes.font
                      },
                      endAdornment: (
                        <EndLineAdornment
                          isVisible={formik.values.ogrn}
                          onClean={() => {
                            formik.setFieldValue(Names.ogrn, '', true);
                          }}
                        />
                      )
                    }}
                    onFocus={() => setSelectedField(Names.ogrn)}
                    onBlur={() => setSelectedField(null)}
                    onChange={formik.handleChange}
                    value={formik.values.ogrn}
                    error={formik.touched.ogrn && Boolean(formik.errors.ogrn)}
                    placeholder="1234567890123"
                    helperText={formik.touched.ogrn && formik.errors.ogrn}
                    className={classes.smallTextField}
                  />
                </Box>
                <Box className={classes.wrapper}>
                  <Typography
                    variant="body1"
                    className={clsx(classes.smallName, {
                      [classes.selectedName]: selectedField === Names.kpp
                    })}
                  >
                    KPP
                  </Typography>
                  <TextField
                    name={Names.kpp}
                    variant="standard"
                    fullWidth
                    color="primary"
                    InputProps={{
                      classes: {
                        root: classes.font
                      },
                      endAdornment: (
                        <EndLineAdornment
                          isVisible={formik.values.kpp}
                          onClean={() => {
                            formik.setFieldValue(Names.kpp, '', true);
                          }}
                        />
                      )
                    }}
                    onFocus={() => setSelectedField(Names.kpp)}
                    onBlur={() => setSelectedField(null)}
                    onChange={formik.handleChange}
                    value={formik.values.kpp}
                    error={formik.touched.kpp && Boolean(formik.errors.kpp)}
                    placeholder="123456789"
                    helperText={formik.touched.kpp && formik.errors.kpp}
                    className={classes.smallTextField}
                  />
                </Box>
              </Box>
              <Box className={classes.element}>
                <Typography
                  variant="body1"
                  className={clsx(classes.name, {
                    [classes.selectedName]: selectedField === Names.commentary
                  })}
                >
                  Commentary
                </Typography>
                <TextField
                  name={Names.commentary}
                  variant="standard"
                  fullWidth
                  multiline
                  color="primary"
                  InputProps={{
                    classes: {
                      root: classes.font
                    },
                    endAdornment: (
                      <EndLineAdornment
                        isVisible={formik.values.commentary}
                        onClean={() => {
                          formik.setFieldValue(Names.commentary, '', true);
                        }}
                      />
                    )
                  }}
                  onFocus={() => setSelectedField(Names.commentary)}
                  onBlur={() => setSelectedField(null)}
                  onChange={formik.handleChange}
                  value={formik.values.commentary}
                  error={
                    formik.touched.commentary &&
                    Boolean(formik.errors.commentary)
                  }
                  placeholder="Your comment"
                  helperText={
                    formik.touched.commentary && formik.errors.commentary
                  }
                  className={classes.textField}
                />
              </Box>
            </Box>
            <Box className={classes.footer}>
              <Button className={classes.cancel} onClick={handleClose}>
                CANCEL
              </Button>
              <Button className={classes.save} type="submit">
                ADD
              </Button>
            </Box>
          </Box>
        </form>
      </ThemeProvider>
    </Modal>
  );
};

export default observer(AddClientModal);
