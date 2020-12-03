
import React from 'react';
import {Box, Button} from '@material-ui/core';

/**
 * The viewer for an email
 * @param {obj} email The email to display
 * @param {function} setEmail The set state function for email
 * @param {bool} mobile bool representing whether mobile view
 * @return {JSX}
 */
function mailViewer(email, setEmail, mobile) {
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
      {setClose()}
      {email? email.content : 'Error'}
    </Box>
  );
}

export default mailViewer;
