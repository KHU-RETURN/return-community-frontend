import axios from 'axios';

export const getDiaryList = (cursor, size) => {
  const authorizationCode = process.env.REACT_APP_AUTHORIZATIONCODE;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://khu-return.site/diary/list?cursor=${cursor}&size=${size}`,
    headers: { 
      'Authorization': `${authorizationCode}`, 
      'Cookie': `authorization=${authorizationCode}`
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}

