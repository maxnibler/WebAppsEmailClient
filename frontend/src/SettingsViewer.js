
import {Box, Button, Typography, Avatar} from '@material-ui/core';
import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

/**
 * @param {function} setSettings
 * @param {boolean} mobile
 * @return {JSX}
 */
function settingsViewer(setSettings, mobile) {
  const setClose = () => {
    if (mobile) {
      return (
        <Button onClick={() => setSettings(false)}>
          <ArrowBackIosIcon/>
        </Button>
      );
    }
  };

  return (
    <Box>
      {setClose()}
      <Avatar>A</Avatar>
      <Typography>
        settings
      </Typography>
    </Box>
  );
}

export default settingsViewer;
