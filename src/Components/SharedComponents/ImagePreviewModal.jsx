import React from 'react'
import { Modal } from "react-bootstrap";

const ImagePreviewModal = ({message,show, onHide}) => {
  return (
    <Modal show={show} onHide={onHide} centered className="px-sm-5 px-3 preview-modal">
  <Modal.Header closeButton>
  </Modal.Header>
  <Modal.Body>
  <img
      src={message?.media_path || process.env.PUBLIC_URL + "/Assets/Images/default-placeholder.jpg"}
      alt=""
      className='preview-img w-100 '
      onClick={(e) => e.stopPropagation()}
    />
  </Modal.Body>
  </Modal>
  )
}

export default ImagePreviewModal