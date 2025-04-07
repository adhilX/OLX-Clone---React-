import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/postContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
function View() {

  const [userDetails , setUserDetails] = useState('')
  const {postDetails} = useContext(PostContext)

  useEffect(()=>{
    // console.log(postDetails.user)
    async function FetchUserData() {
      try {
        console.log(postDetails.user)
        const docRef = doc(db,'User',postDetails.user)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserDetails(docSnap.data())
          console.log(userDetails)
        } else {
          console.log("No such user!")
        }      } catch (error) {
        console.log(error)
      }
    }
    FetchUserData()
  },[])
  // console.log(postDetails)
  return (
    <div className="viewParentDiv">
    <div className="imageShowDiv">
      <img src={postDetails.ImageURL} alt="product" />
    </div>
    <div className="rightSection">
      <div className="productDetails">
        <p>&#x20B9; {postDetails.Price}</p>
        <span className="productName">{postDetails.Name}</span>
        <p className="productCategory">{postDetails.category}</p>
        <span className="postedDate">Posted on: ff</span>
      </div>
      <div className="contactDetails">
        <p className="sectionTitle">Seller Details</p>
        <p>{userDetails.name}</p>
        <p>{userDetails.phone}</p>
      </div>
    </div>
  </div>
  
  );
}
export default View;
