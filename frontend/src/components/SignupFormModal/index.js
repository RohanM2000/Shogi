import SignupForm from "./SignupForm";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { receiveModal, getModal, removeModal } from "../../store/modals";
export default function SignupFormModal () {
  const showModal = useSelector(getModal("signup"));
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={()=>dispatch(receiveModal("signup"))}>Sign Up</button>
      {showModal && 
        <Modal onClose={()=>dispatch(removeModal())}>
          <SignupForm />
        </Modal>}
    </>
  )
};