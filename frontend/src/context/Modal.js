import { createContext, useRef, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext();


export default function ModalProvider (props) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(()=> {
        setValue(modalRef.current)
    }, [])
    return (
        <>
            <ModalContext.Provider value={value}>
                {props.children}
            </ModalContext.Provider>
            <div ref={modalRef}>

            </div>
        </>
    )
};

export function Modal ({onClose, children, type}) {
    const modalNode = useContext(ModalContext);

    return (modalNode) ? ReactDOM.createPortal((
        <div id="modal">
            <div id="modal-background" onClick={onClose}>

            </div>
            <div id="modal-content" className={type === "gameover" ? "game-over-modal" : ""}>
                {children}
            </div>
        </div>
    ), modalNode) : null;
};