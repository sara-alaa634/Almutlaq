import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../helpers/Toast";
import { useTranslation } from "react-i18next";
import { successMessages } from "../helpers/messages";
import { usePermissions } from "../Context/PermissionsContext";
import { useHasPermission } from "../Hooks/usePermissions";
import {
  getPosts,
  createPost,
  deletePost,
  shareSpesificPost,
  getTags,
  createTag,
  deleteTag,
  getPostComments,
  likePost,
  unLikePost,
  likeComment,
  unLikeComment,
  createComment,
  deleteComment,
  getCommentReplies,
  createReply,
  getUnsolicitedPosts,
  getLatestPosts,
  getTopPublishers,
} from "../Api/PostsApi";
export const usePosts = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { handleLogin, handleLogout } = usePermissions();
  const { handlePermsssionError } = useHasPermission();

  const fetchPosts = async (Params) => {
    // console.log("Params.filterValue: ", Params.filterValue);
    // setLoading(true);
    try {
      const filterData = Object.fromEntries(
        Object.entries(Params).filter(([key, value]) => value !== null)
      );
      // console.log("new filter value params:", filterData);
      const response = await getPosts(filterData);

      // setLoading(false);
      // // console.log("posts data: ",response.data)
      return response.data;
    } catch (err) {
      // setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const addPost = async (
    PostText,
    tags,
    mediaType,
    mediaPath,
    videoThumbnail
  ) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (PostText !== null) {
        formData.append("text", PostText);
      }
      if (tags !== null) {
        tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      formData.append("media_type", mediaType ? "video" : "image");

      if (mediaPath !== null) {
        formData.append("media_path", mediaPath);
      }
      if (videoThumbnail !== null) {
        formData.append("video_thumbnail", videoThumbnail);
      }
      await createPost(formData);
      setLoading(false);
      Toast("success", t(successMessages.createPost));
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const removePost = async (postID) => {
    try {
      await deletePost(postID);
      Toast("success", t(successMessages.deletePost));
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchTags = async () => {
    setLoading(true);
    try {
      const tags = await getTags();
      setLoading(false);
      return tags.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const addTag = async (tagName) => {
    try {
      setLoading(true);
      const response = await createTag(tagName);
      setLoading(false);
      Toast("success", t(successMessages.createTag));
      return response;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
      // console.log("useCase create error: ", err);
    }
  };

  const removeTags = async (ids) => {
    try {
      setLoading(true);
      await deleteTag(ids);
      setLoading(false);
      Toast("success", t(successMessages.deleteTag));
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
      // console.log("useCase create error: ", err);
    }
  };

  const fetchPostComments = async (postID) => {
    setLoading(true);
    try {
      const postComments = await getPostComments(postID);
      setLoading(false);
      // console.log("get spesific post comments: ", postComments);
      return postComments.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const CreatePostLike = async (postID) => {
    try {
      const likeResponse = await likePost(postID);
      // console.log("likeResponse: ", likeResponse);
      return likeResponse;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };
  const CreatePostUnLike = async (postID) => {
    try {
      const unlikeResponse = await unLikePost(postID);
      // console.log("unlikeResponse: ", unlikeResponse);
      return unlikeResponse;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };
  const addComment = async (postID, commentText) => {
    try {
      const repsonse = await createComment(postID, commentText);
      Toast("success", t(successMessages.createComment));
      return repsonse;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };
  const removeComment = async (postID, commentID) => {
    try {
      const repsonse = await deleteComment(postID, commentID);
      Toast("success", t(successMessages.deleteComment));
      return repsonse;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };
  const sharePost = async (postID) => {
    try {
      await shareSpesificPost(postID);
      Toast("success", t(successMessages.sharePost));
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const CreateCommentLike = async (commentID) => {
    try {
      const likeResponse = await likeComment(commentID);
      // console.log("likeResponse: ", likeResponse);
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };
  const CreateCommentUnLike = async (commentID) => {
    try {
      const likeResponse = await unLikeComment(commentID);
      // console.log("unlikeResponse: ", likeResponse);
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const fetchCommentReplies = async (commentID) => {
    setLoading(true);
    try {
      const commentReplies = await getCommentReplies(commentID);
      setLoading(false);
      // console.log("get spesific comment replies: ", commentReplies);
      return commentReplies.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const addReply = async (commentID, replyText) => {
    try {
      const repsonse = await createReply(commentID, replyText);
      Toast("success", t(successMessages.createCommentReply));
      return repsonse;
    } catch (err) {
      handlePermsssionError(err, setError, t);
    }
  };

  const FetchUnsolicitedPosts = async () => {
    setLoading(true);
    try {
      const posts = await getUnsolicitedPosts();
      setLoading(false);
      // console.log("get unsolicated posts: ", posts);
      return posts.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  const FetchLatestPosts = async () => {
    setLoading(true);
    try {
      const posts = await getLatestPosts();
      setLoading(false);
      // console.log("get latest posts: ", posts);
      return posts.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };
  const FetchTopPublishers = async () => {
    setLoading(true);
    try {
      const posts = await getTopPublishers();
      setLoading(false);
      // console.log("get top publisher: ", posts);
      return posts.data;
    } catch (err) {
      setLoading(false);
      handlePermsssionError(err, setError, t);
    }
  };

  return {
    fetchPosts,
    addPost,
    removePost,
    sharePost,
    fetchTags,
    addTag,
    removeTags,
    fetchPostComments,
    CreatePostLike,
    CreatePostUnLike,
    CreateCommentUnLike,
    CreateCommentLike,
    addComment,
    removeComment,
    fetchCommentReplies,
    addReply,
    FetchTopPublishers,
    FetchLatestPosts,
    FetchUnsolicitedPosts,
    loading,
    error,
  };
};
