/**
 * Code borrowed from material-ui.com
 */

import React from 'react';
// import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Drawer from '@material-ui/core/Drawer';
// import Box from '@material-ui/core/Box';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import MenuIcon from '@material-ui/icons/Menu';
// import MailIcon from '@material-ui/icons/Mail';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import searchBar from './SearchBar.js';
// import Canvas from './Canvas.js';
// import taskbar from './taskbar.js';
import DimensionsProvider from './DimensionsProvider.js';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import ResponsiveLayout from './ResponsiveLayout';

/**
 * Simple component with no state.
 *
 * @param {function} setDummy set the dummy state
 *
function getDummy(setDummy) {
  fetch('http://localhost:3010/v0/dummy')
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setDummy(json.message);
      })
      .catch((error) => {
        setDummy(error.toString());
      });
}*/
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DimensionsProvider>
        <ResponsiveLayout
          renderDesktop={() => (
            <DesktopView/>
          )}
          renderMobile={() => (
            <MobileView/>
          )}
        />
      </DimensionsProvider>
    </div>
  );
}

export default App;
