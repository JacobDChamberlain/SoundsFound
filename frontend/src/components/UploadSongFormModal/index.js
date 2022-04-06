import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import UploadSongForm from "./UploadSongForm";

function UploadSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="upload-song-modal" onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSongForm closeModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UploadSongFormModal;
