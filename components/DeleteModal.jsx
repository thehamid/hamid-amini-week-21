import React from "react";
import Button from "./ui/Button";
import close from "@/assets/Close.png";

const DeleteModal = ({ isOpen, onClose, onConfirm, productName, message }) => {
  if (!isOpen) return null;

  const displayMessage =
    message || `آیا از حذف محصول "<b>${productName}</b>" مطمئن هستید؟`;

  return (
    <div className="fixed inset-0 transition-all transform bg-black/10  backdrop-blur-md overflow-y-auto h-full w-full">
      <div className="relative top-40 mx-auto p-5 border w-96 shadow-lg rounded-2xl bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full">
            <img src={close} alt="close" />
          </div>
          <div className="mt-5 px-7 py-3">
            <p
              className="text-md text-gray-500"
              dangerouslySetInnerHTML={{ __html: displayMessage }}
            ></p>
            <p className="text-md text-gray-500">این عمل غیرقابل بازگشت است.</p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              type="button"
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl w-full cursor-pointer"
            >
              حذف
            </Button>

            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl w-full cursor-pointer"
            >
              لغو
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
