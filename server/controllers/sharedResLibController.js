import { SharedCategory, SharedItem } from "../models/sharedResLibModel.js";

// Get all categories
const getAllSharedCategories = async (req, res) => {
  try {
    const categories = await SharedCategory.find();
    res.status(200).json(categories);
    console.log("Fetched shared library categories:", categories);
  } catch (error) {
    console.log("Error fetching shared library categories:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all items
const getAllSharedItems = async (req, res) => {
  try {
    const items = await SharedItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.log("Error fetching shared library items:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new category
const createSharedCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Unauthorized: user info not found" });
  }

  try {
    const newCategory = new SharedCategory({
      name,
      createdBy: req.user._id, // use authenticated user's ID
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log("Error creating shared library category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new item
const createSharedItem = async (req, res) => {
  const { item, description, resourceURL, category } = req.body;

  if (!item || !resourceURL || !category) {
    return res.status(400).json({
      error: "Item, resourceURL and category, are required",
    });
  }

  try {
    const newItem = new SharedItem({
      item,
      description,
      resourceURL,
      category,
      createdBy: req.user._id, // use authenticated user's ID
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.log("Error creating shared library item:", error);
    res.status(500).json({ error: error.message });
  }
};

// Edit a category
const editSharedCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: "Category ID and name are required" });
  }

  try {
    const existingCategory = await SharedCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    const updatedCategory = await SharedCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("Error updating shared library category:", error);
    res.status(500).json({ error: error.message });
  }
};

// Edit an item
const editSharedItem = async (req, res) => {
  const { id } = req.params;
  const { item, description, resourceURL, category } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  try {
    const updateFields = {};
    if (item) updateFields.item = item;
    if (description) updateFields.description = description;
    if (resourceURL) updateFields.resourceURL = resourceURL;
    if (category) updateFields.category = category;

    const updatedItem = await SharedItem.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.log("Error updating shared library item:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a category and its related items
const deleteSharedCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    const category = await SharedCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete all items related to the category
    await SharedItem.deleteMany({ category: id });

    // Delete the category itself
    await SharedCategory.findByIdAndDelete(id);

    res.status(200).json({
      message: "Category and its related items deleted successfully",
    });
  } catch (error) {
    console.log(
      "Error deleting shared library category and related items:",
      error
    );
    res.status(500).json({ error: error.message });
  }
};

// Delete an item
const deleteSharedItem = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  try {
    const deletedItem = await SharedItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log("Error deleting shared library item:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get items by category
const getItemsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const items = await SharedItem.find({ category: categoryId })
      .populate('category createdBy', 'fullname');

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllSharedCategories,
  getAllSharedItems,
  createSharedCategory,
  createSharedItem,
  editSharedCategory,
  editSharedItem,
  deleteSharedCategory,
  deleteSharedItem,
  getItemsByCategory
};