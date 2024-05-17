import React from "react";

function Modal({ children }: any) {
  return (
    <div className="top height-0 fixed top-0 flex h-screen w-full items-center justify-center bg-gray-500/50">
      {children}
    </div>
  );
}

export default Modal;
