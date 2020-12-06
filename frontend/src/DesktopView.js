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
// import composeView from './ComposeView';

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

  const setOpen = () => {
    console.log('open');
  };

  const toggleCompose = () => {
    if (!compose) setEmail(false);
    setCompose(!compose);
  };

  if (settings && search);

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
          {searchBar(false, false, setSearch)}
          <IconButton color="inherit" onClick={() => toggleCompose()}>
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
        {taskbar(mailbox, setMailbox, setOpen, setSettings)}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Container
            className={classes.canvas}
          >
            {canvas(mailbox, setEmail, mail, setMail)}
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
