
import React from 'react';
import {Box} from '@material-ui/core';

/**
 * The temporary viewer for an email
 * @param {obj} email The email to display
 * @param {function} setEmail The set state function for email
 * @return {JSX}
 */
function mailViewer(email, setEmail) {
  return (
    <Box button onClick={() => setEmail(false)}>
      {email? email.content : 'Error'}
    </Box>
  );
}

export default mailViewer;
