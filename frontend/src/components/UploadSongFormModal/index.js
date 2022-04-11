import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import { MdFileUpload } from 'react-icons/md';
import UploadSongForm from "./UploadSongForm";

function UploadSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="upload-modal">
      <div className="upload-icon-outer-div">
        <MdFileUpload onClick={() => setShowModal(true)}>Upload</MdFileUpload>
      </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UploadSongForm closeModal={setShowModal} />
          </Modal>
        )}
    </div>
  );
}

export default UploadSongFormModal;
