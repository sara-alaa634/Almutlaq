import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { useDropzone } from "react-dropzone";
import { GoUpload } from "react-icons/go";
import { errorMessages } from "../../../../helpers/messages";

const UploadFileCreate = ({
  onUpload,
  allowVideos,
  setError,
  setValidated,
  placeholder,
}) => {
  //   console.log("allowVideos: ", allowVideos);
  const { t } = useTranslation();
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFilePreview, setUploadedFilePreview] = useState(null);
  const [uploadedVideoPreview, setUploadedVideoPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadedFileName(file.name);
        setError(null);
        setValidated(true);

        if (file.type.startsWith("image/")) {
          setUploadedFilePreview(reader.result);
          setUploadedVideoPreview(null);
        } else if (file.type.startsWith("video/")) {
          setUploadedVideoPreview(URL.createObjectURL(file));
          setUploadedFilePreview(null);
        } else {
          // Use a generic thumbnail for non-previewable files
          setUploadedFilePreview(
            `${process.env.PUBLIC_URL}/Assets/Images/icons/file-thumbnail.png`
          );
          setUploadedVideoPreview(null);
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
      setUploadedFilePreview(null);
      setUploadedVideoPreview(null);
      setValidated(false);
      //   setError(t(errorMessages.fileTypeInvalidError));

      fileRejections.forEach(({ errors }) => {
        //   console.log("error: ", errors);
        errors.forEach((e) => {
          switch (e.code) {
            case "file-too-large":
              setError(t(errorMessages.largeFileError));
              //  console.log(e.code);
              break;
            case "file-invalid-type":
              setError(t(errorMessages.fileTypeInvalidError));
              break;
            default:
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
          "application/pdf": [],
          "application/msword": [],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [],
        }
      : {
          "image/jpeg": [],
          "image/png": [],
          "image/gif": [],
          "application/pdf": [],
          "application/msword": [],
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [],
        },
    maxSize: 10 * 1024 * 1024, // 10 MB
  });

  return (
    <div className="d-flex flex-wrap align-items-center">
      <div
        {...getRootProps()}
        className="cursor-pointer create-btn-clr bg-transparent border w-100 mb-3 text-capitalize rounded fw-medium btn-h48-s15 px-3 py-5 d-flex justify-content-start align-items-center gap-4"
      >
        {uploadedFilePreview ? (
          <div className="uploaded-file-preview">
            {uploadedFileName.endsWith(".pdf") ||
            uploadedFileName.endsWith(".doc") ? (
              <div className="file-thumbnail">
                <img
                  src={
                    uploadedFileName.endsWith(".pdf")
                      ? `${process.env.PUBLIC_URL}/Assets/Images/icons/pdf-file-thumbnail.png`
                      : uploadedFileName.toLowerCase().endsWith(".doc") ||
                        uploadedFileName.toLowerCase().endsWith(".docx")
                      ? `${process.env.PUBLIC_URL}/Assets/Images/icons/word-file-thumbnail.png`
                      : `${process.env.PUBLIC_URL}/Assets/Images/icons/file-thumbnail.png`
                  }
                  alt=""
                  className="img-thumbnail"
                />
                <span className="ms-3">{uploadedFileName}</span>
              </div>
            ) : (
              <div className="uploaded-file-preview">
                <img
                  src={uploadedFilePreview}
                  alt=""
                  className="img-thumbnail"
                />
                <span className="ms-3">{uploadedFileName}</span>
              </div>
            )}
          </div>
        ) : uploadedVideoPreview ? (
          <div className="uploaded-file-preview d-flex align-items-center gap-3">
            <video src={uploadedVideoPreview} className="img-thumbnail" />
            <span>{uploadedFileName}</span>
          </div>
        ) : (
          <span>
            <span className="create-btn-clr rounded toolbar-bg p-2 px-3 d-inline-block me-3">
              {" "}
              <GoUpload className="fs-5" />
            </span>
            <span className="ms-3">
              {placeholder ? placeholder : t("Upload_attachment")}
            </span>
          </span>
        )}
      </div>
      <input {...getInputProps()} />
    </div>
  );
};

export default UploadFileCreate;
