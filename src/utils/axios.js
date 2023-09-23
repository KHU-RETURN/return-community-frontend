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
    console.log(response.data)
    setDiaryList(response.data)
  })
  .catch((error) => {
    console.log(error);
  });
  
}

export const uploadPost = (postData) => {
  let data = new FormData();
  data.append('data', JSON.stringify(postData));
  data.append('mediaList', null);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: API_URL + '/diary',
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${authorizationCode}`, 
    },
    data :data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

export const deletePost = (postId) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${postId}`,
    headers: { 
      'Authorization': `Bearer ${authorizationCode}`,
    }
  };
  axios.request(config)
  .then(() => {
    alert("게시글이 삭제되었습니다.")
    window.location.href="/diary"
  })
  .catch((error) => {
    console.log(error);
  });
}

export const getDiaryDetail = (diaryId, navigate) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${diaryId}`,
    headers: { 
      'Authorization': `Bearer ${authorizationCode}`,
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    const diary = response.data
    navigate(`/diary/${diary.diaryId}`, { state : diary })
  })
  .catch((error) => {
    console.log(error);
  });
  
}

export const getCommentList = (postId, setCommentList) => {
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
    setCommentList(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}

export const postComment = (postId, data) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${postId}/comment`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${authorizationCode}`,
    },
    data : JSON.stringify(data)
  };
  axios.request(config)
  .then(() => {
    alert("댓글이 등록되었습니다.")
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

export const editComment = (postId, commentId, data) => {
  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${postId}/comment/${commentId}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${authorizationCode}`,
    },
    data : JSON.stringify({data})
  };
  axios.request(config)
  .then(() => {
    alert("댓글이 수정되었습니다.")
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

export const deleteComment = (postId, commentId) => {
  let config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${postId}/comment/${commentId}`,
    headers: { 
      'Authorization': `Bearer ${authorizationCode}`,
    }
  };
  axios.request(config)
  .then(() => {
    alert("댓글이 삭제되었습니다.")
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

export const postRecomment = (postId, commentId, content) => {
  let data = JSON.stringify({
  "content": `${content}`
  });

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: API_URL + `/diary/${postId}/comment/${commentId}/recomment`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${authorizationCode}`,
  },
  data : data
};

axios.request(config)
.then((response) => {
  alert("댓글이 작성되었습니다.")
  window.location.reload();
})
.catch((error) => {
  console.log(error);
});
}

export const editRecomment = (postId, commentId, recommentId, content) => {
  let data = JSON.stringify({
    "content": `${content}`
    });
  let config = {
    method: 'patch',
    maxBodyLength: Infinity,
    url: API_URL + `/diary/${postId}/comment/${commentId}/recomment/${recommentId}`,
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${authorizationCode}`,
    },
    data : data,
  };
  axios.request(config)
  .then(() => {
    alert("댓글이 수정되었습니다.")
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

export const bookmarkPost = async (postId) => {
  let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: API_URL + `/diary/${postId}/bookmark`,
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${authorizationCode}`,
  },
};

axios.request(config)
.then((response) => {
  window.location.reload();
})
.catch((error) => {
  console.log(error);
});
}