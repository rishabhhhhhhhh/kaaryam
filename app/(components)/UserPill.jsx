// UserPill.js

import React from "react";
import { FaUser } from "react-icons/fa";

const UserPill = ({ name, email }) => {
  return (
    <div className=" text-white rounded-md px-4 py-2 flex flex-col items-center">
      <p className="text-xs font-semibold m-1">{name}</p>
      <p className="text-xs">{email}</p>
    </div>
  );
};

export default UserPill;
