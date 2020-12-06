
import {Box, Button, Typography} from '@material-ui/core';
import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

/**
 * @param {function} setCompose
 * @param {boolean} mobile
 * @return {JSX}
 */
function composeViewer(setCompose, mobile) {
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
    <Box>
      {setClose()}
      <Typography>
        Compose
      </Typography>
    </Box>
  );
}

export default composeViewer;
