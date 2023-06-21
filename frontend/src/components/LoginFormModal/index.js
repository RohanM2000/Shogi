import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import { getModal, receiveModal, removeModal } from "../../store/modals";
import { useSelector, useDispatch } from "react-redux";
export default function LoginFormModal () {
  const showModal = useSelector(getModal("login"));
  const dispatch = useDispatch();
  const lang = useSelector(state=>state.languages.lang);
  return (
    <>
      <button onClick={()=>dispatch(receiveModal("login"))}>{lang === "en" ? "Log In" : "ログイン"}</button>
      {showModal && 
        <Modal onClose={()=>dispatch(removeModal())}>
          <LoginForm />
        </Modal>}
    </>
  )
};