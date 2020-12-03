import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  OutlinedInput: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  Hidden: {
    display: 'none',
  },
  mobile: {
    height: '3.5ch',
  },
  normal: {

  },
}));

/**
 * Default Searchbar function
 * @param {bool} open
 * @param {bool} mobile
 * @return {JSX}
 */
export default function searchBar(open, mobile) {
  const classes = useStyles();

  return (
    <FormControl
      className={clsx(classes.OutlinedInput, open && classes.Hidden)}
      variant='outlined'>
      <OutlinedInput
        id='searchbar'
        className={mobile? classes.mobile : classes.normal}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
