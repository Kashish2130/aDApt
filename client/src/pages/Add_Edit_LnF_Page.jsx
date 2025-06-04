import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Error } from "../components/ToastComp";
import { Toaster } from "react-hot-toast";
import Lottie from "lottie-react";
import uploadLoader from "../assets/upload-loader.json"; // Download from lottiefiles

const Add_Edit_LnF_Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Extract questionId, questionData, and isEditMode from location.state for Add/Edit Question functionality
  // Extract lostItemId, lostItemData, and isEditMode from location.state for Add/Edit Lost & Found Item functionality
  const { itemId: id, itemData: item, isEditMode } = location.state || {};

  // For backward compatibility, use 'lostItem' instead of 'question'
  //add the state variables acc to lost and found item requirements
  const [itemName, setItemName] = useState(""); // for item name
  const [contact, setContact] = useState(""); // for contact information
  const [isFound, setIsFound] = useState(false); // for found status
  const [foundAt, setFoundAt] = useState(null); // for found date
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setphoto] = useState(""); //for question photo URL
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const token = sessionStorage.getItem("token");

  //edit the below useEffect to set initial values for questionName, description, category, and photo and answered status

  useEffect(() => {
    // Prefill all fields for Lost & Found item in edit mode
    if (isEditMode && item && categories.length > 0) {
      setItemName(item.item || "");
      setDescription(item.description || "");
      setContact(item.contact || "");
      setIsFound(!!item.isFound);
      setFoundAt(item.foundAt || null);
      const matchedCategory = categories.find(
        (cat) => cat._id === (item.category?._id || item.category)
      );
      setCategory(matchedCategory?._id || "");
      if (item.photo) {
        setphoto(item.photo);
        setPreviewURL(item.photo);
      }
    } else if (!isEditMode) {
      setItemName("");
      setDescription("");
      setContact("");
      setCategory("");
      setphoto("");
      setPreviewURL(null);
      setIsFound(false);
      setFoundAt(null);
    }
  }, [isEditMode, item, categories]);

  const fetchCategories = async () => {
    //* DONE
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

  useEffect(() => {
    //* Fetch categories on component mount
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    // Only accept image files
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Error("Please select a valid image file.");
      setSelectedFile(null);
      return;
    }

    // Check image dimensions
    const img = new window.Image();
    img.onload = () => {
      // If not 600x400, resize/crop to 600x400 using canvas
      if (img.width !== 600 || img.height !== 400) {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");

        // Calculate aspect ratio and crop/fit
        const aspectRatio = img.width / img.height;
        const targetRatio = 600 / 400;

        let sx = 0,
          sy = 0,
          sw = img.width,
          sh = img.height;

        if (aspectRatio > targetRatio) {
          // Image is wider than target, crop sides
          sw = img.height * targetRatio;
          sx = (img.width - sw) / 2;
        } else if (aspectRatio < targetRatio) {
          // Image is taller than target, crop top/bottom
          sh = img.width / targetRatio;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 600, 400);

        canvas.toBlob((blob) => {
          if (blob) {
            const newFile = new File([blob], file.name, { type: file.type });
            setSelectedFile(newFile);
            setPreviewURL(URL.createObjectURL(blob));
          }
        }, file.type);
      } else {
        setSelectedFile(file);
        setPreviewURL(URL.createObjectURL(file));
      }
    };
    img.onerror = () => {
      Error("Invalid image file.");
      setSelectedFile(null);
    };
    img.src = URL.createObjectURL(file);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      Error("Please select an image to upload.");
      return;
    }

    setUploading(true); // Show loader
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

      const uploadedUrl = res.data.url || res.data.photo || res.data.fileUrl;
      setphoto(uploadedUrl);
      setPreviewURL(uploadedUrl);
      console.log("File uploaded successfully:", uploadedUrl);
    } catch (err) {
      console.error("Upload error:", err);
      Error("Failed to upload file. Please try again.");
    } finally {
      setUploading(false); // Hide loader
    }
  };

const handleSubmit = async () => {
    // Validate required fields for lost and found item
    if (!itemName || !description || !category || !contact) {
        Error("Please fill in all required fields.");
        return;
    }

    // Only include photo if it is not empty
    const payload = {
        item: itemName,
        description,
        category,
        contact,
        isFound,
        // Optionally include foundAt if item is marked as found
        ...(isFound && foundAt ? { foundAt } : {}),
        ...(photo === null
            ? { photo: null }
            : photo && photo.trim() !== ""
            ? { photo }
            : {}),
    };

    console.log("Payload to be sent:", payload);

    try {
        if (isEditMode) {
            await axios.patch(
                `http://localhost:5000/api/lostnfound/item/${id}`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } else {
            await axios.post("http://localhost:5000/api/lostnfound/item", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        navigate("/lostnfound");
    } catch (err) {
        console.error("Error saving item:", err);
        Error("Failed to save item. Please try again.");
    }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#B1F0F7] via-[#F5F0CD] to-[#FADA7A] h-full w-full">
        <Toaster />
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-lg rounded-lg shadow-2xl border border-[#81BFDA] p-10">
          <h2
            className="text-4xl text-center font-bold text-gray-800 mb-10"
            style={{
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen",
            }}
          >
            {isEditMode ? "Edit Item" : "Add Item"}
          </h2>

          <div className="space-y-6">
            <TextField
              fullWidth
              variant="outlined"
              label={
                <span>
                  Item <span className="text-red-500">*</span>
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

            <TextField
              fullWidth
              variant="outlined"
              label={
                <span>
                  Contact <span className="text-red-500">*</span>
                </span>
              }
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: "8px" }}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Upload Image</label>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={uploading}
                  className="flex-1 p-2 rounded-md border border-gray-300 bg-white"
                  style={{ minWidth: 0 }}
                />
                {uploading ? (
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Lottie animationData={uploadLoader} loop={true} />
                  </div>
                ) : (
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
                )}
              </div>
            </div>

            {previewURL && (
              <div className="mt-4">
                <p className="mb-2 font-semibold text-gray-700">Preview:</p>
                {previewURL.match(/\.(png|jpg|jpeg|gif)$/i) ? (
                  <div>
                    <img
                      src={previewURL}
                      alt="Preview"
                      className="max-w-[200px] max-h-[150px] rounded-md shadow-md"
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 1, ml: 1, fontWeight: "bold" }}
                      onClick={() => {
                        setphoto(null); // Set to null instead of empty string
                        setPreviewURL(null);
                        setSelectedFile(null);
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
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

          {/* add a toggle for answered status */}
          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isFound}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsFound(checked);
                  if (checked) {
                    setFoundAt(foundAt || new Date().toISOString());
                  } else {
                    setFoundAt(null);
                  }
                }}
                className="mr-2"
              />
              <span className="text-gray-700">Mark as Found</span>
            </label>

            <div className="mt-5 flex align-right">
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
                {isEditMode ? "Save Changes" : "Add Item"}
              </Button>
            </div>
          </div>
        </div>
        {/* Closing tag for the outermost div */}
      </div>
    </motion.div>
  );
};

export default Add_Edit_LnF_Page;
