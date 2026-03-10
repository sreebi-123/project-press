// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export const LogoutModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
    <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[400px] w-[300px] border border-gray-300">
      {/* <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
      
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M2.875 5.75h1.917m0 0h15.333m-15.333 0v13.417a1.917 1.917 0 0 0 1.916 1.916h9.584a1.917 1.917 0 0 0 1.916-1.916V5.75m-10.541 0V3.833a1.917 1.917 0 0 1 1.916-1.916h3.834a1.917 1.917 0 0 1 1.916 1.916V5.75m-5.75 4.792v5.75m3.834-5.75v5.75"
            stroke="#DC2626"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div> */}
      <h2 className="text-gray-900 font-semibold mt-4 text-xl">
        Are you sure?
      </h2>
      <p className="text-sm text-gray-600 mt-2 text-center">
        Do you really want to logout?
        {/* <br />
        This action cannot be undone. */}
      </p>
      <div className="flex items-center justify-center gap-4 mt-5 w-full">
        <button
          onClick={onCancel}
          className="w-full md:w-36 h-10 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="w-full md:w-36 h-10 cursor-pointer rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);
