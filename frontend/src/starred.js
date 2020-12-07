
import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';


/**
 * @param {string} id
 * @param {boolean} starred
 */
function putStarred(id, starred) {
  const url = 'http://172.16.0.18:3010/v0/starred/'+id+'?star='+starred;
  const body = {
    method: 'PUT',
  };
  // console.log(url);
  fetch(url, body)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
      })
      .catch((error) => {
        console.log(error.toString());
      });
}

/**
 * Returns the correct star icon
 * @param {obj} mail
 * @param {function} setEmail
 * @param {function} forceRefresh
 * @return {JSX}
 */
function starred(mail, setEmail, forceRefresh) {
  const setStarred = (s) => {
    const newMail = mail;
    putStarred(mail.id, s);
    newMail.starred = s;
    setEmail(newMail);
    forceRefresh(true);
  };

  if (mail.starred) {
    return (
      <StarIcon
        flexShrink={1}
        onClick={() => setStarred(false)}
      />
    );
  } else {
    return (
      <StarBorderIcon
        flexShrink={1}
        onClick={() => setStarred(true)}
      />
    );
  }
}

export default starred;
