"use client";
import {
  faHome,
  faPlus,
  faSignOut,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutDropdown";
import UserPill from "./UserPill";

const Nav = ({ user: { email, name } = {} }) => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <div className="navbar-app-title">Kaaryam</div>
        </Link>
        <Link href="/TicketPage/new" className="navbar-add-task-link">
          <div className="navbar-add-task">Add Task</div>
          <FontAwesomeIcon
            icon={faPlus}
            className="icon navbar-add-task-icon"
          />
        </Link>
      </div>
      <div className="flex">
        <UserPill name={name} email={email} />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Nav;
