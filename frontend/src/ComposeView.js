
import {Box, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  fullLine: {
    display: 'flex',
  },
  Label: {
    width: '100%',
  },
  Fill: {
    flexShrink: 1,
  },
  close: {
    width: '100%',
  },
}));

/**
 * @param {obj} compose
 * @param {function} setCompose
 * @param {boolean} mobile
 * @return {JSX}
 */
function composeViewer(compose, setCompose, mobile) {
  const classes = useStyles();

  const setClose = () => {
    if (mobile) {
      return (
        <Button onClick={() => setCompose(false)}>
          <ArrowBackIosIcon/>
        </Button>
      );
    }
  };

  return (
    <Box width='100%'>
      <Box className={classes.fullLine}>
        <Box
          className={classes.close}
        >
          {setClose()}
        </Box>
        <Box className={classes.Fill} onClick={() => setCompose(false)}>
          <ArrowForwardIcon/>
        </Box>
      </Box>
      <Divider/>
      <Box>
        <Box className={classes.fullLine}>
          <Typography className={classes.Label}>
            To:
          </Typography>
          <Typography className={classes.Fill}>
            {compose.name? ' '+compose.name+' ' : ''}
            {'  '}
            {compose.email? compose.email : ''}
          </Typography>
        </Box>
        <Divider/>
        <Box className={classes.fullLine}>
          <Typography className={classes.Label}>
            Subject:
          </Typography>
          <Typography className={classes.Fill}>
          </Typography>
        </Box>
      </Box>
      <Divider/>
    </Box>
  );
}

export default composeViewer;
