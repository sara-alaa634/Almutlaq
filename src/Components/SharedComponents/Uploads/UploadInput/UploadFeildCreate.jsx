import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { useDropzone } from "react-dropzone";
import { GoUpload } from "react-icons/go";
import { errorMessages } from "../../../../helpers/messages";

const UploadFeildCreate = ({
  onUpload,
  allowVideos,
  feildType = "image-input",
  setError,
  placeholder,
  setValidated,
  reset=()=>{}
}) => {
  // Add allowVideos prop
  const { t } = useTranslation();
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedFileName(file.name);
        // setImageSrc(reader.result);
        // console.log("reader.result:",reader.result)
        setError(null);
        setValidated(true);

        if (file.type.startsWith("image/")) {
          setUploadedImage(reader.result);
          setUploadedVideo(null); // Clear video state
        } else if (file.type.startsWith("video/")) {
          setUploadedImage(null); // Clear image state
          setUploadedVideo(URL.createObjectURL(file));
        }
        onUpload(file);
        setError("");
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [onUpload, allowVideos, setError]
  );

  const onDropRejected = useCallback(
    (fileRejections) => {
      setUploadedFileName("");
      setUploadedImage(null);
      setUploadedVideo(null);
      setValidated(false);
      // setError(t(errorMessages.videoTypeInvalidError)); // Set error message

      fileRejections.forEach(({ errors }) => {
        errors.forEach((e) => {
          switch (e.code) {
            case "file-too-large":
              setError(t(errorMessages.largeFileError));
             //  console.log(e.code);
              break;
            case "file-invalid-type":
            //   console.log(e.code);
              setError(t(errorMessages.fileTypeInvalidError));
              break;
            default:
             //  console.log(e.code);
              setError(t(errorMessages.defaultError));
          }
        });
      });
    },
    [t, setError]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: allowVideos
      ? {
          "image/jpeg": [],
          "image/png": [],
          "image/gif": [],
          "video/mp4": [],
          "video/webm": [],
        }
      : {
          "image/jpeg": [],
          "image/png": [],
          "image/gif": [],
        }, // Accept images only if allowVideos is false
    maxSize: 22 * 1024 * 1024, // 10 MB
  });

  return (
    <div className="d-flex flex-wrap align-items-center">
      {feildType === "image-input" ? (
        <div
          {...getRootProps()}
          className="cursor-pointer create-btn-clr bg-transparent input-border-bottom w-100 text-capitalize fw-medium btn-h48-s15 px-3 py-5 d-flex justify-content-start align-items-center gap-4"
        >
          {uploadedImage ? (
            <div className="uploaded-file-preview">
              <img
                src={uploadedImage}
                alt=""
                className="img-thumbnail"
              />
              <span className="ms-3">{uploadedFileName}</span>
            </div>
          ) : uploadedVideo ? (
            <div className="uploaded-file-preview d-flex align-items-center gap-3">
              <video src={uploadedVideo} className="img-thumbnail" controls />
              <span>{uploadedFileName}</span>
            </div>
          ) : (
            <span>
              <span className="uploaded-file-preview">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/Images/icons/post-description-icon.png"
                  }
                  alt=""
                  className="img-thumbnail"
                />
              </span>
              <span className="ms-3">{t("Upload_attachment")}</span>
            </span>
          )}
        </div>
      ):
       feildType === "user-input-feild" ?(
        <div className="d-flex flex-wrap jusrify-contnet-start align-items-center gap-3">
        <img
          className="create-user-img rounded"
          src={
            uploadedImage
              ? uploadedImage
              : `${process.env.PUBLIC_URL}/Assets/Images/human-placeholder-square.jpg`
          }
          alt=""
        />
        <div className="upload-img-wrapper">
          <div className="upload-img-btns d-flex flex-wrap align-items-center">
            <div
              {...getRootProps()}
              className="create-btn-clr cursor-pointer bg-transparent border mb-3 text-capitalize rounded fw-medium btn-h48-s15 px-3 me-3 d-flex justify-content-center align-items-center"
              type="file"
            >
              {t("Upload_photo")}
            </div>
            <input {...getInputProps()} />

            <button
              onClick={() => {setUploadedImage(null); reset()}}
              className="btn toolbar-btn me-2 fw-semibold text-capitalize mb-3 rounded btn-h48-s15 px-3"
            >
              {t("reset")}
            </button>
          </div>
          <div className="upload-img-note">
            {t("مسموح بــ JPG, GIF or PNG. Max size of 800K")}
          </div>
        </div>
      </div>
      )
      : feildType === "wide-input-feild" ? (
        <div
          {...getRootProps()}
          className="cusrsor-pointer create-btn-clr l-d-bg wide-upload-input w-100 mb-3 text-capitalize rounded fw-medium h-196 p-1  d-flex justify-content-center align-items-center gap-4"
        >
          {uploadedImage ? (
            <div className="uploaded-file-preview w-100 h-100">
              <img
                src={uploadedImage}
                alt=""
                className="object-fill w-100 h-100 rounded"
              />
              <span className="ms-3 d-none">{uploadedFileName}</span>
            </div>
          ) : uploadedVideo ? (
            <div className="uploaded-file-preview d-flex align-items-center gap-3">
              <video src={uploadedVideo} className="img-thumbnail" controls />
              <span>{uploadedFileName}</span>
            </div>
          ) : (
            <span className="d-flex flex-column align-items-center justify-content-center gap-4">
              <span className="create-btn-clr rounded toolbar-bg  p-15px d-inline-block">
                {" "}
                <GoUpload className="fs-4" />
              </span>
              <span className="create-btn-clr fs-5 px-3 text-center">
                {placeholder?t(placeholder):t("Click to download status image")}
              </span>
            </span>
          )}
        </div>
      ) : (
        ""
      )}
      <input {...getInputProps()} />
    </div>
  );
};

export default UploadFeildCreate;
