import {Box, Button, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

/**
 * @param {function} setSearch
 * @param {boolean} mobile
 * @return {JSX}
 */
function searchViewer(setSearch, mobile) {
  const classes = useStyles();

  const setClose = (chevron) => {
    if (mobile) {
      return (
        <Button onClick={() => setSearch(false)}>
          {chevron? <ArrowBackIosIcon/> : <HighlightOffIcon/>}
        </Button>
      );
    }
  };

  return (
    <Box>
      <Box className={classes.root}>
        {setClose(true)}
        <OutlinedInput
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          }
        />
        {setClose(false)}
      </Box>
      <Typography>
        Search
      </Typography>
    </Box>
  );
}

export default searchViewer;
