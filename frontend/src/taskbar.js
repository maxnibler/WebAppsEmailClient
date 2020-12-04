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

/**
 * Get List of mailboxes
 * @param {function} setMailboxes
 */
function getMailboxes(setMailboxes) {
  fetch('http://172.16.0.18:3010/v0/mailboxes')
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setMailboxes(json.list);
      })
      .catch((error) => {
        setMailboxes(error.toString());
      });
}

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
 * @param {obj} mailboxes
 * @return {Array}
 */
function getOtherMailboxes(mailboxes) {
  const set = ['Inbox', 'Starred', 'Sent', 'Drafts', 'Trash'];
  const boxes = [];
  for (let i = 0; i < mailboxes.length; i++) {
    if (!set.includes(mailboxes[i])) {
      boxes.push(mailboxes[i]);
    }
  }
  return boxes;
}

/**
 * @param {string} mailbox
 * @param {function} setMailbox
 * @param {function} setOpen
 * @return {JSX}
 */
export default function taskbar(mailbox, setMailbox, setOpen) {
  const classes = useStyles();
  const [mailboxes, setMailboxes] = React.
      useState(['School', 'Work', 'Sent', 'Trash', 'Inbox']);
  const updateMailboxes = (newList) => {
    if (JSON.stringify(newList) != JSON.stringify(mailboxes)) {
      setMailboxes(newList);
    } else {
      return;
    }
  };
  getMailboxes(updateMailboxes);
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
        {getOtherMailboxes(mailboxes).map((text, index) => (
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
