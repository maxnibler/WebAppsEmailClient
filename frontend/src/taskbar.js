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
 * @return {JSX}
 */
export default function taskbar(mailbox, setMailbox) {
  const classes = useStyles();
  return (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem
          button
          onClick={() => setMailbox('Inbox')}
          className={
            mailbox=='Inbox'?
              classes.currentMailbox :
              classes.normailMailbox
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={'Inbox'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => setMailbox('Starred')}
          className={
            mailbox=='Starred'?
              classes.currentMailbox :
              classes.normailMailbox
          }
        >
          <ListItemIcon>
            <StarIcon/>
          </ListItemIcon>
          <ListItemText primary={'Starred'} />
        </ListItem>
        <ListItem
          button
          onClick={() => setMailbox('Sent')}
          className={
            mailbox=='Sent'?
              classes.currentMailbox :
              classes.normailMailbox
          }
        >
          <ListItemIcon>
            <InputIcon/>
          </ListItemIcon>
          <ListItemText primary={'Sent'} />
        </ListItem>
        <ListItem
          button
          onClick={() => setMailbox('Drafts')}
          className={
            mailbox=='Drafts'?
              classes.currentMailbox :
              classes.normailMailbox
          }
        >
          <ListItemIcon>
            <DraftsIcon/>
          </ListItemIcon>
          <ListItemText primary={'Drafts'} />
        </ListItem>
        <ListItem
          button
          onClick={() => setMailbox('Trash')}
          className={
            mailbox=='Trash'?
              classes.currentMailbox :
              classes.normailMailbox
          }
        >
          <ListItemIcon>
            <DeleteOutlineIcon/>
          </ListItemIcon>
          <ListItemText primary={'Trash'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {getOtherMailboxes().map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => setMailbox(text)}
            className={
              mailbox==text?
                classes.currentMailbox :
                classes.normailMailbox
            }
          >
            <ListItemIcon>
              <ArrowForwardIcon/>
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
