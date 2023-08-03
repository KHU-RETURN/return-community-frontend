import axios from 'axios';

  const authorizationCode = process.env.REACT_APP_AUTHORIZATIONCODE;

export const getDiaryList = (page, sort) => {
  /**
   * To do: GET /diary/list api가 변경되면 getDiaryList url cursor 부분 변경 요망
   */
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://khu-return.site/diary?page=${page}&sort=${sort}`,
    headers: { 
      'Authorization': `${authorizationCode}`,     }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}

export const uploadPost = (data) => {
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://khu-return.site/diary',
  headers: { 
    'Content-Type': 'multipart/form-data',
    'Authorization': `${authorizationCode}`
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
}
