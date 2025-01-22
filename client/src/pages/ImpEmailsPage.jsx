import React, { useState, useEffect } from "react";
import axios from "axios";

const ImpEmailsPage = () => {
  const token = localStorage.getItem("token");
  console.log(token);

  const [emails, setEmails] = useState([]);
  const [newName, setNewName] = useState(""); // State for the name input
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedName, setEditedName] = useState(""); // State for edited name
  const [editedEmail, setEditedEmail] = useState("");

  const fetchEmails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/emails/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmails(response.data);
    } catch (err) {
      console.error("Error fetching emails:", err);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const addEmail = async () => {
    if (newName.trim() && newEmail.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/emails/",
          {
            name: newName.trim(),
            emailId: newEmail.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmails([...emails, response.data]);
        setNewName("");
        setNewEmail("");
      } catch (err) {
        console.error("Error adding email:", err);
      }
    }
  };

  const deleteEmail = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/emails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmails(emails.filter((email) => email._id !== id));
    } catch (err) {
      console.error("Error deleting email:", err);
    }
  };

  const startEditing = (id, name, email) => {
    setIsEditing(id);
    setEditedName(name);
    setEditedEmail(email);
  };

  const updateEmail = async (id) => {
    if (editedName.trim() && editedEmail.trim()) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/emails/${id}`,
          {
            name: editedName.trim(),
            emailId: editedEmail.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmails(
          emails.map((email) =>
            email._id === id
              ? { ...email, emailId: response.data.emailId, name: response.data.name }
              : email
          )
        );
        setIsEditing(null);
        setEditedName("");
        setEditedEmail("");
      } catch (err) {
        console.error("Error updating email:", err);
      }
    }
  };

  return (
    <div>
      <div className="p-6 bg-[#F5F0CD] min-h-screen m-3 rounded">
        <h1 className="text-2xl font-semibold text-black mb-6">Important Emails</h1>

        {/* Add Email Section */}
        <div className="bg-white p-4 shadow-md rounded-md mb-6 flex gap-3 items-center border border-[#FADA7A]">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a name"
            className="flex-1 px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B1F0F7]"
            style={{ flex: 1 }} // Name takes 1 part of the space
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter an email"
            className="flex-3 px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B1F0F7]"
            style={{ flex: 3 }} // Email takes 3 parts of the space
          />
          <button
            onClick={addEmail}
            className="px-4 py-2 bg-[#81BFDA] text-white rounded-md hover:bg-[#B1F0F7] transition duration-200"
          >
            Add Email
          </button>
        </div>

        {/* Email List */}
        <div className="space-y-4">
          {emails.map((email) => (
            <div
              key={email._id}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-[#B1F0F7]"
            >
              {isEditing === email._id ? (
                <div className="flex gap-3 items-center w-full">
                  {/* Edit Name Input */}
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-3 px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B1F0F7]"
                  />
                  {/* Edit Email Input */}
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B1F0F7]"
                  />
                  {/* Save and Cancel Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateEmail(email._id)}
                      className="px-3 py-2 bg-[#81BFDA] text-white rounded-md hover:bg-[#B1F0F7] transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(null)}
                      className="px-3 py-2 bg-[#FADA7A] text-black rounded-md hover:bg-[#F5F0CD] transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <span className="text-black font-medium">{email.name}: {email.emailId}</span>
              )}
              {!isEditing && (
                <div className="flex gap-3">
                  <button
                    onClick={() => startEditing(email._id, email.name, email.emailId)}
                    className="px-3 py-2 bg-[#B1F0F7] text-black rounded-md hover:bg-[#81BFDA] transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEmail(email._id)}
                    className="px-3 py-2 bg-[#FADA7A] text-black rounded-md hover:bg-[#F5F0CD] transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpEmailsPage;
