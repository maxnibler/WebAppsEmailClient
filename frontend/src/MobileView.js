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
// import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import searchBar from './SearchBar.js';
import canvas from './Canvas.js';
import taskbar from './taskbar.js';
import mailViewer from './MailViewer';
import composeViewer from './ComposeView';
import searchViewer from './SearchViewer';
import settingsViewer from './SettingsViewer';

const api = require('./APIcalls.js');

const drawerWidth = 240;

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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    width: '45ch',
  },
  fixedHeight: {
    height: 240,
  },
  searchBarHidden: {
    display: 'none',
  },
}));

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function MobileView() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mailbox, setMailbox] = React.useState('Inbox');
  const [email, setEmail] = React.useState(false);
  const [compose, setCompose] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [settings, setSettings] = React.useState(false);
  const [mail, setMail] = React.useState(undefined);
  const [force, forceRefresh] = React.useState(false);

  useEffect(() => {
    api.getMail(setMail, mailbox);
  }, [email, mailbox, force, settings, compose, search, open]);

  const handleMailboxChange = (newMailbox) => {
    setMailbox(newMailbox);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const mainView = (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        width={100}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton,
                open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          {searchBar(open, true, setSearch)}
          <IconButton color="inherit">
            <MailIcon onClick={() => setCompose(true)}/>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon onClick={() => setSettings(true)}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        onClose={handleDrawerClose}
      >
        <div className={classes.toolbarHeader}>
          <Typography>
            CSE183 Mail
          </Typography>
        </div>
        <Divider />
        {taskbar(mailbox, handleMailboxChange, setOpen, setSettings)}
      </Drawer>
      <main className={classes.content} onClick={handleDrawerClose}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Typography>
            {mailbox}
          </Typography>
          {canvas(setEmail, mail, forceRefresh)}
        </Container>
      </main>
    </div>
  );

  const emailView = (
    <div className={classes.root}>
      {mailViewer(email, setEmail, true, forceRefresh, setCompose)}
    </div>
  );

  const composeView = (
    <div className={classes.root}>
      {composeViewer(compose, setCompose, true)}
    </div>
  );

  const searchView = (
    <div className={classes.root}>
      {searchViewer(setSearch, true)}
    </div>
  );

  const settingsView = (
    <div className={classes.root}>
      {settingsViewer(setSettings, true)}
    </div>
  );

  if (email) {
    return emailView;
  } else if (compose) {
    return composeView;
  } else if (settings) {
    return settingsView;
  } else if (search) {
    return searchView;
  } else {
    return mainView;
  }
}

export default MobileView;
