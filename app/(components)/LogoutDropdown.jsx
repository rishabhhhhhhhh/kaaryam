import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <div className="logout-button">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 font-bold rounded inline-flex items-center"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
