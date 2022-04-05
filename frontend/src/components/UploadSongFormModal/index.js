import React, { useState } from "react";
import { Modal } from '../../context/Modal';
// import LoginForm from "./LoginForm";

function UploadSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <LoginForm /> */}
        </Modal>
      )}
    </>
  );
}

export default UploadSongFormModal;
