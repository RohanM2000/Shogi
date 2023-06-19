import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import { getModal, receiveModal, removeModal } from "../../store/modals";
import { useSelector, useDispatch } from "react-redux";
export default function LoginFormModal () {
  const showModal = useSelector(getModal("login"));
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={()=>dispatch(receiveModal("login"))}>Log In</button>
      {showModal && 
        <Modal onClose={()=>dispatch(removeModal())}>
          <LoginForm />
        </Modal>}
    </>
  )
};