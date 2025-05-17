import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { BeatLoader } from 'react-spinners';
import { AuthContext } from '../../store/firebaseContext';

 function Posts() {
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  const [products, setProducts]= useState([])
    const [spinner , setSpinner] = useState(false)
    const { user } = useContext(AuthContext);
useEffect(()=>{
if (!user) return
  async function fetchProducts() {
    try {
      setSpinner(true)
      const snapshot= await getDocs(collection(db,'products'))
      const products = snapshot.docs.map((product=>({
        id: product.id,
        ...product.data()
      })))
      setSpinner(false)
      setProducts(products)
    } catch (error) {
      console.log(error)
    }
  }
  fetchProducts()
},[user])


function HandleView(product){
  // console.log(product)
  setPostDetails(product)
  navigate('/view')
}
  return (
    <>
        {spinner?<div className='spinner'><BeatLoader color="#4d7068" /></div>:

    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
    {products.map((pro) => (
      <div key={pro.id} onClick={() => HandleView(pro)} className="card">
    <div className="favorite">
      <Heart />
    </div>
    <div className="image">
      <img src={pro.ImageURL} alt={pro.Name || "product"} />
    </div>
    <div className="content">
      <p className="rate">&#x20B9; {pro.Price}</p>
      <span className="kilometer">{pro.category}</span>
      <p className="name">{pro.Name}</p>
    </div>
    <div className="date">
      <span>
        {pro?.createdAt ? new Date(pro.createdAt.seconds * 1000).toDateString() : ''}
      </span>
    </div>
  </div>
))}

        </div>
      </div>
    
    </div>
 }
</>
  );
}

export default React.memo(Posts);
