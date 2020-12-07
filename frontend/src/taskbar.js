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
        setMailboxes(json);
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
  if (mailboxes == undefined) {
    return boxes;
  }
  for (let i = 0; i < mailboxes.length; i++) {
    if (!set.includes(mailboxes[i].name)) {
      boxes.push(mailboxes[i]);
    }
  }
  return boxes;
}

/**
 * @param {string} mailbox
 * @param {function} setMailbox
 * @param {function} setOpen
 * @param {function} setSettings
 * @return {JSX}
 */
export default function taskbar(mailbox, setMailbox, setOpen, setSettings) {
  const classes = useStyles();
  const [mailboxes, setMailboxes] = React.useState([
    {name: 'Inbox', count: 0},
    {name: 'Work', count: 0},
    {name: 'Sent', count: 0},
    {name: 'Trash', count: 0},
    {name: 'School', count: 0},
    {name: 'Starred', count: 0},
  ]);

  const countOf = (boxName) => {
    let count = 0;
    for (let i=0; i<mailboxes.length; i++) {
      if (boxName == mailboxes[i].name) {
        count = mailboxes[i].count;
      }
    }
    if (count == 0) return '';
    else return count;
  };

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
          {mailboxes? countOf('Inbox') : ''}
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
            {mailboxes? text != 'Sent' ? countOf(text) : '' : ''}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {getOtherMailboxes(mailboxes).map((text, index) => (
          <ListItem
            button
            key={index}
            onClick={() => setNewMailbox(text.name)}
            className={
              mailbox == text.name ?
                classes.currentMailbox :
                classes.normailMailbox
            }
          >
            <ListItemIcon>
              <ArrowForwardIcon />
            </ListItemIcon>
            <ListItemText primary={text.name} />
            {mailboxes? countOf(text.name) : ''}
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
          <ListItemText primary={'Settings'} onClick={() => setSettings(true)}/>
        </ListItem>
      </List>
    </div>
  );
}
