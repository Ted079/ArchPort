const Modal = ({
  icon,
  title,
  descrtiption,
  onCancel,
  onConfirm,
  confirmText,
  cancelText,
  isOpen,
}: ModalProps) => {
  return (
    // transition — включает поддержку анимаций Tailwind
    <Dialog open={isOpen} onClose={onCancel} transition className="relative z-50">
      
      {/* 1. Backdrop (Затемнение фона) */}
      <div className="fixed inset-0 bg-black/30 transition duration-300 data-[closed]:opacity-0" />

      {/* 2. Позиционирование панели */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {/* Твой контент */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">{icon}</div>
            <DialogTitle className="text-lg font-medium text-gray-900">{title}</DialogTitle>
            <p className="mt-2 text-sm text-gray-500">{descrtiption}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button variant="primary" onClick={onConfirm} className="w-full justify-center">
              {confirmText}
            </Button>
            <Button variant="secondary" onClick={onCancel} className="w-full justify-center">
              {cancelText}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};