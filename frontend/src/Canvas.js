import React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {Box, List, ListItem, Avatar} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import starred from './starred';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  list: {
    width: '100%',
  },
  listitem: {
    width: '100%',
  },
  mailLeft: {
    float: 'left',
    width: '78%',
    paddingRight: '10px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  mailRight: {
    width: '22%',
    minWidth: '48px',
  },
  subjectLine: {
    fontSize: '10pt',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  subjectLineB: {
    fontSize: '10pt',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: 600,
  },
  fromName: {
    fontSize: '11pt',
    overflow: 'hidden',
  },
  fromNameB: {
    fontSize: '11pt',
    overflow: 'hidden',
    fontWeight: 750,
  },
  emailContent: {
    fontSize: '8pt',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  avatar: {
    paddingRight: '5px',
  },
  date: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  star: {
    display: 'flex',
    justifyContent: 'flex-end',
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
 * @param {string} id
 * @param {boolean} read
 */
function setRead(id, read) {
  const url = 'http://172.16.0.18:3010/v0/read/'+id+'?read='+read;
  const body = {
    method: 'PUT',
  };
  // console.log(url);
  fetch(url, body)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
      })
      .catch((error) => {
        console.log(error.toString());
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
 * @param {function} setEmail
 * @return {JSX}
 */
export default function canvas(mailbox, setEmail) {
  const classes = useStyles();
  const [mail, setMail] = React.useState(undefined);

  const mailItem = (email) => {
    return (
      <Box className={classes.root}>
        <Box className={classes.avatar}>
          <Avatar>{email.from.name[0]}</Avatar>
        </Box>
        <Box
          className={classes.mailLeft}
          button
          onClick={()=>emailToViewer(email)}
        >
          <Typography
            className={clsx(classes.fromName, !email.read && classes.fromNameB)}
          >
            {email.from.name}
          </Typography>
          <Typography className={
            clsx(classes.subjectLine, !email.read && classes.subjectLineB)
          }>
            {email.subject}
          </Typography>
          <Typography
            className={classes.emailContent}
          >
            {email.content}
          </Typography>
        </Box>
        <Box
          className={classes.mailRight}
        >
          <Box className={classes.date}>
            {formatDate(email.sent)}
          </Box>
          <Box className={classes.star}>
            {starred(email, setEmail)}
          </Box>
        </Box>
      </Box>
    );
  };

  const emailToViewer = (inEmail) => {
    setEmail(inEmail);
    setRead(inEmail.id, true);
  };

  const generateMail = (setEmail) => {
    let splitMail = mail;
    if (Array.isArray(splitMail)) {
      splitMail = splitMail.splice(0, 50);
    } else {
      return 'This mailbox is empty';
    }
    return (
      <List className={classes.list}>
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
    <Box>
      <Divider/>
      {getMail(setMail, mailbox)}
      {generateMail(setEmail)}
    </Box>
  );
}
