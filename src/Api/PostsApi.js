import apiClient from "./apiClient";

export const getPosts = (param) => {
  return apiClient.get(`/posts`, {params: param});
};

export const createPost = (data) => {
  return apiClient.post("/posts", data);
};

export const deletePost = (postID) => {
  return apiClient.delete(`/posts/${postID}`);
};

export const getTags= () =>{
    return apiClient.get("/tags");
}
export const createTag =(tagData) =>{
    return apiClient.post("/tags",{
        name:tagData
    })
}

export const deleteTag =(tagsIds) =>{
  return apiClient.post("/tags/bulk-delete",{
      ids:tagsIds 
  })
}

export const getPostComments= (postID) =>{
  return apiClient.get(`/posts/${postID}/comments`);
}
export const likePost = (postId) => {
  return apiClient.post(`/posts/${postId}/like`);
};

export const unLikePost = (postId) => {
  return apiClient.delete(`/posts/${postId}/unlike`);
};

export const likeComment = (commentID) => {
  return apiClient.post(`/comments/${commentID}/like`);
};

export const unLikeComment = (commentID) => {
  return apiClient.delete(`/comments/${commentID}/unlike`);
};

export const createComment=(postID,commentText)=>{
  return apiClient.post(`/posts/${postID}/comments`,{
    text:commentText
  })
}

export const deleteComment = (postID,commentID) => {
  return apiClient.delete(`/posts/${postID}/comments/${commentID}`);
};
export const shareSpesificPost=(postID)=>{
  return apiClient.post(`/posts/${postID}/share`)
}

export const getCommentReplies= (commentID) =>{
  return apiClient.get(`/comments/${commentID}/replies`);
}
export const createReply=(commentID,replyText)=>{
  return apiClient.post(`/comments/${commentID}/replies`,{
    text:replyText
  })
}

export const getTopPublishers=()=>{
  return apiClient.get("/posts/top-publishers")
}
export const getLatestPosts=()=>{
  return apiClient.get("/posts/latest")
}
export const getUnsolicitedPosts=()=>{
  return apiClient.get("/posts/unsolicited")
}
