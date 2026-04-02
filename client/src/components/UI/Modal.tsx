import React from "react";
import Button from "./Button";
import { Dialog, DialogPanel } from "@headlessui/react";

type ModalVariant = "" | "";

interface ModalProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  descrtiption?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className = "",
      icon,
      title,
      descrtiption,
      onCancel,
      onConfirm,
      confirmText,
      cancelText,
      isOpen,
    },
    ref,
  ) => {
    return (
      <Dialog
        open={isOpen}
        onClose={onCancel}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <DialogPanel
            // ref={ref}
            className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              <div className="flex items-center justify-center mb-4">
                {icon}
              </div>

              <div className="mt-2 text-center">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                  id="modal-title"
                >
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 pr-4">
                  {descrtiption}
                </p>
              </div>
            </div>

            <div className="mt-5 ">
              <div className="">
                <Button
                  size="md"
                  className="w-full justify-center mb-3"
                  variant="primary"
                  children={confirmText}
                  onClick={onConfirm}
                />
                <Button
                  size="md"
                  className="w-full justify-center"
                  variant="secondary"
                  children={cancelText}
                  onClick={onCancel}
                />
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    );
  },
);

export default Modal;
