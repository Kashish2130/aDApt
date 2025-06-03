import { QnACategory, QnAQuestion } from "../models/qnaModel.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await QnACategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await QnAQuestion.find();
    res.status(200).json(questions); //! to debug
  } catch (error) {
    console.log("Error fetching questions:", error);
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  console.log(req.user);
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Unauthorized: user info not found" });
  }

  try {
    const newCategory = new QnACategory({
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

const createQuestion = async (req, res) => {
  const { question, photo, description, category } = req.body;
  if (!question || !category) {
    return res
      .status(400)
      .json({ error: "Question, category, and createdBy are required" });
  }

  try {
    const newQuestion = new QnAQuestion({
      question,
      photo,
      description,
      createdBy: req.user._id,
      category,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.log("Error creating question:", error);
    res.status(500).json({ error: error.message });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ error: "Category ID and name are required" });
  }

  try {
    const existingCategory = await QnACategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    const updatedCategory = await QnACategory.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("Error updating category:", error);
    res.status(500).json({ error: error.message });
  }
};

const editQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, photo, description, answered, category } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Question ID is required" });
  }

  try {
    const updateFields = {};
    if (question) updateFields.question = question;
    if (photo) updateFields.photo = photo;
    if (description) updateFields.description = description;
    if (answered !== undefined) updateFields.answered = answered;
    if (category) updateFields.category = category;

    const updatedQuestion = await QnAQuestion.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.log("Error updating question:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    // Find the category to ensure it exists
    const category = await QnACategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete all questions related to the category
    await QnAQuestion.deleteMany({ category: id });

    // Delete the category itself
    await QnACategory.findByIdAndDelete(id);

    res.status(200).json({
      message: "Category and its related questions deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting category and related questions:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Question ID is required" });
  }

  try {
    const deletedQuestion = await QnAQuestion.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log("Error deleting question:", error);
    res.status(500).json({ error: error.message });
  }
};

const getQuestionsByCategory = async (req, res) => {
  const { id: categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    const questions = await QnAQuestion.find({
      category: categoryId,
    })
      .populate("createdBy", "fullname")
      .populate("category", "name");

    res.status(200).json(questions);
  } catch (error) {
    console.log("Error fetching questions by category:", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllCategories,
  getAllQuestions,
  createCategory,
  createQuestion,
  editCategory,
  editQuestion,
  deleteCategory,
  deleteQuestion,
  getQuestionsByCategory,
};
