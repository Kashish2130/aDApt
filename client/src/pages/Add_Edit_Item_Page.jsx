import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Error } from "../components/ToastComp";
import { Toaster } from "react-hot-toast";

const Add_Edit_Item_Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId: id, itemData: item, isEditMode } = location.state || {};

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [resourceURL, setResourceURL] = useState("");
  const [previewURL, setPreviewURL] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (isEditMode && item && categories.length > 0) {
      setItemName(item.item || "");
      setDescription(item.description || "");

      const matchedCategory = categories.find(
        (cat) => cat._id === item.category?._id || cat._id === item.category
      );
      setCategory(matchedCategory?._id || "");

      if (item.resourceURL) {
        setResourceURL(item.resourceURL);
        setPreviewURL(item.resourceURL);
      }
    }
  }, [isEditMode, item, categories]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedUrl =
        res.data.url || res.data.resourceURL || res.data.fileUrl;
      setResourceURL(uploadedUrl);
      setPreviewURL(uploadedUrl);
      console.log("File uploaded successfully:", uploadedUrl);
    } catch (err) {
      console.error("Upload error:", err);
      Error("Failed to upload file. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!itemName || !description || !category || !resourceURL) {
      Error("Please fill in all required fields.");
      return;
    }

    const payload = {
      item: itemName,
      description,
      category,
      resourceURL,
    };

    console.log("Payload to be sent:", payload);

    try {
      if (isEditMode) {
        await axios.patch(
          `http://localhost:5000/api/shared-library/item/${id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/shared-library/item",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      navigate("/sharedreslib");
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#B1F0F7] via-[#F5F0CD] to-[#FADA7A]">
        <Toaster />
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-lg rounded-lg shadow-2xl border border-[#81BFDA] p-10">
          <h2
            className="text-4xl text-center font-bold text-gray-800 mb-10"
            style={{
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen",
            }}
          >
            {isEditMode ? "Edit Shared Resource" : "Add New Resource"}
          </h2>

          <div className="space-y-6">
            <TextField
              fullWidth
              variant="outlined"
              label={
                <span>
                  Item Name <span className="text-red-500">*</span>
                </span>
              }
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              label={
                <span>
                  Description <span className="text-red-500">*</span>
                </span>
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
            />

            <TextField
              select
              fullWidth
              variant="outlined"
              label={
                <span>
                  Category <span className="text-red-500">*</span>
                </span>
              }
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Upload File <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf,video/*"
                  style={{
                    flexGrow: 1,
                    padding: "10.5px 14px",
                    borderRadius: "8px",
                    border: "1px solid #c4c4c4",
                    cursor: "pointer",
                    backgroundColor: "white",
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleUploadClick}
                  sx={{
                    backgroundColor: "gray",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    minWidth: "120px",
                    transition: "all 0.3s ease",
                    ":hover": {
                      transform: "scale(1.01)",
                    },
                  }}
                >
                  Upload
                </Button>
              </div>
            </div>

            {previewURL && (
              <div className="mt-4">
                <p className="mb-2 font-semibold text-gray-700">Preview:</p>
                {previewURL.match(/\.(png|jpg|jpeg|gif)$/i) ? (
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="max-w-[200px] max-h-[150px] rounded-md shadow-md"
                  />
                ) : (
                  <a
                    href={previewURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Uploaded Resource
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="mt-10 flex align-right">
            <Button
              variant="outlined"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "teal",
                color: "white",
                fontWeight: "bold",
                borderRadius: "5px",
                width: "150px",
                transition: "all 0.3s ease",
                ":hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              {isEditMode ? "Save Changes" : "Add Resource"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Add_Edit_Item_Page;
