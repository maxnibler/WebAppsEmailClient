
import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';


/**
 * Returns the correct star icon
 * @param {obj} mail
 * @param {function} setEmail
 * @return {JSX}
 */
function starred(mail, setEmail) {
  const setStarred = (s) => {
    mail.starred = s;
    setEmail(mail);
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
