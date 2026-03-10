import React, { useRef, useState } from "react";
import { useGenerateWalkInTokenMutation } from "../slices/walkinTokenSlice";

const WalkInToken = () => {
  const [triggerGenerateToken, { error, isLoading }] = useGenerateWalkInTokenMutation();
  const [token, setToken] = useState(null);
  const printRef = useRef();

  const handleGenerateToken = async () => {
    try {
      const result = await triggerGenerateToken().unwrap();
      setToken(result.token);

      // Delay to let UI update before opening print window
      setTimeout(() => {
        printToken(result.token);
      }, 100);
    } catch (err) {
      console.error("Token generation failed:", err);
    }
  };

  // 🖨 Print only token section in a new window
  const printToken = (token) => {
  const printWindow = window.open("", "_blank", "width=400,height=300");
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Token</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .token-box {
              text-align: center;
              padding: 1rem 2rem;
              border: 2px dashed #4caf50;
              border-radius: 8px;
              font-size: 18px;
              min-width: 200px;
            }
            .token-value {
              font-size: 28px;
              color: #256029;
              margin-top: 8px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="token-box">
            <div>Walk-in Token</div>
            <div class="token-value">${token}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Walk-in Customer Token</h2>

      <button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg disabled:opacity-50"
        onClick={handleGenerateToken}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Token"}
      </button>

      {token && (
        <div ref={printRef} className="mt-4 text-center bg-green-100 border border-green-300 rounded-lg p-4 w-full max-w-xs">
          <p className="text-gray-700 font-semibold">Token Number:</p>
          <p className="text-2xl font-bold text-green-800">{token}</p>
        </div>
      )}

      {error && (
        <div className="text-center bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg w-full max-w-xs">
          {error?.data?.message || "Something went wrong"}
        </div>
      )}
    </div>
  );
};

export default WalkInToken;
