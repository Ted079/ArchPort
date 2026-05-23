import React from "react";
import Button from "./Button";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  Description,
} from "@headlessui/react";


interface ModalProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({
    icon,
    title,
    description,
    onCancel,
    onConfirm,
    confirmText,
    cancelText,
    isOpen,
  }) => {
    return (
      <Dialog
        open={isOpen}
        onClose={onCancel}
        transition
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-lg space-y-4 bg-white duration-300 ease-out data-closed:scale-95 data-closed:opacity-0 rounded-lg  px-4 pt-5 pb-4  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 overflow-hidden text-left align-bottom"
          >
            <div className="flex items-center justify-center mb-4">{icon}</div>

            <div className="mt-2 text-center">
              <DialogTitle
                className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                id="modal-title"
              >
                {title}
              </DialogTitle>
              <Description className="mt-2 text-sm text-gray-500 pr-4">
                {description}
              </Description>
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
