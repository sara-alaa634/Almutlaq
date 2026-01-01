import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { useDropzone } from "react-dropzone";
import { GoUpload } from "react-icons/go";
import { errorMessages } from "../../../../helpers/messages";

const UploadFileUpdate = ({
  onUpload,
  allowVideos,
  oldUploadedFiles = null,
  setImageError,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(oldUploadedFiles);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (disabled) return; // Prevent file uploads when disabled

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedFileName(file.name);
        setError("");
        setValidation(true);

        if (file.type.startsWith("image/")) {
          setUploadedImage(reader.result);
          setUploadedVideo(null); // Clear video state
        } else if (file.type.startsWith("video/") && allowVideos) {
          setUploadedImage(null); // Clear image state
          setUploadedVideo(URL.createObjectURL(file));
        }
        onUpload(file);
        setImageError(""); // Clear any previous error
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    [onUpload, allowVideos, setImageError, disabled]
  );

  const onDropRejected = useCallback(
    (fileRejections) => {
      if (disabled) return; // Prevent file uploads when disabled
      setUploadedFileName("");
      setUploadedImage(null);
      setUploadedVideo(null);
      setValidation(false);
      setImageError(t(errorMessages.videoTypeInvalidError)); // Set error message

      fileRejections.forEach(({ errors }) => {
        errors.forEach((e) => {
          switch (e.code) {
            case "file-too-large":
              setError(t(errorMessages.imageLargeFileError));
              break;
            case "file-invalid-type":
              setError(t(errorMessages.videoTypeInvalidError));
              break;
            default:
              setError(t(errorMessages.defaultImageError));
          }
        });
      });
    },
    [disabled, t, setImageError]
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
        },
    maxSize: 10 * 1024 * 1024, // 10 MB
    disabled: disabled, // Disable the dropzone
  });

  return (
    <div
      className={`d-flex flex-wrap align-items-center ${
        disabled ? "disabled" : ""
      }`}
    >
      <div
        {...getRootProps()}
        className="cusrsor-pointer create-btn-clr bg-transparent border w-100 mb-3 text-capitalize rounded fw-medium btn-h48-s15 px-3 py-5  d-flex justify-content-start align-items-center gap-4"
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
            <span className="create-btn-clr rounded toolbar-bg p-2 px-3 d-inline-block me-3">
              {" "}
              <GoUpload className="fs-5" />
            </span>
            <span className="ms-3">{t("Upload_attachment")}</span>
          </span>
        )}
      </div>

      <input {...getInputProps()} disabled={disabled} />
      <Form.Control.Feedback
        type="invalid"
        className={validation ? "" : "d-none"}
      >
        {error}
      </Form.Control.Feedback>
    </div>
  );
};

export default UploadFileUpdate;
