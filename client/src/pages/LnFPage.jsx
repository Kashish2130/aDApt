import { useState, useEffect, useContext } from "react";
import GroupChat from "../components/GroupChat";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle, // Chat icon
  Copy,
} from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LnFPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { isAdmin, isLoggedIn } = useContext(AuthContext);
  const token = sessionStorage.getItem("token");
  const [chatOpen, setChatOpen] = useState(false);

  // Group Chat Icon handler
  const handleGroupChatClick = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  // Fetch categories
  const fetchCategories = async () => {
    //*DONE
    try {
      const res = await axios.get(
        "http://localhost:5000/api/lostnfound/categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Add category
  const handleAddCategory = async () => {
    //*DONE
    if (!newCategoryName.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/lostnfound/category",
        { name: newCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prev) => [...prev, res.data]);
      setNewCategoryName("");
      setShowInput(false);
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Navigate to add question page
  const createQuestion = () => {
    //*DONE
    navigate("/add-edit-lnf-item");
  };

  // Update category
  const updateCategory = async (id, newName) => {
    //*DONE
    if (!newName.trim()) return;
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/lostnfound/category/${id}`,
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? res.data : cat))
      );
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  // Navigate to edit question page
  const handleEditItem = (item) => {
    // For Lost & Found: navigate to edit page with item data
    //*DONE
    navigate("/add-edit-lnf-item", {
      state: {
        itemId: item._id,
        itemData: item,
        isEditMode: true,
      },
    });
    console.log("Editing item:", item);
  };

  // Delete category
  const deleteCategory = async (id) => {
    //*DONE
    try {
      await axios.delete(
        `http://localhost:5000/api/lostnfound/category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      // If deleted category was selected, clear items and selectedCategory
      if (selectedCategory === id) {
        setSelectedCategory(null);
        setItems([]);
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  // Delete question
  const handleDeleteItem = async (itemId) => {
    //*DONE
    try {
      await axios.delete(
        `http://localhost:5000/api/lostnfound/item/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Fetch questions for selected category
  const fetchItemsByCategory = async (categoryId) => {
    //*DONE
    if (!categoryId) return;
    try {
      console.log("hey this is category id:", categoryId);
      const res = await axios.get(
        `http://localhost:5000/api/lostnfound/category/${categoryId}/items`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    //*DONE
    fetchCategories();
  }, []);

  useEffect(() => {
    //*DONE
    if (selectedCategory) fetchItemsByCategory(selectedCategory);
    else setItems([]);
  }, [selectedCategory]);

  // Format posted date nicely
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex h-[calc(100vh-72px)] transition-all duration-300 ease-in-out">
        {/* Sidebar */}
        <motion.div
          animate={{ width: sidebarExpanded ? 260 : 64 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white shadow-xl border-r z-10 overflow-auto"
        >
          {/* Toggle button */}
          <button
            onClick={() => setSidebarExpanded((prev) => !prev)}
            className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-30 px-1 py-2 bg-teal-600 border border-teal-700 shadow-md transition-all duration-200 hover:bg-teal-700 hover:scale-105 hover:shadow-lg"
            title={sidebarExpanded ? "Collapse" : "Expand"}
          >
            {sidebarExpanded ? (
              <ChevronLeft size={20} className="text-white" />
            ) : (
              <ChevronRight size={20} className="text-white" />
            )}
          </button>

          {sidebarExpanded && (
            <>
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Categories</h2>
                {isAdmin && (
                  <button
                    onClick={() => setShowInput((prev) => !prev)}
                    title="Add Category"
                    className="text-teal-600 hover:text-teal-800"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>

              {isAdmin && showInput && (
                <div className="p-4">
                  <input
                    type="text"
                    className="border px-2 py-1 w-full rounded"
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddCategory();
                      if (e.key === "Escape") {
                        setShowInput(false);
                        setNewCategoryName("");
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={handleAddCategory}
                    className="mt-2 w-full bg-teal-600 text-white py-1 rounded hover:bg-teal-700"
                  >
                    Add
                  </button>
                </div>
              )}

              <ul className="space-y-1 px-2 py-2">
                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    className={`group flex justify-between items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition hover:bg-teal-100 ${
                      selectedCategory === cat._id
                        ? "bg-teal-200 font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(cat._id)}
                  >
                    <div className="flex-1 min-w-0">
                      {isAdmin && editingCategoryId === cat._id ? (
                        <input
                          type="text"
                          value={editedCategoryName}
                          onChange={(e) =>
                            setEditedCategoryName(e.target.value)
                          }
                          className="w-full px-2 py-1 border rounded text-sm"
                          autoFocus
                        />
                      ) : (
                        <span className="block truncate text-sm">
                          {cat.name}
                        </span>
                      )}
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {editingCategoryId === cat._id ? (
                          <>
                            <button
                              title="Save"
                              className="p-1 rounded text-green-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCategory(cat._id, editedCategoryName);
                                setEditingCategoryId(null);
                              }}
                            >
                              <Save size={18} />
                            </button>
                            <button
                              title="Cancel"
                              className="p-1 rounded text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingCategoryId(null);
                                setEditedCategoryName("");
                              }}
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              title="Edit"
                              className="p-1 rounded text-gray-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingCategoryId(cat._id);
                                setEditedCategoryName(cat.name);
                              }}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              title="Delete"
                              className="p-1 rounded text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                {
                                  deleteCategory(cat._id);
                                }
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>

        {/* Main content */}
        <div className="flex-1 p-6 transition-all duration-300">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold text-teal-800">
              Lost & Found Manager
            </h1>
            <div className="flex gap-2">
              <button
                onClick={createQuestion}
                className="text-teal-600 font-semibold flex items-center gap-2 border border-teal-300 px-3 py-1 rounded-lg hover:bg-teal-50 transition"
              >
                <Plus size={20} /> Add Item
              </button>
              <button
                onClick={handleGroupChatClick}
                className="text-teal-600 font-semibold flex items-center gap-2 border border-teal-300 px-3 py-1 rounded-lg hover:bg-teal-50 transition"
                title="Open Group Chat"
              >
                <MessageCircle size={20} /> Group Chat
              </button>
            </div>
          </div>

          {!selectedCategory ? (
            <p className="text-gray-500">Select a category to view items.</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {(Array.isArray(items) ? items : []).map((item) => {
                  const user = JSON.parse(sessionStorage.getItem("user"));
                  const isOwner = item.createdBy?._id === user?._id;
                  const handleCardClick = () => {
                    if (item.photo) {
                      window.open(item.photo, "_blank");
                    }
                  };
                  return (
                    <motion.div
                      key={item._id}
                      whileHover={{ scale: 1.02 }}
                      className="relative cursor-pointer p-4 pb-10 border rounded-lg shadow bg-white flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-lg hover:border-teal-300 hover:bg-teal-50"
                      onClick={handleCardClick}
                    >
                      {/* Photo */}
                      <div className="h-40 w-full rounded-md overflow-hidden mb-3">
                        <img
                          src={item.photo}
                          alt="item"
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* title */}
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                        {item.item}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {item.description || "No description provided"}
                      </p>

                      {/* Details */}
                      <div className="flex flex-col flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate mt-1 mb-1">
                          Created By: {" "}
                          <span className="font-normal">
                            {item.createdBy?.fullname || "Unknown"}
                          </span>
                        </p>
                        <div className="flex items-center mb-1">
                          <span className="text-sm text-gray-800 mr-2">Contact:</span>
                          {item.contact ? (
                            <span className="inline-flex items-center bg-teal-50 border border-teal-200 text-teal-700 px-2 py-0.5 rounded font-medium text-sm shadow-sm">
                              <span className="mr-1 select-all">{item.contact}</span>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(item.contact);
                                  toast.success("Copied to clipboard");
                                }}
                                className="p-1 rounded-full hover:bg-teal-100 transition"
                                title="Copy contact to clipboard"
                                style={{ lineHeight: 0 }}
                              >
                                <Copy size={15} className="text-teal-600" />
                              </button>
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">-</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Status: {" "}
                          <span
                            className={`font-semibold ${
                              item.isFound ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {item.isFound ? "Found" : "Not Found"}
                          </span>
                        </p>
                        {item.isFound && item.foundAt && (
                          <p className="text-xs text-gray-500 mb-1">
                            Found At: {formatDate(item.foundAt)}
                          </p>
                        )}
                      </div>

                      {/* Icons - bottom right */}
                      {(isAdmin || isOwner) && (
                        <div className="absolute bottom-3 right-3 flex gap-2">
                          <button
                            onClick={e => { e.stopPropagation(); handleEditItem(item); }}
                            title="Edit item"
                            className="p-1 rounded text-gray-600 hover:text-teal-600 transition"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); handleDeleteItem(item._id); }}
                            title="Delete item"
                            className="p-1 rounded text-red-600 hover:text-red-700 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                      {/* Chat icon bottom left */}
                      <div className="absolute bottom-3 left-3 text-teal-600">
                        <button onClick={e => { e.stopPropagation(); setChatOpen(true); }} title="Open group chat">
                          <MessageCircle size={20} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
      {/* Group Chat Modal */}
      <GroupChat open={chatOpen} onClose={handleCloseChat} />
    </motion.div>
  );
  return (
    <>
      {/* Main page UI */}
      {/* ...existing code... */}
      <GroupChat open={chatOpen} onClose={() => setChatOpen(false)} room="lost-and-found" />
    </>
  );
  return (
    <div>
      {/* ...existing Lost & Found UI... */}
      <button
        style={{ position: "fixed", right: 30, bottom: 30, zIndex: 9998, background: "#007bff", color: "#fff", borderRadius: "50%", width: 56, height: 56, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", display: isLoggedIn ? "flex" : "none", alignItems: "center", justifyContent: "center", fontSize: 28, cursor: "pointer" }}
        title="Group Chat"
        onClick={handleGroupChatClick}
      >
        <MessageCircle />
      </button>
      {chatOpen && (
        <GroupChat open={chatOpen} onClose={handleCloseChat} />
      )}
      {/* ...rest of Lost & Found UI... */}
    </div>
  );
};

export default LnFPage;
