import React from 'react';
import Typography from '@material-ui/core/Typography';

/**
 * @param {function} setMail setMail state
 */
function getMail(setMail) {
  fetch('http://172.16.0.18:3010/v0/dummy')
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setMail(json.message);
      })
      .catch((error) => {
        setMail(error.toString());
      });
}

/**
 * @param {string} mailbox
 * @return {JSX}
 */
export default function canvas(mailbox) {
  const [mail, setMail] = React.useState(undefined);
  return (
    <div>
      <Typography>
        mailbox: {mailbox}
      </Typography>
      {mail}
      {getMail(setMail)}
    </div>
  );
}
