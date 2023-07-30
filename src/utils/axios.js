import axios from 'axios';



export const getDiaryList = (cursor, size) => {
  /**
   * To do: GET /diary/list api가 변경되면 getDiaryList url cursor 부분 변경 요망
   */
  const authorizationCode = process.env.REACT_APP_AUTHORIZATIONCODE;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://khu-return.site/diary/list?cursor=${cursor}&size=${size}`,
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
    'Content-Type': 'multipart/form-data'
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
