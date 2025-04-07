import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../store/firebaseContext";
import axios from "axios";
import { db } from "../../firebase/config";
import { data, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Create = () => {
  const userContext = useContext(AuthContext);
  // console.log(JSON.stringify(userContext),'fffffffffffffffff')
  const [productData, setProductData] = useState({
    Name: "",
    category: "",
    Price: "",
    user: "",
  });
  const [productImage, setProductImage] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userContext?.user.uid) {
      setProductData((p) => ({ ...p, user: userContext.user.uid }));
    }
  }, []);

  function HandleProduct(e) {
    setProductData((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleImage(e) {
    setProductImage(e.target.files[0]);
  }
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};

    if (!productData.Name || productData.Name.length < 3) {
      newErrors.Name = "Name must be at least 3 characters.";
    }

    if (!productData.category || productData.category.length < 3) {
      newErrors.category = "Category must be at least 3 characters.";
    }

    if (!productData.Price || Number(productData.Price) <= 0) {
      newErrors.Price = "Price must be a positive number.";
    }

    if (!productImage) {
      newErrors.Image = "Please upload a product image.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function HandleSubmit(e) {
    // alert("lkjsdflj ");
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSpinner(true);
 
      // console.log("sugalle");
      const url = "https://api.cloudinary.com/v1_1/dtbxcjgyg/image/upload";
      const formData = new FormData();
      formData.append("file", productImage);
      formData.append("cloud_name", "dnkdja8nb");
      formData.append("upload_preset", "olxclone");
      const response = await axios.post(url, formData);
      console.log(response.data.secure_url);
      const imageUrl = response.data.secure_url;

      const fullProductData = {
        ...productData,
        ImageURL: imageUrl,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "products"), fullProductData);
      navigate("/");
      setSpinner(false);
      toast.success("Post added successfully");
    } catch (error) {
      console.error("Error uploading product:");
      console.log(error);
    }
  }

  //  console.log(productImage)
  return (
    <>
      {spinner ? (
        <div className="spinner">
          <BeatLoader color="#4d7068" />
        </div>
      ) : (
        <>
          {/* <Header /> */}
          <div className="product-upload-wrapper">
            <div className="product-upload-card">
              <form onSubmit={HandleSubmit}>
                <h2 className="product-upload-title">Upload Product</h2>

                <label htmlFor="name">Name</label>
                <input
                  className="product-input"
                  type="text"
                  id="name"
                  name="Name"
                  onChange={HandleProduct}
                  placeholder="Enter product name"
                />
                {errors.Name && <p className="error-text">{errors.Name}</p>}

                <label htmlFor="category">Category</label>
                <input
                  className="product-input"
                  type="text"
                  id="category"
                  name="category"
                  onChange={HandleProduct}
                  placeholder="Enter category"
                />
                {errors.category && (
                  <p className="error-text">{errors.category}</p>
                )}

                <label htmlFor="price">Price</label>
                <input
                  className="product-input"
                  type="number"
                  id="price"
                  name="Price"
                  onChange={HandleProduct}
                  placeholder="Enter price"
                />
                {errors.Price && <p className="error-text">{errors.Price}</p>}

                {productImage && (
                  <div className="product-image-preview">
                    <img
                      alt="Preview"
                      width="200px"
                      height="200px"
                      src={URL.createObjectURL(productImage)}
                    />
                  </div>
                )}

                <input
                  className="product-file-input"
                  onChange={handleImage}
                  type="file"
                />
                {errors.Image && <p className="error-text">{errors.Image}</p>}

                <button type="submit" className="product-upload-btn">
                  Upload and Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Create;
