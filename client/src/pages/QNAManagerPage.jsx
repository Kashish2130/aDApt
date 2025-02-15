import React, { useState } from "react";
import { motion } from "framer-motion";

const QNAManagerPage = () => {
  const [categories, setCategories] = useState([
    { id: "web", name: "Web Development", items: ["React", "Node.js", "Tailwind CSS"] },
    { id: "ml", name: "Machine Learning", items: ["TensorFlow", "PyTorch", "Scikit-Learn"] },
    { id: "cs", name: "Computer Science", items: ["Algorithms", "Data Structures", "Operating Systems"] },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editItemName, setEditItemName] = useState("");

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: newCategory.toLowerCase(), name: newCategory, items: [] }]);
      setNewCategory("");
    }
  };

  const updateCategory = () => {
    setCategories(categories.map(cat => cat.id === editCategory ? { ...cat, name: editCategoryName } : cat));
    setEditCategory(null);
    setEditCategoryName("");
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    if (selectedCategory === id) setSelectedCategory(null);
  };

  const addItem = () => {
    if (newItem.trim() && selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory ? { ...cat, items: [...cat.items, newItem] } : cat
        )
      );
      setNewItem("");
    }
  };

  const updateItem = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory ? {
          ...cat,
          items: cat.items.map(item => item === editItem ? editItemName : item)
        } : cat
      )
    );
    setEditItem(null);
    setEditItemName("");
  };

  const deleteItem = (itemToRemove) => {
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory ? { ...cat, items: cat.items.filter((item) => item !== itemToRemove) } : cat
      )
    );
  };

  return (
    <div className="flex h-screen bg-[#F5F0CD]">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#81BFDA] p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
          <button onClick={addCategory} className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg">
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center">
              {editCategory === category.id ? (
                <>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="p-2 border rounded-lg w-full"
                  />
                  <button onClick={updateCategory} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">✔</button>
                </>
              ) : (
                <>
                  <button
                    className={`w-full text-left text-lg font-semibold px-4 py-3 rounded-lg transition ${
                      selectedCategory === category.id
                        ? "bg-[#FADA7A] text-gray-900"
                        : "bg-[#B1F0F7] text-gray-800 hover:bg-[#FADA7A]"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                  <button onClick={() => { setEditCategory(category.id); setEditCategoryName(category.name); }} className="ml-2 text-blue-600">✎</button>
                  <button onClick={() => deleteCategory(category.id)} className="ml-2 text-red-600">✖</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900">QNA Manager</h1>
        {selectedCategory ? (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 bg-white shadow-lg rounded-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {categories.find((cat) => cat.id === selectedCategory)?.name}
            </h2>
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="New Item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="p-2 border rounded-lg w-full"
              />
              <button onClick={addItem} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {categories.find((cat) => cat.id === selectedCategory)?.items.map((item, index) => (
                <li key={index} className="px-4 py-2 bg-[#B1F0F7] rounded-lg text-gray-900 font-medium flex justify-between items-center">
                  {editItem === item ? (
                    <>
                      <input
                        type="text"
                        value={editItemName}
                        onChange={(e) => setEditItemName(e.target.value)}
                        className="p-2 border rounded-lg"
                      />
                      <button onClick={updateItem} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">✔</button>
                    </>
                  ) : (
                    <>
                      {item}
                      <div className="flex space-x-2">
                        <button onClick={() => { setEditItem(item); setEditItemName(item); }} className="text-blue-600">✎</button>
                        <button onClick={() => deleteItem(item)} className="text-red-600">✖</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <p className="text-lg text-gray-700 mt-6">Select a category to view items.</p>
        )}
      </div>
    </div>
  );
};

export default QNAManagerPage;
