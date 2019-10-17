import React from 'react'
import ReactDOM from 'react-dom';
function Modal({is_visible, children}) {
  return ReactDOM.createPortal(
    <div class="modal show fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-modal="true" style={{display: is_visible ? "block" : "none", opacity:is_visible ? 1 : 0, backgroundColor:"rgba(0,0,0,0.5)"}}>
      <div class="modal-dialog" role="document">
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
