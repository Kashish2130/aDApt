import { LostAndFoundCategory, LostAndFoundItem } from "../models/lnfModel.js";

// Get all categories
const getAllLostAndFoundCategories = async (req, res) => {
    try {
        const categories = await LostAndFoundCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error fetching Lost and Found categories:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all items
const getAllLostAndFoundItems = async (req, res) => {
    try {
        const items = await LostAndFoundItem.find();
        res.status(200).json(items);
    } catch (error) {
        console.log("Error fetching Lost and Found items:", error);
        res.status(500).json({ error: error.message });
    }
};

// Create a new category
const createLostAndFoundCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    console.log(req.user);
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "Unauthorized: user info not found" });
    }

    try {
        const newCategory = new LostAndFoundCategory({
            name,
            createdBy: req.user._id,
        });

        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.log("Error creating Lost and Found category:", error);
        res.status(500).json({ error: error.message });
    }
};

// Create a new item
const createLostAndFoundItem = async (req, res) => {
    const { item, description, photo, category, isFound, contact, foundAt } = req.body;

    // Validate required fields
    if (!item || !category || !description || !contact) {
        return res.status(400).json({ error: "Item, description, category, and contact are required" });
    }

    try {
        const newItem = new LostAndFoundItem({
            item,
            description,
            photo,
            category,
            createdBy: req.user._id, // Use req.user._id if available
            isFound: isFound || false, // Default to false if not provided
            contact,
            // Set foundAt if isFound is true and foundAt is provided, or set to now if isFound is true and foundAt is not provided
            ...(isFound ? { foundAt: foundAt || new Date() } : {})
        });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.log("Error creating Lost and Found item:", error);
        res.status(500).json({ error: error.message });
    }
};

// Edit a category
const editLostAndFoundCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ error: "Category ID and name are required" });
    }

    try {
        const existingCategory = await LostAndFoundCategory.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: "Category name already exists" });
        }

        const updatedCategory = await LostAndFoundCategory.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log("Error updating Lost and Found category:", error);
        res.status(500).json({ error: error.message });
    }
};

// Edit an item
const editLostAndFoundItem = async (req, res) => {
    const { id } = req.params;
    const { item, description, photo, category, contact, isFound, foundAt } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Item ID is required" });
    }

    try {
        const updateFields = {};
        if (item) updateFields.item = item;
        if (description) updateFields.description = description;
        if (photo) updateFields.photo = photo;
        if (category) updateFields.category = category;
        if (contact) updateFields.contact = contact;
        if (isFound !== undefined) updateFields.isFound = isFound;
        if (isFound) updateFields.foundAt = foundAt;
        if (isFound === false) updateFields.foundAt = null;

        const updatedItem = await LostAndFoundItem.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        console.log("Error updating Lost and Found item:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a category and its related items
const deleteLostAndFoundCategory = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Category ID is required" });
    }

    try {
        const category = await LostAndFoundCategory.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Delete all items related to the category
        await LostAndFoundItem.deleteMany({ category: id });

        // Delete the category itself
        await LostAndFoundCategory.findByIdAndDelete(id);

        res.status(200).json({
            message: "Category and its related items deleted successfully",
        });
    } catch (error) {
        console.log(
            "Error deleting Lost and Found category and related items:",
            error
        );
        res.status(500).json({ error: error.message });
    }
};

// Delete an item
const deleteLostAndFoundItem = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Item ID is required" });
    }

    try {
        const deletedItem = await LostAndFoundItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.log("Error deleting Lost and Found item:", error);
        res.status(500).json({ error: error.message });
    }
};

//can you one more function for getitems by category
const getItemsByCategory = async (req, res) => {
    const { id: categoryId } = req.params;

    if (!categoryId) {
        return res.status(400).json({ error: "Category ID is required" });
    }

    try {
        const items = await LostAndFoundItem.find({ category: categoryId })
            .populate("createdBy", "fullname")
            .populate("category", "name");

        res.status(200).json(items);
    } catch (error) {
        console.log("Error fetching items by category:", error);
        res.status(500).json({ error: error.message });
    }
};

export {
    getAllLostAndFoundCategories,
    getAllLostAndFoundItems,
    createLostAndFoundCategory,
    createLostAndFoundItem,
    editLostAndFoundCategory,
    editLostAndFoundItem,
    deleteLostAndFoundCategory,
    deleteLostAndFoundItem,
    getItemsByCategory,
};