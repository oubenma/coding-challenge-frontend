import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmojiTransportationOutlinedIcon from '@material-ui/icons/EmojiTransportationOutlined';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CATEGORIES_PAGE_URL, PRODUCTS_PAGE_URL } from '../utils/constants';


const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },

  drawerPaper: {
    position: 'static',
    width: DRAWER_WIDTH,
    height: 'calc(150% - 2px)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  }
}));

interface Props {
  handleDrawerClose: () => void;
  isOpen: boolean;
}

export default function SideBar({ handleDrawerClose, isOpen }: Props) {
  const history = useHistory();
  const classes = useStyles();

  const redirect = (url: string) => {
    history.push(url);
  };


  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose)
      }}
      open={isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          component="button"
          onClick={() => redirect(CATEGORIES_PAGE_URL)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>

        <ListItem
          button
          component="button"
          onClick={() => redirect(PRODUCTS_PAGE_URL)}
        >
          <ListItemIcon>
            <EmojiTransportationOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>


      </List>
    </Drawer>
  );
}
