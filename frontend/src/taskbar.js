import {List, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InputIcon from '@material-ui/icons/Input';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  currentMailbox: {
    backgroundColor: '#c3c3c3',
  },
  normalMailbox: {

  },
}));

/**
 * @return {Array}
 */
function getOtherMailboxes() {
  return ['Work', 'School', 'Family'];
}

/**
 * @param {string} mailbox
 * @param {function} setMailbox
 * @param {function} setOpen
 * @return {JSX}
 */
export default function taskbar(mailbox, setMailbox, setOpen) {
  const classes = useStyles();
  const setNewMailbox = (newMailbox) => {
    setMailbox(newMailbox);
    if (setOpen) {
      setOpen(false);
    }
  };
  const logos = {
    Inbox: <InboxIcon />,
    Starred: <StarIcon />,
    Sent: <InputIcon />,
    Trash: <DeleteOutlineIcon />,
    Drafts: <DraftsIcon />,
  };
  return (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem
          button
          onClick={() => setNewMailbox('Inbox')}
          className={
            mailbox == 'Inbox' ?
              classes.currentMailbox :
              classes.normailMailbox
          }
        >
          <ListItemIcon>
            {logos['Inbox']}
          </ListItemIcon>
          <ListItemText primary={'Inbox'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {['Starred', 'Sent', 'Drafts', 'Trash'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => setNewMailbox(text)}
            className={
              mailbox == text ?
                classes.currentMailbox :
                classes.normailMailbox
            }
          >
            <ListItemIcon>
              {logos[text]}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {getOtherMailboxes().map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => setNewMailbox(text)}
            className={
              mailbox == text ?
                classes.currentMailbox :
                classes.normailMailbox
            }
          >
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={'New Mailbox'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItem>
      </List>
    </div>
  );
}
