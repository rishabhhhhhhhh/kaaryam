"use client";
import EditTicketForm from "@/app/(components)/EditTicketForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TicketPage = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return <EditTicketForm ticketId={params.id} user={session.user} />;
  }
  router.push("/");
};

export default TicketPage;
