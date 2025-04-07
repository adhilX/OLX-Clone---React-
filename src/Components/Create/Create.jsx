import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../store/firebaseContext";
import axios from "axios";
import { db } from "../../firebase/config";
import { data, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

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
  const navigate = useNavigate()

  async function HandleSubmit(e) {
    // alert("lkjsdflj ");
    try {
      // console.log("sugalle");
      e.preventDefault();
      const url = "https://api.cloudinary.com/v1_1/dtbxcjgyg/image/upload";
      const formData = new FormData();
      formData.append("file", productImage);
      formData.append("cloud_name", "dnkdja8nb");
      formData.append("upload_preset", "olxclone");
      const response = await axios.post(url, formData);
      console.log(response.data.secure_url);
      const imageUrl = response.data.secure_url;
  
      const fullProductData = { ...productData, ImageURL: imageUrl ,createdAt:  new Date() }; 
      await addDoc(collection(db, "products"), fullProductData);
      navigate('/')

    } catch (error) {
      console.error("Error uploading product:" );
      console.log(error)
    }
  }

  //  console.log(productImage)
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={HandleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={HandleProduct}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={HandleProduct}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              onChange={HandleProduct}
            />
            <br />
            <br />
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={productImage ? URL.createObjectURL(productImage) : ""}
            ></img>
            <br />
            <input onChange={handleImage} type="file" />
            <br />
            <button type="submit" className="uploadBtn">
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;
