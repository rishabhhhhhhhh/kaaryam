"use client";
import { useSession } from "next-auth/react";
import SignInPage from "./(components)/SignInPage";
import Dashboard from "./(components)/Dashboard";
import Nav from "./(components)/Nav";
import Login from "./(components)/LoginPage";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <Login />;
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Nav user={session.user} />
      <div className="flex-grow overflow-y-auto bg-page text-default-text">
        <Dashboard user={session.user} />
      </div>
    </div>
  );
}
