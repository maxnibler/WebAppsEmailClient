import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Box, List, ListItem, Avatar} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
    width: '80%',
    paddingRight: '10px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  mailRight: {
    width: '20%',
    minWidth: '45px',
  },
  subjectLine: {
    fontSize: '10pt',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  fromName: {
    fontSize: '11pt',
    overflow: 'hidden',
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
        <Box className={classes.mailLeft}>
          <Typography className={classes.fromName}>
            {email.from.name}
          </Typography>
          <Typography className={classes.subjectLine}>
            {email.subject}
          </Typography>
          <Typography
            className={classes.emailContent}
          >
            {email.content}
          </Typography>
        </Box>
        <Box className={classes.mailRight}>
          <Box className={classes.date}>
            {formatDate(email.sent)}
          </Box>
          <Box className={classes.star}>
            <StarBorderIcon/>
          </Box>
        </Box>
      </Box>
    );
  };

  const emailToViewer = (inEmail) => {
    setEmail(inEmail);
  };

  const generateMail = (setEmail) => {
    let splitMail = mail;
    if (splitMail == undefined) {
      return 'Error: No mail found';
    }
    splitMail = splitMail.splice(0, 50);
    return (
      <List className={classes.list}>
        {splitMail.map((item, ind) => (
          <ListItem
            key={ind}
            className={classes.listitem}
            button
            onClick={()=>emailToViewer(item)}
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
