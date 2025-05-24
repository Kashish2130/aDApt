import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Pencil, Trash2, Check, X, Mail } from "lucide-react";
import { motion } from "framer-motion";

const ImpEmailsPage = () => {
  const token = sessionStorage.getItem("token");
  const [emails, setEmails] = useState([]);
  const [newType, setNewType] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedType, setEditedType] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const { isAdmin } = useContext(AuthContext);

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
    if (newType.trim() && newEmail.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/emails/",
          {
            type: newType.trim(),
            emailId: newEmail.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmails([...emails, response.data]);
        setNewType("");
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

  const startEditing = (id, type, email) => {
    setIsEditing(id);
    setEditedType(type);
    setEditedEmail(email);
  };

  const updateEmail = async (id) => {
    if (editedType.trim() && editedEmail.trim()) {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/emails/${id}`,
          {
            type: editedType.trim(),
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
              ? {
                  ...email,
                  emailId: response.data.emailId,
                  type: response.data.type,
                }
              : email
          )
        );
        setIsEditing(null);
        setEditedType("");
        setEditedEmail("");
      } catch (err) {
        console.error("Error updating email:", err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen bg-[#F5F0CD] p-6 m-[15px] shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-[#2B3A42]">
              📬 Important Emails
            </h1>
            <p className="mt-2 text-lg text-[#4D5C61]">
              Reach out to the respective departments for your queries.
            </p>
          </div>

          {isAdmin && (
            <div className="bg-[#FFFFFF] p-6 rounded-lg shadow mb-8">
              <h2 className="text-2xl font-semibold text-[#2B3A42] mb-4">
                Add New Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81BFDA] bg-white"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#4E71FF] bg-white px-1">
                    Type (e.g., General Inquiries)
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81BFDA] bg-white"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#4E71FF] bg-white px-1">
                    Email Address (e.g., info@daiict.ac.in)
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={addEmail}
                  className="px-6 py-2 bg-[#4E71FF] text-white rounded-md hover:bg-blue-700 transition"
                >
                  Add Email
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emails.map((email) => (
              <div
                key={email._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border border-[#E0E7EB]"
              >
                {isEditing === email._id ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={editedType}
                        onChange={(e) => setEditedType(e.target.value)}
                        placeholder=" "
                        className="peer w-full px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81BFDA] bg-white"
                      />
                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#4E71FF] bg-white px-1">
                        Type (e.g., Undergraduate Admissions)
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        placeholder=" "
                        className="peer w-full px-4 py-2 border border-[#81BFDA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#81BFDA] bg-white"
                      />
                      <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#4E71FF] bg-white px-1">
                        Email Address
                      </label>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => updateEmail(email._id)}
                        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-[#2B3A42] mb-2">
                      {email.type}
                    </h3>
                    <div className="flex items-center text-gray-700">
                      <Mail className="h-4 w-4 mr-2 text-[#81BFDA]" />
                      <span>{email.emailId}</span>
                    </div>
                    {isAdmin && (
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() =>
                            startEditing(email._id, email.type, email.emailId)
                          }
                          className="p-2 bg-[#FADA7A] text-[#5B4D1F] rounded-md hover:bg-yellow-400 transition"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteEmail(email._id)}
                          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImpEmailsPage;
