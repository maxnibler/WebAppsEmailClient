/**
 * Code borrowed from material-ui.com
 */

import React, {useEffect} from 'react';
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
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
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
// import composeView from './ComposeView';

const api = require('./APIcalls.js');

const drawerWidth = 240;
const canvasWidth = '90ch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-beginning',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
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
    flexGrow: 1,
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
  const [compose, setCompose] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [mail, setMail] = React.useState(undefined);
  const [force, forceRefresh] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    api.getMail(setMail, mailbox);
    forceRefresh(false);
  }, [email, mailbox, force, open]);

  const toggleCompose = () => {
    if (!compose) setEmail(false);
    setCompose(!compose);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (settings && search);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute"
        className={classes.appBar}
        width={100}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.logo}>
            CSE183 Mail - {mailbox}
          </Typography>
          {searchBar(false, false, setSearch)}
          <IconButton color="inherit" onClick={() => toggleCompose()}>
            <MailIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden
        mdDown
      >
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
        >
          <div className={classes.toolbarHeader}>
          </div>
          <Divider />
          {taskbar(mailbox, setMailbox, setOpen, setSettings)}
        </Drawer>
      </Hidden>
      <Hidden
        lgUp
      >
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='temporary'
          open={open}
          onClose={toggleDrawer}
        >
          <div className={classes.toolbarHeader}>
          </div>
          <Divider />
          {taskbar(mailbox, setMailbox, setOpen, setSettings)}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Container
            className={classes.canvas}
          >
            {canvas(setEmail, mail, forceRefresh)}
          </Container>
          <Container
            className={clsx(classes.mailViewer, !email && classes.Hidden)}
          >
            {mailViewer(email, setEmail, false, forceRefresh)}
          </Container>
        </Container>
      </main>
    </div>
  );
}

export default DesktopView;
