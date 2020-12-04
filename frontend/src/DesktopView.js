/**
 * Code borrowed from material-ui.com
 */

import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import searchBar from './SearchBar.js';
import taskbar from './taskbar.js';
import canvas from './Canvas.js';
import mailViewer from './MailViewer';

const drawerWidth = 240;
const canvasWidth = '90ch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-beginning',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    display: 'flex',
  },
  canvas: {
    width: canvasWidth,
  },
  fixedHeight: {
    height: 240,
  },
  Hidden: {
    display: 'none',
  },
  mailViewer: {
    width: 'calc(100%-${canvasWidth}',
  },
  logo: {
    width: '21ch',
  },
}));

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function DesktopView() {
  const classes = useStyles();
  const [mailbox, setMailbox] = React.useState('Inbox');
  const [email, setEmail] = React.useState(false);
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute"
        className={classes.appBar}
        width={100}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logo}>
            CSE183 Mail - {mailbox}
          </Typography>
          {searchBar(false)}
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant='permanent'
      >
        <div className={classes.toolbarHeader}>
        </div>
        <Divider />
        {taskbar(mailbox, setMailbox)}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Container
            className={classes.canvas}
          >
            {canvas(mailbox, setEmail)}
          </Container>
          <Container
            className={clsx(classes.mailViewer, !email && classes.Hidden)}
          >
            {mailViewer(email, setEmail, false)}
          </Container>
        </Container>
      </main>
    </div>
  );
}

export default DesktopView;
