import React from 'react';

/**
 * @param {function} setMail setMail state
 */
function getMail(setMail) {
  fetch('http://localhost:3010/v0/dummy')
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
      {mail}
      {getMail(setMail)}
    </div>
  );
}
