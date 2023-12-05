"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { SERVER_URL, capitalizeFirstLetter } from "../(utils)/utils";

const EditTicketForm = ({ ticketId, user: { email } }) => {
  const [userCategories, setUserCategories] = useState([]);
  const [ticket, setTicket] = useState({ _id: "new" });
  const [isLoading, setIsLoading] = useState(false);

  const DEFAULT_CATEGORIES = [
    "Deep Work",
    "Shallow Work",
    "Home",
    "Meeting",
    "Add a new category",
  ];

  const getUserTicketData = async () => {
    console.log("ticketId:", ticketId);
    if (ticketId !== "new") {
      console.log("What is value");
      try {
        setIsLoading(true);
        const res = await fetch(`${SERVER_URL}/api/Tickets/${ticketId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topic");
        }

        const ticket = await res.json();
        const ogTicket = ticket.foundTicket;

        setTicket(ogTicket);
        setEditTicketData(ogTicket);
        setIsLoading(false);
      } catch (error) {
        console.log("Error loading tasks: ", error);
      }
    }
  };

  const getUserCategories = async () => {
    try {
      console.log("Inside get user categories");
      const res = await fetch(`${SERVER_URL}/api/userCategory/${email}`);
      console.log("Data fetched");

      if (!res.ok) {
        throw new Error("Failed to fetch user categories");
      }
      console.log("Successfully");

      const userCategories = await res.json();
      setUserCategories(
        userCategories.map((userCategory) => userCategory.category)
      );
    } catch (error) {
      console.log("Error loading tasks: ", error);
    }
  };

  useEffect(() => {
    getUserTicketData();
    getUserCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Deep Work",
    userEmail: email,
  };

  const setEditTicketData = (ticket) => {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
    startingTicketData["userEmail"] = email;

    setFormData(startingTicketData);
  };

  const [formData, setFormData] = useState(startingTicketData);
  const [currentProgress, setCurrentProgress] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "progress") {
      setCurrentProgress(value);
    }

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData::", formData);

    if (formData["customCategory"]) {
      const ans = capitalizeFirstLetter(formData["customCategory"]);
      console.log("Ans : ", ans);
      formData["customCategory"] = ans;
    }

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }

    // router.refresh();
    router.push("/");
  };

  const categories = [...userCategories, ...DEFAULT_CATEGORIES];

  if (!email) {
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-y-auto bg-page text-default-text">
      <div className=" flex justify-center">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3 w-1/2"
        >
          <h3>{EDITMODE ? "Update Your Task" : "Create New Task"}</h3>
          <label>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.title}
          />
          <label>Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            required={true}
            value={formData.description}
            rows="5"
          />
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories?.map((category, _index) => (
              <option key={_index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {formData.category == "Add a new category" && (
            <>
              <label>Provide custom category name</label>
              <input
                id="customCategory"
                name="customCategory"
                type="text"
                onChange={handleChange}
                required={false}
                value={formData.customCategory}
              />
            </>
          )}

          <label>Priority</label>
          <div>
            <input
              id="priority-1"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={1}
              checked={formData.priority == 1}
            />
            <label>1</label>
            <input
              id="priority-2"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={2}
              checked={formData.priority == 2}
            />
            <label>2</label>
            <input
              id="priority-3"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={3}
              checked={formData.priority == 3}
            />
            <label>3</label>
            <input
              id="priority-4"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={4}
              checked={formData.priority == 4}
            />
            <label>4</label>
            <input
              id="priority-5"
              name="priority"
              type="radio"
              onChange={handleChange}
              value={5}
              checked={formData.priority == 5}
            />
            <label>5</label>
          </div>
          <label>Progress ({currentProgress}/100)</label>
          <input
            type="range"
            id="progress"
            name="progress"
            value={formData.progress}
            min="0"
            max="100"
            onChange={handleChange}
          />
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
          <input
            type="submit"
            className="btn max-w-xs"
            value={EDITMODE ? "Update Task" : "Create Task"}
          />
        </form>
      </div>
    </div>
  );
};

export default EditTicketForm;
