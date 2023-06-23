import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { receiveModal, getModal, removeModal } from "../../store/modals";
export default function SignupFormModal () {
  const showModal = useSelector(getModal("signup"));
  const dispatch = useDispatch();
  const lang = useSelector(state=>state.languages.lang);
  return (
    <>
      <button className="signup-button-nav-bar" onClick={()=>dispatch(receiveModal("signup"))}>{lang === "en" ? "Sign Up" : "サインアップ"}</button>
      {showModal && 
        <Modal onClose={()=>dispatch(removeModal())}>
          <SignupForm />
        </Modal>}
    </>
  )
};