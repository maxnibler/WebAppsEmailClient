import {List, ListItem} from '@material-ui/core';
import React from 'react';

/**
 * @param {string} mailbox
 * @param {function} setMailbox
 * @return {JSX}
 */
export default function taskbar(mailbox, setMailbox) {
  return (
    <List>
      <ListItem onClick={() => setMailbox('Trash')}>
        {mailbox}
      </ListItem>
    </List>
  );
}
