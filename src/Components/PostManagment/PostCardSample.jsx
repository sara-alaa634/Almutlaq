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

const PostCardSample = ({ data }) => {
  const { t ,i18n} = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="post-card-wrapper bg-white">
      {data && (
        <div className="post-card-content" key={data.id}>
          {/* card header */}
          <div className="card-header bg-white">
            <div
              className="my-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
            >
              <div className="publisher-info d-flex align-items-center justify-content-start gap-2">
                <div className="d-flex flex-column align-items-end justify-content-end">
                  <div
                    className="post-publisher-name h5 text-end text-capitalize"
                    dir="rtl"
                  >
                    {data.creator?.name?.length > 25
                      ? `${data.creator.name.slice(0, 25)}...`
                      : data.creator?.name || ""}
                  </div>

                  <div
                    href="#"
                    className="piblisher-action fw-medium  text-end text-capitalize"
                  >
                    {formatPostDate(data.created_at, currentLanguage)}
                  </div>
                </div>
                <img
                  className="publisher-image ms-2"
                  src={
                    data.creator && data.creator.image
                      ? data.creator.image
                      : process.env.PUBLIC_URL +
                        "/Assets/Images/human-placeholder-square.jpg"
                  }
                  alt=""
                  />
              </div>
            </div>
              <p
                className="post-card-description text-capitalize fw-medium "
                dir="rtl"
              >
                {data?.text || " "}
              </p>
          </div>
          <div className="colored-bottom-border"></div>
          {/* card body */}
          <div className="card-body p-0">
            {data.media_type && data.media_type === "image" ? (
              <img
                className="post-img w-100"
                src={data.media_path}
                alt=""
                />
            ) : data.media_type && data.media_type === "video" ? (
              <img
                className="post-img w-100"
                src={data.video_thumbnail}
                alt=""
                />
            ) : (
              <img
                className="post-img w-100"
                src={
                  process.env.PUBLIC_URL + "/Assets/Images/default-post-img.png"
                }
                alt=""
                />
            )}
            {/* ===Post Interactions=== */}
            <ul className="post-interactions-wrapper d-flex align-items-center justify-content-between flex-wrap m-0 px-4 py-3">
              <li className="post-action  px-md-3  px-2 fw-medium">
                <span className="l-d-clr d-inline-block me-2">
                  {t("share")}{" "}
                </span>
                <span className="l-d-clr">{data.shares_count}</span>{" "}
              </li>
              <li className="post-action  px-md-3  px-2 fw-medium">
                <span className="l-d-clr d-inline-block me-2">
                  {t("comment")}{" "}
                </span>
                <span className="l-d-clr">{data.comments_count} </span>{" "}
              </li>
              <li className="post-action  px-md-3  px-2 fw-medium">
                {data.first_five_likers ? (
                  <div className="likes-images-wrapper">
                    {data.first_five_likers.map((postLike) => (
                      <img
                        key={postLike.id}
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
            <ul className=" d-flex align-items-center justify-content-between flex-wrap m-0 px-3 py-4">
              <li className="post-action">
                <button
                  className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                >
                  <HiShare className="me-2 fs-5" />
                  {t("share")}
                </button>
              </li>
              <li className="post-action">
                <button
                  className="border-0 bg-transparent px-md-3 px-2 fw-medium"
                >
                  <img
                    className="me-2"
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
                  className="border-0 bg-transparent px-md-3  px-2 fw-medium"
                >
                    <FaRegHeart className="me-2 likes-color" />
                 
                  {t("like")}
                </button>{" "}
              </li>
            </ul>
            <div>
          </div>
        </div>
        </div>
      ) }
    </div>
);
};

export default PostCardSample;
