"use client";
import React, { useEffect, useState } from "react";
import { SERVER_URL, formatTimestamp } from "../(utils)/utils";
import StatusDisplay from "./StatusDisplay";
import ProgressDisplay from "./ProgressDisplay";
import PriorityDisplay from "./PriorityDisplay";
import NoDataComponent from "./NoDataComponent";
import Link from "next/link";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = ({ user: { email } }) => {
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  const trimTheValue = (value, maxLength) => {
    if (value === null || value === undefined) {
      return "";
    }
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + "...";
    }
    return value;
  };

  const getTasks = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${SERVER_URL}/api/Tickets/byEmail/${email}`);

      if (!res.ok) {
        throw new Error("Failed to fetch tasks data");
      }

      const tasksResult = await res.json();

      setTasks(tasksResult);
      setIsLoading(false);
    } catch (error) {
      console.log("Error loading tasks: ", error);
    }
  };

  useEffect(() => {
    console.log("Called again ::: ");
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  console.log("TASKSTASKS::", tasks);
  if (tasks === null || tasks === undefined || tasks.length === 0) {
    return <NoDataComponent />;
  }

  const uniqueCategories = [...new Set(tasks?.map(({ category }) => category))];

  return (
    <div className="p-5">
      <div>
        {tasks &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tasks
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <div
                      key={_index}
                      className="flex flex-col hover:bg-card-hover bg-card rounded-md shadow-lg p-3 m-2"
                    >
                      <div className="flex mb-3">
                        <PriorityDisplay priority={filteredTicket.priority} />
                        <div className="ml-auto">
                          <FontAwesomeIcon
                            icon={faX}
                            className=" text-red-400 hover:cursor-pointer hover:text-red-200"
                            onClick={() => deleteTask(filteredTicket._id)}
                          />
                        </div>
                      </div>
                      <Link
                        href={`/TicketPage/${filteredTicket._id}`}
                        style={{ display: "contents" }}
                      >
                        <div className="mb-1 task-card-title">
                          {trimTheValue(filteredTicket.title, 50)}
                        </div>
                        <hr className="h-px  border-0 bg-page mb-2 "></hr>
                        <p className="task-card-description">
                          {trimTheValue(filteredTicket.description, 120)}
                        </p>

                        <div className="flex-grow"></div>
                        <div className="flex mt-2">
                          <div className="flex flex-col">
                            <p className="text-xs  my-1">
                              {formatTimestamp(filteredTicket.createdAt)}
                            </p>
                            <ProgressDisplay
                              progress={filteredTicket.progress}
                            />
                          </div>
                          <div className="ml-auto  flex items-end">
                            <StatusDisplay status={filteredTicket.status} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
