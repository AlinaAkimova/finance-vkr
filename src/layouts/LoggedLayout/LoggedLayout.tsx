import React, { useState, useCallback, FC } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import useTheme from '@mui/material/styles/useTheme';
import MenuIcon from '@mui/icons-material/Menu';

// Icons
import { ReactComponent as Logo } from 'assets/icons/logo.svg';

// Styles
import classes from './LoggedLayout.module.scss';

// Components
import Header from '../../components/Header/Header';

import { sidebarList, subListManagement } from './IconsList';

const widthOpenDrawer = 256;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const widthCloseDrawer =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

const LoggedLayout: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const role = 'Admin';
  const hasManagement = role === 'Admin';
  const location = useLocation();

  const handleNavigate = useCallback((page: string) => {
    navigate(page);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen((cIsOpen) => !cIsOpen);
  }, []);

  const drawerContent = (
    <>
      <Box className={classes.header}>
        <Box
          className={clsx(classes.logo, {
            [classes.deleteItem]: isOpen
          })}
        >
          <Logo fill="green" color="green" />
        </Box>
        <h1
          className={clsx(classes.title, {
            [classes.deleteItem]: isOpen
          })}
        >
          Olga Finance
        </h1>
        <Button onClick={handleOpen} className={classes.openButton}>
          <MenuIcon
            className={clsx({
              [classes.isOpenIcon]: isOpen,
              [classes.closeIcon]: !isOpen
            })}
          />
        </Button>
      </Box>
      <List dense className={classes.list}>
        <div
          className={clsx(classes.subHeader, {
            [classes.deleteItem]: isOpen
          })}
        >
          GENERAL
        </div>
        {sidebarList.map((item) => (
          <div key={item.id}>
            <Tooltip
              key={item.id}
              title={isOpen ? item.desc : ''}
              placement="right"
            >
              <ListItemButton
                onClick={() => handleNavigate(item.page)}
                className={clsx(classes.itemButton, {
                  [classes.activeButton]: location.pathname === `/${item.page}`
                })}
              >
                <ListItemIcon className={classes.icon}>
                  <Badge
                    color="secondary"
                    badgeContent={item.badge}
                    className={classes.badge}
                    variant="dot"
                  >
                    {location.pathname !== `/${item.page}` ? (
                      <item.icon className={classes.icon} />
                    ) : (
                      <item.activeIcon className={classes.icon} />
                    )}
                  </Badge>
                </ListItemIcon>
                <p
                  className={clsx(classes.itemText, {
                    [classes.openedPage]: location.pathname === `/${item.page}`
                  })}
                >
                  {item.desc}
                </p>
                {item.badge !== 0 ? (
                  <Chip
                    label={item.badge}
                    size="small"
                    className={classes.chip}
                  />
                ) : (
                  <div />
                )}
              </ListItemButton>
            </Tooltip>
          </div>
        ))}
        <div
          className={clsx(classes.subHeader, {
            [classes.deleteItem]: isOpen || !hasManagement
          })}
        >
          MANAGEMENT
        </div>
        {subListManagement.map((item) => (
          <div key={item.id}>
            <Tooltip
              key={item.id}
              title={isOpen ? item.desc : ''}
              placement="right"
            >
              <ListItemButton
                onClick={() => handleNavigate(item.page)}
                className={clsx(classes.itemButton, {
                  [classes.activeButton]: location.pathname === `/${item.page}`,
                  [classes.deleteItem]: !hasManagement
                })}
              >
                <ListItemIcon className={classes.icon}>
                  <Badge
                    color="secondary"
                    badgeContent={item.badge}
                    className={classes.badge}
                    variant="dot"
                  >
                    {location.pathname !== `/${item.page}` ? (
                      <item.icon className={classes.icon} />
                    ) : (
                      <item.activeIcon className={classes.icon} />
                    )}
                  </Badge>
                </ListItemIcon>
                <p
                  className={clsx(classes.itemText, {
                    [classes.openedPage]: location.pathname === `/${item.page}`
                  })}
                >
                  {item.desc}
                </p>
                {item.badge !== 0 ? (
                  <Chip
                    label={item.badge}
                    size="small"
                    className={classes.chip}
                  />
                ) : (
                  <div />
                )}
              </ListItemButton>
            </Tooltip>
          </div>
        ))}
      </List>
    </>
  );

  return (
    <Box className={classes.menu}>
      <Drawer
        variant="permanent"
        className={classes.logo}
        open={isOpen}
        sx={{
          width: isOpen
            ? { xs: '0px', sm: widthCloseDrawer }
            : { xs: widthCloseDrawer, sm: widthOpenDrawer },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: isOpen
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen
          }),
          '& .MuiDrawer-paper': {
            justifyContent: 'start',
            overflowX: 'hidden',
            width: isOpen
              ? { xs: '0px', sm: widthCloseDrawer }
              : { xs: widthCloseDrawer, sm: widthOpenDrawer },
            borderRight: '1px solid #ebebeb',
            backgroundColor: isOpen ? '#fffff' : '#fffff',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: isOpen
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen
            })
          }
        }}
      >
        {drawerContent}
      </Drawer>
      <div
        className={classes.longHeader}
        style={{
          width: !isOpen ? `calc(100% - 256px)` : `calc(100% - 68px)`
        }}
      >
        <Header />
        <Outlet />
      </div>
    </Box>
  );
};

export default LoggedLayout;
