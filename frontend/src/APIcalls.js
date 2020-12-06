
/**
 * @param {string} id
 * @param {boolean} read
 */
export const setRead = (id, read) => {
  const url = 'http://172.16.0.18:3010/v0/read/'+id+'?read='+read;
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
};
