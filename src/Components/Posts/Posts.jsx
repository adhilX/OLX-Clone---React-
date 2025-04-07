import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

 function Posts() {
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  const [products, setProducts]= useState([])
useEffect(()=>{

  async function fetchProducts() {
    try {
      
      const snapshot= await getDocs(collection(db,'products'))
      const products = snapshot.docs.map((product=>({
        id: product.id,
        ...product.data()
      })))
     setProducts(products)
    } catch (error) {
      console.log(error)
    }
  }
  fetchProducts()
})


function HandleView(product){
  // console.log(product)
  setPostDetails(product)
  navigate('/view')
}
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
     {products.map((pro)=>{

  return       <div onClick={()=>HandleView(pro)}
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={pro.ImageURL} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {pro.Price}</p>
              <span className="kilometer">{pro.category}</span>
              <p className="name">{pro.Name} </p>
            </div>
            <div className="date">
            <span>
  {pro?.createdAt ? new Date(pro.createdAt.seconds * 1000).toDateString() : ''}
</span>
            </div>
          </div>
      
     })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
