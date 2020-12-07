
import React from 'react';
import {Box, Button, Typography, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
// import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import starred from './starred';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import formatDate from './TimeFormat';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
  topbar: {
    display: 'flex',
  },
  topIcons: {
    flexShrink: 0,
  },
  close: {
    width: '100%',
  },
  subject: {
    fontSize: '14pt',
  },
  midbar: {
    display: 'flex',
  },
  indicator: {
    backgroundColor: '#c3c3c3',
    paddingTop: '4px',
    paddingRight: '4px',
    paddingLeft: '4px',
    fontSize: '10pt',
    alignItems: 'center',
    borderRadius: 4,
  },
  bottombar: {
    display: 'flex',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  from: {
    width: '100%',
    paddingTop: '2px',
  },
  back: {
    flexShrink: 'end',
    alignItems: 'center',
    paddingTop: '5px',
  },
  avatar: {
    paddingRight: '5px',
  },
}));

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
};

/**
 * The viewer for an email
 * @param {obj} email The email to display
 * @param {function} setEmail The set state function for email
 * @param {bool} mobile bool representing whether mobile view
 * @param {function} forceRefresh
 * @return {JSX}
 */
function mailViewer(email, setEmail, mobile, forceRefresh) {
  const classes = useStyles();

  const setUnread = () => {
    setRead(email.id, false);
    setEmail(false);
  };

  const setClose = () => {
    if (mobile) {
      return (
        <Button onClick={() => setEmail(false)}>
          <ArrowBackIosIcon/>
        </Button>
      );
    }
  };

  return (
    <Box>
      <Box className={classes.topbar}>
        <Box
          className={classes.close}
        >
          {setClose()}
        </Box>
        <Box className={classes.topIcons}>
          <MailOutlineIcon button onClick={() => setUnread()}/>
          <MoveToInboxIcon/>
          <DeleteIcon/>
        </Box>
      </Box>
      <Typography className={classes.subject}>
        {email? email.subject : 'Error'}
      </Typography>
      <Box className={classes.midbar}>
        <Box width='100%' display='flex'>
          <Box className={classes.indicator}>
            {email? email.mailbox : 'Mailbox'}
          </Box>
          <Box width='100%'>
          </Box>
        </Box>
        {email?
          starred(email, setEmail, forceRefresh) :
          <StarBorderIcon flexshrink={1}/>
        }
      </Box>
      <Box className={classes.bottombar}>
        <Box className={classes.avatar}>
          <Avatar>
            {email?
              email.mailbox == 'Sent'?
                email.to.name[0] :
                email.from.name[0] :
              'A'
            }
          </Avatar>
        </Box>
        <Box className={classes.from}>
          <Box className={classes.root}>
            <Box>
              {email?
                email.mailbox == 'Sent'?
                  email.to.name :
                  email.from.name :
                'Error'}
            </Box>
            <Box width='8px'>
              {' '}
            </Box>
            <Box>
              {email? formatDate(email.sent) : 'Error'}
            </Box>
          </Box>
          <Box>
            {email?
              email.mailbox == 'Sent'?
                email.to.email :
                email.from.email :
              'Error'}
          </Box>
        </Box>
        <Box className={classes.back}>
          <ArrowBackIcon/>
        </Box>
      </Box>
      {email? email.content : 'Error'}
    </Box>
  );
}

export default mailViewer;
