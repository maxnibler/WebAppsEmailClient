import React from 'react';
import Typography from '@material-ui/core/Typography';
import {List, ListItem} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  list: {
    width: '100%',
  },
  listitem: {
    width: '100%',
    border: 1,
    paddingLeft: theme.spacing(4),
  },
}));

/**
 * @param {function} setMail setMail state
 * @param {string} mailbox
 */
function getMail(setMail, mailbox) {
  fetch('http://172.16.0.18:3010/v0/mail?mailbox='+mailbox)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setMail(json);
      })
      .catch((error) => {
        setMail(error.toString());
      });
}

/**
 *
 * @param {obj} email
 * @return {JSX}
 */
function mailItem(email) {
  return (
    <div>
      {email.subject}
      {email.sent}
      <Divider/>
    </div>
  );
}

/**
 * @param {string} mailbox
 * @return {JSX}
 */
export default function canvas(mailbox) {
  const classes = useStyles();
  const [mail, setMail] = React.useState(undefined);

  const generateMail = () => {
    const splitMail = mail;
    splitMail.splice(0, 50);
    return (
      <List className={classes.list}>
        <Divider/>
        {splitMail.map((item, ind) => (
          <ListItem
            key={ind}
            className={classes.listitem}
          >
            {mailItem(item)}
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div>
      <Typography>
        {mailbox}
      </Typography>
      {getMail(setMail, mailbox)}
      {mail? generateMail() : 'Error: No mail found'}
    </div>
  );
}
