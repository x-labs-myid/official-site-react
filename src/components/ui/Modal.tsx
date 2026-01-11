import { useEffect, useRef } from "react";

const Modal = ({
  show,
  title,
  children,
  onClose,
}: {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.showModal();
    } else if (!show && modalRef.current) {
      modalRef.current.close();
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      });
    };
  }, [show]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle"
      onClick={handleBackdropClick}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>

        <div className="mt-4">{children}</div>

        <div className="modal-action hidden lg:block xl:block">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </div>
    </dialog>
  );
};

export default Modal;
