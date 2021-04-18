import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './Navbar';
import SideBar from './Sidebar';

const useStyles = makeStyles(theme => ({
    root: {
    display: 'flex'
}
}));

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState(true);
    const handleDrawerOpen = () => {
    setIsOpen(true);
  };
  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar handleDrawerOpen={handleDrawerOpen} isOpen={isOpen} />
      <SideBar handleDrawerClose={handleDrawerClose} isOpen={isOpen} />
      <main style={{ marginTop: 64, marginBottom: 64, width: '100%' }}>
        {children}
      </main>
    </div>
  );
}
