import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DotsDropdown from "../SharedComponents/Buttons/DotsDropdown";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { HiShare } from "react-icons/hi2";
import { formatPostDate } from "../../helpers/formatDate";
import { usePosts } from "../../Hooks/usePosts";
import { PulseLoader } from "react-spinners";
import { useUser } from "../../Context/userContext";
import { Form } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import "../../Assets/Css/postsManangemnt.css";
import { useHasPermission } from "../../Hooks/usePermissions";
import { permissionsNames } from "../../helpers/constants";

const PostsCard = ({ data, setData }) => {
  const { userData } = useUser();
  const [postData, setPostData] = useState(data);
  const [isCreateComment, setIsCreateComment] = useState(false);
  const [isCreateReply, setIsCreateReply] = useState(false);
  const [isLiked, setIsLiked] = useState(data.auth_user_liked);
  const [newCommentText, setNewCommentText] = useState("");
  const [newReplyText, setNewReplyText] = useState("");
  const [firstCommentLike, setFirstCommentLike] = useState(
    data.first_comment?.auth_user_liked || false
  );
  const [firstCommentLikesCount, setFirstCommentLikesCount] = useState(() => {
    if (data?.first_comment) {
      return data.first_comment.auth_user_liked
        ? data.first_comment.likes_count - 1
        : data.first_comment.likes_count;
    }
    return 0;
  });
  const [showAllComments, setShowAllComments] = useState(false); // State to manage comment visibility
  const [showAllCommentReplies, setShowAllCommentReplies] = useState(false); // State to manage comment replies visibility
  const [fullText, setFullText] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [loadingAllReplies, setLoadingAllReplies] = useState([]); // this state to handle replies in case all comments are vsible
  const [postComments, setPostComments] = useState([]);
  const [commentReplies, setCommentReplies] = useState([]);
  const [showPostVideo, setShowPostVideo] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const currentLanguage = i18n.language;
  const {
    fetchPostComments,
    removePost,
    CreatePostLike,
    CreatePostUnLike,
    CreateCommentLike,
    CreateCommentUnLike,
    addComment,
    removeComment,
    sharePost,
    fetchCommentReplies,
    addReply,
  } = usePosts();
  // State to manage individual comment interactions
  const [commentStates, setCommentStates] = useState([]);
  const { hasPermission } = useHasPermission();
  const hasDeletePermission = hasPermission(permissionsNames.posts.delete);

  useEffect(() => {
    if (postComments.length > 0) {
      setCommentStates(
        postComments.map((comment) => ({
          id: comment.id,
          showReplies: false,
          isCreatingReply: false,
          replyText: "", // Ensure this is initialized with an empty string
          shouldViewReplies: comment.shouldViewReplies || false,
          repliesData: [],
          loadingReplies: false,
        }))
      );
      setLoadingAllReplies(
        postComments.map((comment) => ({
          id: comment.id,
          loadingState: false,
        }))
      );
    }
  }, [postComments]);

  const handlePostDelete = async (actionType, postID) => {
    await removePost(postID);
    setData((prevPosts) => prevPosts.filter((post) => post.id !== postID));
  };

  const handleCommnetDelete = async (actionType, commentID) => {
    let comment = {};

    const comments = await fetchPostComments(postData.id);
    setPostComments(comments);
    comment = comments.find((comment) => comment.id === commentID);
    await removeComment(postData.id, commentID);
    if (postComments) {
      setPostComments((prev) =>
        prev.filter((comment) => comment.id !== commentID)
      );
    }
    let newCount = postData.comments_count - 1;
    newCount = newCount - comment.replies_count;
    let firstComment = null;
    if (newCount > 0 && postData.first_comment.id === commentID) {
      if (postComments.length > 1) {
        firstComment = postComments[1];
      } else {
        const comments = await fetchPostComments(postData.id);
        firstComment = comments[0];
      }
    } else if (newCount === 0 && postData.first_comment.id === commentID) {
      firstComment = null;
    } else {
      firstComment = postData.first_comment;
    }
    setPostData((prev) => ({
      ...prev,
      comments_count: newCount,
      first_comment: firstComment,
    }));
  };

  const handlePostShare = async () => {
    await sharePost(postData.id);
    const newShareCounts = postData.shares_count + 1;
    setPostData((prev) => ({
      ...prev,
      shares_count: newShareCounts,
    }));
  };
  const handlePostLikeClick = async (postID) => {
    const oldIsLike = isLiked;
    setIsLiked((prev) => !prev);
    if (!oldIsLike) {
      if (postData.first_five_likers.length < 5) {
        // Add the user account to the array
        postData.first_five_likers.push(userData);
      }
      await CreatePostLike(postID);
    } else {
      const updatedLikes = postData.first_five_likers.filter(
        (account) => account.id !== userData.id
      );
      const updatedPostData = { ...postData, first_five_likers: updatedLikes };
      setPostData(updatedPostData);
      await CreatePostUnLike(postID);
    }
  };
  const handleFirstCommentLikeClick = async (commentID) => {
    const oldFirstComment = firstCommentLike;
    setFirstCommentLike(!firstCommentLike);
    if (!oldFirstComment) {
      await CreateCommentLike(commentID);
    } else {
      await CreateCommentUnLike(commentID);
    }
  };

  const toggleComments = async (postID) => {
    const oldToggleState = showAllComments;
    setShowAllComments((prev) => !prev); // Toggle the visibility state
    if (!oldToggleState) {
      setLoadingComments(true);
      const commentsData = await fetchPostComments(postID);
      setPostComments(commentsData);
      setLoadingComments(false);
    }
  };
  const toggleReplies = async (commentID) => {
    const oldToggleState = showAllCommentReplies;
    setShowAllCommentReplies((prev) => !prev); // Toggle the visibility state
    if (!oldToggleState) {
      setLoadingReplies(true);
      const repliesData = await fetchCommentReplies(commentID);
      setCommentReplies(repliesData);
      setLoadingReplies(false);
    }
  };
  const handleFullText = () => {
    setFullText(!fullText);
  };
  const handleCreateComment = async () => {
    const text = newCommentText;
    setNewCommentText("");
    const response = await addComment(postData.id, text);

    const newCommentsCount = postData.comments_count + 1;
    setPostData((prev) => ({
      ...prev,
      comments_count: newCommentsCount,
      first_comment: prev.first_comment
        ? prev.first_comment
        : {
            id: response.data.id,
            text: response.data.text,
            user_id: response.data.user_id,
            auth_user_liked: false,
            first_reply: null,
            user: userData,
          },
    }));
  };
  const handleCreateCommentReply = async (commentID) => {
    const replyText = newReplyText;
    setNewReplyText("");
    await addReply(commentID, replyText);
    setCommentReplies(
      commentReplies.map((comment) =>
        comment.id === commentID
          ? {
              ...comment,
              shouldViewReplies: true,
            }
          : comment
      )
    );
    setPostData((prev) => ({
      ...prev,
      comments_count: prev.comments_count + 1,
      first_comment: {
        ...prev.first_comment,
        shouldViewReplies: true,
      },
    }));
  };
  const handleCreateReplyApperacne = () => {
    setIsCreateReply(!isCreateReply);
  };

  const handleCreateCommentApperacne = () => {
    setIsCreateComment(!isCreateComment);
  };

  const handleViewVideo = () => {
    setShowPostVideo(!showPostVideo);
  };

  // those functions to handle the case of the all comments displayed on the page

  const handleCommentLikeClick = async (commentLike) => {
    let newLikesCount = 0;
    if (commentLike.auth_user_liked) {
      newLikesCount = commentLike.comment_likes_count - 1;
      setPostComments(
        postComments.map((comment) =>
          comment.id === commentLike.id
            ? {
                ...comment,
                comment_likes_count: newLikesCount,
                auth_user_liked: false,
              }
            : comment
        )
      );
      await CreateCommentUnLike(commentLike.id);
    } else {
      newLikesCount = commentLike.comment_likes_count + 1;
      setPostComments(
        postComments.map((comment) =>
          comment.id === commentLike.id
            ? {
                ...comment,
                comment_likes_count: newLikesCount,
                auth_user_liked: true,
              }
            : comment
        )
      );
      await CreateCommentLike(commentLike.id);
    }
  };

  // Toggle replies for a specific comment
  const toggleSpesificCommentReplies = async (commentId, commentState) => {
    if (!commentState) return;
    const oldShowReplies = commentState.showReplies;
    setCommentStates((prevStates) =>
      prevStates.map((state) =>
        state.id === commentId
          ? { ...state, showReplies: !state.showReplies }
          : state
      )
    );

    if (!oldShowReplies) {
      setLoadingAllReplies((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, loadingState: true }
            : comment
        )
      );
      const repliesData = await fetchCommentReplies(commentId);
      setCommentStates((prevStates) =>
        prevStates.map((state) =>
          state.id === commentId
            ? { ...state, repliesData: repliesData }
            : state
        )
      );
      setLoadingAllReplies((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, loadingState: false }
            : comment
        )
      );
    }
  };

  // Show/hide reply input for a specific comment
  const toggleReplyInput = (commentId) => {
    setCommentStates((prevStates) =>
      prevStates.map((state) =>
        state.id === commentId
          ? { ...state, isCreatingReply: !state.isCreatingReply }
          : state
      )
    );
  };

  const toggleViewReplies = (commentID) => {
    setCommentStates((prevStates) =>
      prevStates.map((state) =>
        state.id === commentID ? { ...state, shouldViewReplies: true } : state
      )
    );
  };

  // Update reply text for a specific comment
  const updateReplyText = (commentId, text) => {
    setCommentStates((prevStates) =>
      prevStates.map((state) =>
        state.id === commentId ? { ...state, replyText: text } : state
      )
    );
  };

  // Handle creating a comment reply
  const handleCreateReplyForSpesificComment = async (commentId) => {
    const commentState = commentStates.find((state) => state.id === commentId);
    if (commentState && commentState.replyText.trim()) {
      await addReply(commentId, commentState.replyText);
      updateReplyText(commentId, "");
      toggleReplyInput(commentId);
      toggleViewReplies(commentId);
      setPostData((prev) => ({
        ...prev,
        comments_count: prev.comments_count + 1,
      }));
    }
  };

  return (
    <div className="post-card-wrapper bg-white">
      {postData && (
        <div className="post-card-content">
          {/* card header */}
          <div className="card-header bg-white">
            <div
              key={postData.id}
              className="my-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
            >
              <div className="publisher-info d-flex align-items-center justify-content-start gap-2">
                <img
                  className="publisher-image ms-2"
                  src={
                    postData.creator && postData.creator.image
                      ? postData.creator.image
                      : process.env.PUBLIC_URL +
                        "/Assets/Images/human-placeholder-square.jpg"
                  }
                  alt=""
                />
                <div className="d-flex flex-column align-items-end justify-content-start">
                  <div
                    className={`post-publisher-name h5  w-100 ${
                      isRTL ? "text-end" : "text-start"
                    }  text-capitalize`}
                    dir="rtl"
                  >
                    {postData.creator?.name?.length > 25
                      ? `${postData.creator.name.slice(0, 25)}...`
                      : postData.creator?.name || ""}
                  </div>

                  <div
                    href="#"
                    className={`piblisher-action fw-medium ${
                      isRTL ? "text-start" : "text-end"
                    } text-capitalize`}
                  >
                    {formatPostDate(postData.created_at, currentLanguage)}
                  </div>
                </div>
              </div>
              <div className="publisher-card-action">
                {hasDeletePermission ? (
                  <DotsDropdown
                    customClass="btn-h48-s15 btn-lg px-0 cursor-pointer"
                    buttonType="subMain"
                    deleteOption={true}
                    updateOption={false}
                    deletePermission={hasDeletePermission}
                    actionID={postData.id}
                    onSelect={handlePostDelete}
                  />
                ) : null}
              </div>
            </div>

            {fullText ? (
              <p
                className={`post-card-description text-capitalize fw-medium ${
                  isRTL ? "text-end" : "text-start"
                }`}
                dir="rtl"
              >
                {postData?.text || " "}
                {postData.text?.length > 100 ? (
                  <a
                    className="fw-bold sc-1-clr cursor-pointer me-2"
                    onClick={handleFullText}
                  >
                    {t("see_less")}
                  </a>
                ) : null}
              </p>
            ) : (
              <p
                className={`post-card-description text-capitalize fw-medium `}
                dir={isRTL ? "rtl" : "ltr"}
              >
                {" "}
                {postData.text?.length > 100
                  ? `${postData.text.slice(0, 100)}...`
                  : postData?.text}
                {postData.text?.length > 100 ? (
                  <a
                    className="fw-bold sc-1-clr cursor-pointer"
                    onClick={handleFullText}
                  >
                    {t("see_more")}
                  </a>
                ) : null}
              </p>
            )}
          </div>
          <div className="colored-bottom-border"></div>
          {/* card body */}
          <div className="card-body p-0">
            {postData.media_path !== null ? (
              postData.media_type === "image" ? (
                <img
                  className="post-img w-100"
                  src={postData.media_path}
                  alt=""
                />
              ) : postData.media_type === "video" ? (
                <div className="w-100 position-relative">
                  {!showPostVideo ? (
                    <img
                      className="post-img w-100"
                      src={postData.video_thumbnail}
                      alt=""
                    />
                  ) : null}
                  {/* Pause Video Icon */}
                  {postData.media_path && !showPostVideo ? (
                    <button
                      className="post-pause-video border-0 bg-transparent"
                      onClick={handleViewVideo}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/Assets/Images/icons/video-pause-icon.png"
                        }
                        alt=""
                      />
                    </button>
                  ) : null}

                  {showPostVideo ? (
                    <video className="post-img w-100" controls>
                      <source src={postData.media_path} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </div>
              ) : (
                <img
                  className="post-img w-100"
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/Images/default-post-img.png"
                  }
                  alt=""
                />
              )
            ) : null}
            {/* ===Post Interactions=== */}
            <ul className="post-interactions-wrapper d-flex align-items-center justify-content-between flex-wrap m-0 px-4 py-3">
              <li className="post-action  px-md-3  px-2 fw-medium">
                <span
                  className={`l-d-clr d-inline-block ${
                    isRTL ? "ms-2" : "me-2"
                  }`}
                >
                  {t("share")}{" "}
                </span>
                <span className="l-d-clr">{postData.shares_count}</span>{" "}
              </li>
              <li className="post-action  px-md-3  px-2 fw-medium">
                <span
                  className={`l-d-clr d-inline-block ${
                    isRTL ? "ms-2" : "me-2"
                  }`}
                >
                  {t("comment")}{" "}
                </span>
                <span className="l-d-clr">{postData.comments_count} </span>{" "}
              </li>
              <li className="post-action  px-md-3  px-2 fw-medium">
                {postData.first_five_likers ? (
                  <div className="likes-images-wrapper">
                    {postData.first_five_likers.map((postLike, index) => (
                      <img
                        key={index}
                        className="postLikesImgs"
                        src={
                          postLike.image
                            ? postLike.image
                            : process.env.PUBLIC_URL +
                              "/Assets/Images/human-placeholder-square.jpg"
                        }
                        alt=""
                      />
                    ))}
                  </div>
                ) : null}
              </li>
            </ul>
            {/* ===Social Actions=== */}
            <ul className=" d-flex align-items-center justify-content-between flex-wrap m-0 px-3 py-4" dir={isRTL?"rtl":"ltr"}>
            <li className="post-action">
                <button
                  className="border-0 bg-transparent px-md-3  px-2 fw-medium"
                  onClick={() => {
                    handlePostLikeClick(postData.id);
                  }}
                >
                  {" "}
                  {isLiked ? (
                    <FaHeart
                      className={`${isRTL ? "ms-2" : "me-2"} likes-color`}
                    />
                  ) : (
                    <FaRegHeart
                      className={`${isRTL ? "ms-2" : "me-2"} likes-color`}
                    />
                  )}
                  {t("like")}
                </button>{" "}
              </li>
            <li className="post-action">
                <button
                  className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                  onClick={handleCreateCommentApperacne}
                >
                  <img
                    className={isRTL ? "ms-2" : "me-2"}
                    src={
                      process.env.PUBLIC_URL +
                      "/Assets/Images/icons/comments.png"
                    }
                    alt=""
                  />
                  {t("comments")}
                </button>
              </li>
              <li className="post-action">
                <button
                  className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                  onClick={handlePostShare}
                >
                  <HiShare className={`fs-5 ${isRTL ? "ms-2" : "me-2"}`} />
                  {t("share")}
                </button>
              </li>
             
            
            </ul>
            <div>
              {postData.first_comment && (
                <div className="colored-bottom-border mb-2"></div>
              )}
              {/* ===Comments Component=== */}
              {/* Show the button to toggle comments */}
              {postData.comments_count > 1 ||
              (postData.comments_count === 1 &&
                postData.first_comment === null) ? (
                <div
                  className={`d-flex justify-content-start `}
                >
                  <button
                    className="btn fw-medium text-capitalize mc-1-clr"
                    onClick={() => {
                      toggleComments(postData.id);
                    }}
                  >
                    {showAllComments
                      ? t("view_Less_comments")
                      : t("view_more_comments")}
                    {loadingComments ? (
                      <PulseLoader
                        color="var(--mc-1)"
                        loading={loadingComments}
                        size={7}
                        speedMultiplier={0.5}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : null}
                  </button>
                </div>
              ) : null}
            </div>
            {/* ===First Comment View Component=== */}
            {postData?.first_comment && !showAllComments ? (
              <div key={postData.first_comment.id}>
                <div className="comments-wrapper px-3">
                  <div>
                    <div
                      className="mt-4 mb-1 d-flex align-items-center justify-content-between gap-3"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <div className="publisher-info d-flex align-items-start justify-content-start gap-2">
                      <img
                          className="publisher-image ms-2"
                          src={
                            postData.first_comment.user.image
                              ? postData.first_comment.user.image
                              : process.env.PUBLIC_URL +
                                "/Assets/Images/human-placeholder-square.jpg"
                          }
                          alt=""
                        />
                        <div className="d-flex flex-column align-items-end justify-content-end">
                          <div
                            className={`post-publisher-name h5 ${
                              isRTL ? "text-end" : "text-start"
                            } text-capitalize w-100`}
                            dir="rtl"
                          >
                            {postData.first_comment.user.name}
                          </div>
                          <p className="fw-medium text-end text-capitalize">
                            {postData.first_comment.text}
                          </p>
                          <ul
                            className={`border-0 social-actions-wrapper d-flex align-items-center justify-content-start w-100 gap-3 flex-wrap m-0 mb-2`}
                            dir={isRTL ? "rtl" : "ltr"}
                          >
                            <li className="post-action">
                              <button
                                className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                                onClick={() =>
                                  handleFirstCommentLikeClick(
                                    postData.first_comment.id
                                  )
                                }
                                dir={isRTL?"rtl":"ltr"}
                              >
                              
                               <span>
                               {firstCommentLike ? (
                                  <FaHeart
                                    className={`${
                                      isRTL ? "ms-2" : "me-2"
                                    } likes-color`}
                                  />
                                ) : (
                                  <FaRegHeart
                                    className={`${
                                      isRTL ? "ms-2" : "me-2"
                                    }  likes-color`}
                                  />
                                )}
                               </span>
                               <span>
                               {firstCommentLikesCount +
                                  (firstCommentLike ? 1 : 0)}{" "}
                               </span>
                                {/* Update the like count based on the current state */}
                              </button>
                            </li>
                            <li className="post-action">
                              <button
                                className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                                onClick={handleCreateReplyApperacne}
                                dir={isRTL?"rtl":"ltr"}
                              >
                                <span> {t("reply")}</span>
                                <img
                                  className={isRTL ? "me-2" : "ms-2"}
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/Assets/Images/icons/comments.png"
                                  }
                                  alt=""
                                />
                               
                               
                              </button>
                            </li>
                          </ul>
                        </div>
                       
                      </div>
                      <div className="publisher-card-action">
                        <DotsDropdown
                          customClass="btn-h48-s15 btn-lg px-0 cursor-pointer"
                          buttonType="subMain"
                          deleteOption={true}
                          updateOption={false}
                          deletePermission={true}
                          actionID={postData.first_comment.id}
                          onSelect={handleCommnetDelete}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===Show Post First Comment Replies=== */}
                <div className="reply-main-wrapper mb-3">
                  {postData.first_comment.shouldViewReplies ? (
                    <div
                      className={`d-flex justify-content-start `}
                    >
                      <button
                        className="btn fw-medium text-capitalize mc-1-clr"
                        onClick={() => {
                          toggleReplies(postData.first_comment.id);
                        }}
                      >
                        {showAllCommentReplies
                          ? t("hide_replies")
                          : t("view_replies")}
                        {loadingReplies ? (
                          <PulseLoader
                            color="var(--mc-1)"
                            loading={loadingReplies}
                            size={7}
                            speedMultiplier={0.5} // Decrease this value to slow down the loader
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : null}
                      </button>
                    </div>
                  ) : null}
                  {commentReplies.length !== 0 && showAllCommentReplies
                    ? commentReplies.map((reply) => (
                        <div className="reply-wrapper px-3" key={reply.id}>
                          <div>
                            <div className="mt-3 mb-1 d-flex align-items-center  gap-3">
                              <div className="publisher-info d-flex align-items-start justify-content-start gap-2">
                                <img
                                  className="reply-image ms-2"
                                  src={
                                    reply.user.image
                                      ? reply.user.image
                                      : process.env.PUBLIC_URL +
                                        "/Assets/Images/human-placeholder-square.jpg"
                                  }
                                  alt=""
                                />
                                <div className="d-flex flex-column align-items-end justify-content-end">
                                  <div
                                    className={`post-publisher-name fs-6 w-100 ${isRTL?"text-end":"text-start"} text-capitalize reply-name`}
                                    dir="rtl"
                                  >
                                    {reply.user.name}
                                  </div>
                                  <p className={`fw-semibold w-100 ${isRTL?"text-end":"text-start"} text-start text-capitalize mb-0 reply-text`}>
                                    {reply.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}

                  {/* create comment reply component */}
                  <div
                    className={`create-comment px-3  ${
                      isCreateReply ? "visible" : ""
                    }`}
                  >
                    <div
                      className={`d-flex align-items-center rounded colored-border-sc`} dir={isRTL?"rtl":"ltr"}
                    >
                       <Form.Group
                        className="text-capitalize create-btn-clr fw-medium flex-grow-1"
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          required
                          type="text"
                          placeholder={t("Write a reply to the comment")}
                          value={newReplyText}
                          className="btn-h48-s15 border-0 text-color2 fw-semibold"
                          dir={isRTL?"rtl":"ltr"}
                          onChange={(e) => setNewReplyText(e.target.value)}
                        />
                      </Form.Group>
                      <button
                        className="btn bg-transparent sc-1-clr border-0 fw-semibold text-capitalize btn-h48-s15 btn-lg"
                        disabled={newReplyText.length === 0}
                        onClick={() => {
                          handleCreateCommentReply(postData.first_comment.id);
                        }}
                      >
                        {newReplyText.length > 0 ? (
                          <IoIosSend className="fs-4" />
                        ) : (
                          <FiSend className="fs-4" />
                        )}
                      </button>
                    
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* ===If User Click to Get All Comments Component=== */}
            {showAllComments && postComments.length !== 0
              ? postComments.map((comment) => {
                  const commentState = commentStates.find(
                    (state) => state.id === comment.id
                  );
                  const commentLoadingState = loadingAllReplies.find(
                    (state) => state.id === comment.id
                  );

                  return (
                    <div key={comment.id}>
                      <div className="comments-wrapper px-3">
                        <div>
                          <div className="mt-4 mb-1 d-flex align-items-center justify-content-between gap-3">
                           
                            <div className="publisher-info d-flex align-items-start justify-content-start gap-2">
                            <img
                                className="publisher-image ms-2"
                                src={
                                  comment.user.image
                                    ? comment.user.image
                                    : process.env.PUBLIC_URL +
                                      "/Assets/Images/human-placeholder-square.jpg"
                                }
                                alt=""
                              />
                              <div className="d-flex flex-column align-items-end justify-content-end">
                                <div
                                 className={`post-publisher-name h5 ${
                                  isRTL ? "text-end" : "text-start"
                                } text-capitalize w-100`}
                                dir="rtl"
                                >
                                  {comment.user.name}
                                </div>
                                <p className="fw-medium text-end text-capitalize">
                                  {comment.text}
                                </p>
                                <ul className="border-0 social-actions-wrapper w-100 d-flex align-items-center justify-content-start gap-3 flex-wrap m-0 mb-2">
                                <li className="post-action">
                                    <button
                                      className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                                      onClick={() =>
                                        handleCommentLikeClick(comment)
                                      }
                                      dir={isRTL?"rtl":"ltr"}
                                    >
                                     <span>{comment.comment_likes_count}</span>
                                     <span> {comment.auth_user_liked ? (
                                        <FaHeart className={`${
                                          isRTL ? "me-1" : "ms-1"
                                        } likes-color`} />
                                      ) : (
                                        <FaRegHeart  className={`${
                                      isRTL ? "me-1" : "ms-1"
                                    }  likes-color`} />
                                      )}</span>
                                 

                                      
                                      {/* Update the like count based on the current state */}
                                    </button>
                                  </li>
                                  <li className="post-action">
                                    <button
                                      className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                                      onClick={() =>
                                        toggleReplyInput(comment.id)
                                      }
                                      dir={isRTL?"rtl":"ltr"}
                                    >
                                      <span>
                                      {t("reply")}
                                      </span>
                                      <img
                                     className={isRTL ? "me-2" : "ms-2"}
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/Assets/Images/icons/comments.png"
                                        }
                                        alt=""
                                      />
                                   
                                    </button>
                                  </li>
                                
                                </ul>
                              </div>
                             
                            </div>
                            <div className="publisher-card-action">
                              <DotsDropdown
                                customClass="btn-h48-s15 btn-lg px-0 cursor-pointer"
                                buttonType="subMain"
                                deleteOption={true}
                                updateOption={false}
                                deletePermission={true}
                                actionID={comment.id}
                                onSelect={handleCommnetDelete}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ===Show Post all Comments Replies=== */}
                      <div className="reply-main-wrapper mb-3">
                        {/* Only show the toggle button if shouldViewReplies is true */}
                        {commentState && commentState.shouldViewReplies ? (
                          <div className={`d-flex justify-content-start `}>
                            <button
                              className="btn fw-medium text-capitalize mc-1-clr"
                              onClick={() =>
                                toggleSpesificCommentReplies(
                                  comment.id,
                                  commentState
                                )
                              }
                            >
                              {commentState.showReplies
                                ? t("hide_replies")
                                : t("view_replies")}
                              {commentLoadingState.loadingState ? (
                                <PulseLoader
                                  color="var(--mc-1)"
                                  loading={commentLoadingState.loadingState}
                                  size={7}
                                  speedMultiplier={0.5} // Decrease this value to slow down the loader
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              ) : null}
                            </button>
                          </div>
                        ) : null}
                        {commentState?.repliesData?.length !== 0 &&
                        commentState?.showReplies
                          ? commentState.repliesData.map((reply) => (
                              <div
                                className="reply-wrapper px-3"
                                key={reply.id}
                              >
                                <div>
                                  <div className="mt-3 mb-1 d-flex align-items-center justify-content-start  gap-3">
                                    <div className="publisher-info d-flex align-items-start justify-content-start gap-2">
                                    <img
                                        className="reply-image ms-2"
                                        src={
                                          reply.user.image
                                            ? reply.user.image
                                            : process.env.PUBLIC_URL +
                                              "/Assets/Images/human-placeholder-square.jpg"
                                        }
                                        alt=""
                                      />
                                      <div className="d-flex flex-column align-items-end justify-content-end">
                                        <div
                                    className={`post-publisher-name fs-6 w-100 ${isRTL?"text-end":"text-start"} text-capitalize reply-name`}
                                    dir="rtl"
                                        >
                                          {reply.user.name}
                                        </div>
                                        <p className={`fw-semibold w-100 ${isRTL?"text-end":"text-start"} text-start text-capitalize mb-0 reply-text`}>
                                        {reply.text}
                                        </p>
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : null}

                        {/* Reply input for this specific comment */}
                        <div
                          className={`create-comment px-3  ${
                            commentState && commentState.isCreatingReply
                              ? "visible"
                              : ""
                          }`}
                        >
                          <div
                            className={`d-flex align-items-center rounded colored-border-sc`}
                          >
                              <Form.Group
                              className="text-capitalize create-btn-clr fw-medium flex-grow-1"
                              controlId="validationCustom01"
                            >
                              <Form.Control
                                required
                                type="text"
                                placeholder={t("Write a reply to the comment")}
                                value={
                                  commentState ? commentState.replyText : ""
                                }
                                className="btn-h48-s15 border-0 text-color2 fw-semibold"
                                dir={isRTL?"rtl":"ltr"}
                                onChange={(e) =>
                                  updateReplyText(comment.id, e.target.value)
                                }
                              />
                            </Form.Group>
                            <button
                              className="btn bg-transparent sc-1-clr border-0 fw-semibold text-capitalize btn-h48-s15 btn-lg"
                              disabled={
                                !commentState ||
                                commentState?.replyText.length === 0
                              }
                              onClick={() => {
                                handleCreateReplyForSpesificComment(comment.id);
                              }}
                            >
                              {commentState?.replyText.length !== 0 ? (
                                <IoIosSend className="fs-4" />
                              ) : (
                                <FiSend className="fs-4" />
                              )}
                            </button>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}

            {/* create comment component */}
            <div
              className={`create-comment px-3  ${
                isCreateComment ? "visible" : ""
              }`}
            >
              <div
                className={`d-flex align-items-center rounded colored-border-sc`}
              >
                  <Form.Group
                  className="text-capitalize create-btn-clr fw-medium flex-grow-1"
                  controlId="validationCustom01"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder={t("Write a comment")}
                    value={newCommentText}
                    className="btn-h48-s15 border-0 text-color2 fw-semibold"
                    dir={isRTL?"rtl":"ltr"}
                    onChange={(e) => setNewCommentText(e.target.value)}
                  />
                </Form.Group>
                <button
                  className="btn bg-transparent sc-1-clr border-0 fw-semibold text-capitalize btn-h48-s15 btn-lg"
                  disabled={newCommentText.length === 0}
                  onClick={handleCreateComment}
                >
                  {newCommentText.length > 0 ? (
                    <IoIosSend className="fs-4" />
                  ) : (
                    <FiSend className="fs-4" />
                  )}
                </button>
              
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsCard;
