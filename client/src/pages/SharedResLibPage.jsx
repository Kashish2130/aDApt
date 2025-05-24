import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil, Save, X } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const SharedResLibPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const { isAdmin, userData } = useContext(AuthContext);
  const token = sessionStorage.getItem("token");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/shared-library/categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch items for selected category
  const fetchItemsByCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/shared-library/category/${categoryId}/items`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // Add category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/shared-library/category",
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

  // Update category
  const updateCategory = async (id, newName) => {
    if (!newName.trim()) return;
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/shared-library/category/${id}`,
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

  const handleEditItem = (item) => {
    // Navigate to the edit item page with the item's ID
    navigate("/add-edit-item", {
      state: { itemId: item._id, itemData: item, isEditMode: true },
    });
    console.log("Editing item:", item);
  };

  const createItem = () => {
    navigate("/add-edit-item");
  };

  // Delete category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/shared-library/category/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/shared-library/item/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchItemsByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <div className="w-64 h-auto bg-white shadow-xl border-r z-10">
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
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      autoFocus
                    />
                  ) : (
                    <span className="block truncate text-sm">{cat.name}</span>
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
                            deleteCategory(cat._id);
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
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold text-teal-800">
              Shared Resource Library
            </h1>
            <button
              onClick={createItem}
              className="text-teal-600 font-semibold flex items-center gap-2 border border-teal-300 px-3 py-1 rounded-lg hover:bg-teal-50 transition"
            >
              <Plus size={20} /> Add Item
            </button>
          </div>

          {!selectedCategory ? (
            <p className="text-gray-500">Select a category to view resources</p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {(Array.isArray(items) ? items : []).map((item) => {
                  const isOwner =
                    item.createdBy?.fullname === userData?.fullname;

                  return (
                    <motion.div
                      key={item._id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border rounded-lg shadow bg-white flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-lg hover:border-teal-300 hover:bg-teal-50"
                    >
                      <div>
                        <h3 className="font-semibold text-lg flex justify-between items-start gap-2">
                          <span>{item.item || "Untitled Resource"}</span>
                          {isOwner && (
                            <span className="flex gap-1">
                              <button
                                title="Edit"
                                onClick={() => handleEditItem(item)}
                                className="text-gray-500 hover:text-teal-600 transition"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                title="Delete"
                                onClick={() => handleDeleteItem(item._id)}
                                className="text-gray-500 hover:text-red-600 transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description || "No description provided"}
                        </p>
                        {item.resourceURL && (
                          <a
                            href={item.resourceURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-600 mt-2 inline-block hover:underline text-sm"
                          >
                            Visit Resource
                          </a>
                        )}
                        {item.createdBy?.fullname && (
                          <p className="text-xs text-gray-400 mt-2 italic">
                            Created by:{" "}
                            <span className="text-red-400">
                              {item.createdBy.fullname}
                            </span>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SharedResLibPage;
