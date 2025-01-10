import React, { useState, useEffect } from "react";
import axios from "axios";

const IdPage = () => {
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/emails/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data]); // Add `data` as a dependency to trigger refetch

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleAdd = async () => {
    if (newName && newEmail) {
      try {
        const response = await axios.post("http://localhost:5000/api/emails/", {
          name: newName,
          emailId: newEmail,
        });
        setData((prevData) => [...prevData, response.data]);
        setNewName("");
        setNewEmail("");
        setShowAddForm(false);
      } catch (error) {
        console.error("Error adding data:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEdit = (id, name, email) => {
    setEditId(id);
    setEditName(name);
    setEditEmail(email);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/emails/${editId}`,
        {
          name: editName,
          emailId: editEmail,
        }
      );
      setData((prevData) =>
        prevData.map((item) =>
          item._id === editId ? { ...item, ...response.data } : item
        )
      );
      setEditId(null);
      setEditName("");
      setEditEmail("");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditName("");
    setEditEmail("");
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/emails/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        ID Management
      </h1>
      <button
        onClick={toggleAddForm}
        className="mb-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {showAddForm ? "Cancel" : "Add"}
      </button>
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="Enter email"
            />
          </div>
          <button
            onClick={handleAdd}
            className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {editId === item._id ? (
                  <>
                    <td className="px-6 py-4">{item._id}</td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <button
                        onClick={handleEditSave}
                        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.emailId}</td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <button
                        onClick={() =>
                          handleEdit(item._id, item.name, item.emailId)
                        }
                        className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IdPage;
