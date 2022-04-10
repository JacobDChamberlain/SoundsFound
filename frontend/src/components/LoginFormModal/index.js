import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import LoginForm from "./LoginForm";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal className='login-form-modal' onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal
