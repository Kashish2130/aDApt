import Email from "../models/emailModel.js";

// Get all emails
export const getAllEmails = async (req, res) => {
    try {
        const impmails = await Email.find();
        res.status(200).json(impmails); // 200: OK
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message }); // 500: Internal Server Error
    }
};

// Create a new email
export const createEmail = async (req, res) => {
    try {
        const { name, emailId } = req.body;
        const newEmail = await Email.create({ name, emailId });
        res.status(201).json(newEmail); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message }); // 400: Bad Request
    }
};

// Update email by ID
export const updateEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, emailId } = req.body;
        const updatedEmail = await Email.findByIdAndUpdate(
            id,
            { name, emailId },
            { new: true, runValidators: true }
        );
        if (!updatedEmail) {
            return res.status(404).json({ error: "Email not found" }); // 404: Not Found
        }
        res.status(200).json(updatedEmail); // 200: OK
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message }); // 400: Bad Request
    }
};

// Delete email by ID
export const deleteEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmail = await Email.findByIdAndDelete(id);
        if (!deletedEmail) {
            return res.status(404).json({ error: "Email not found" }); // 404: Not Found
        }
        res.status(200).json({ message: "Email deleted successfully" }); // 200: OK
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message }); // 500: Internal Server Error
    }
};


