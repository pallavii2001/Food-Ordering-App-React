import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";


 const Modal = function Modal({children,open}){
    const dialog = useRef();

    //console.log(open);
    
    useEffect(() => {
        if(open){
            dialog.current.showModal();
        }

        return ()=>{dialog.current.close()} 
    },[open]);
    
    return createPortal((<dialog ref={dialog} >
        {children}
    </dialog>),document.getElementById("modal"));
}
export default Modal;