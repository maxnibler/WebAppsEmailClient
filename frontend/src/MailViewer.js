
import React from 'react';
import {Box, Button, Typography, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
// import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
 * The viewer for an email
 * @param {obj} email The email to display
 * @param {function} setEmail The set state function for email
 * @param {bool} mobile bool representing whether mobile view
 * @return {JSX}
 */
function mailViewer(email, setEmail, mobile) {
  const classes = useStyles();

  const setClose = () => {
    if (mobile) {
      return (
        <Button onClick={() => setEmail(false)}>
          Close
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
          <MailOutlineIcon/>
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
            Mailbox
          </Box>
          <Box width='100%'>
          </Box>
        </Box>
        <StarBorderIcon flexShrink={1}/>
      </Box>
      <Box className={classes.bottombar}>
        <Box className={classes.avatar}>
          <Avatar>{email? email.from.name[0] : 'A'}</Avatar>
        </Box>
        <Box className={classes.from}>
          <Box>
            {email? email.from.name : 'Error'}
          </Box>
          <Box>
            {email? email.from.email : 'Error'}
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
