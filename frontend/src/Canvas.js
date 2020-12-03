import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Box, List, ListItem} from '@material-ui/core';
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
  mailLeft: {
    float: 'left',
    width: '50ch',
    paddingRight: '10px',
    component: 'span',
  },
  mailRight: {
    width: '20%',
    component: 'span',
  },
  subjectLine: {
    fontSize: '10pt',
    textOverflow: 'ellipsis',
  },
  fromName: {
    fontSize: '11pt',
  },
  emailContent: {
    fontSize: '8pt',
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
 * Function to format the date of the email
 * @param {string} time the time time stamp of the email
 * @return {string}
 */
function formatDate(time) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date();
  const inDate = new Date(time);
  let outDate;
  outDate = time;
  if (date.getMonth() == inDate.getMonth()) {
    if (date.getDate() == inDate.getDate()) {
      let min = inDate.getMinutes();
      let hour = inDate.getHours();
      let ampm = ' am';
      min = ('0'+min).slice(-2);
      if (hour >= 12) {
        hour -= 12;
        ampm = ' pm';
      }
      if (hour == 0) {
        hour = 12;
      }
      outDate = hour+':'+min+ampm;
    } else if (date.getDate() == inDate.getDate() + 1) {
      outDate = 'yesterday';
    }
  } else if (date > inDate) {
    outDate = months[inDate.getMonth()]+' '+inDate.getDate();
  } else {
    outDate = time;
  }
  return outDate;
}

/**
 * @param {string} mailbox
 * @return {JSX}
 */
export default function canvas(mailbox) {
  const classes = useStyles();
  const [mail, setMail] = React.useState(undefined);

  const mailItem = (email) => {
    return (
      <Box className={classes.root}>
        <Box className={classes.mailLeft}>
          <Typography className={classes.fromName}>
            {email.from.name}
          </Typography>
          <Typography className={classes.subjectLine}>
            {email.subject}
          </Typography>
          <Typography className={classes.emailContent}>
            {'Content of email stand in'}
          </Typography>
        </Box>
        <Box className={classes.mailRight}>
          {formatDate(email.sent)}
        </Box>
      </Box>
    );
  };

  const generateMail = () => {
    let splitMail = mail;
    splitMail = splitMail.splice(0, 50);
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
