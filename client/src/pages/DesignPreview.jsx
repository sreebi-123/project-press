import React, { useEffect } from "react";

const DesignPreviewModal = ({ imageUrl, onClose }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Design</title>
          <style>
            @page { margin: 0; }
            body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" style="max-width:100%; max-height:100%;" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Close modal with ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg relative w-96 max-w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 font-bold"
        >
          X
        </button>
        <img
          src={imageUrl}
          alt="Design Preview"
          className="w-full h-auto mb-4"
        />
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default DesignPreviewModal;
