import axios from 'axios';

const authorizationCode = process.env.REACT_APP_AUTHORIZATIONCODE;
const API_URL = process.env.REACT_APP_API;

export const getDiaryList = (page, sort, setDiaryList) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL + `/diary?page=${page}&sort=${sort}`,
    headers: { 
      'Authorization': `Bearer ${authorizationCode}`,
    }
  };
  axios.request(config)
  .then((response) => {
    setDiaryList(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
  
}

export const uploadPost = (postData) => {
  let data = new FormData();
  data.append(postData);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: API_URL + '/diary',
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${authorizationCode}`, 
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

export const getDiaryDetail = (postId) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${postId}`,
    headers: { 
      'Authorization': `Bearer ${authorizationCode}`,
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

export const getCommentList = (postId) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${postId}/comment`,
    headers: { 
      'Authorization': `Bearer ${authorizationCode}`,
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