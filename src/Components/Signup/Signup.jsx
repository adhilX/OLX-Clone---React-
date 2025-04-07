import React, { useState } from 'react';

import Logo from '../../assets/Olx-logo.png';
import './Signup.css';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

  const [User , setUser] = useState({name:'',email:'',phone:'',password:''})
 

  const navigate = useNavigate()
 async function HandilSubmit (e){
    e.preventDefault()
    console.log(User)
    try {
      
      const result = await createUserWithEmailAndPassword(auth,User.email,User.password)
      console.log(result.user)
      if(result.user){
       await updateProfile(result.user,{displayName:User.name})
  
        const data = await setDoc(doc(db , 'User',result.user.uid),{
          name: User.name,
          phone:User.phone
        })
        console.log(data,'aaaaaaa')
        navigate('/login')
      }
    } catch (error) {
      console.error('Signup Error:', error);
    }
  }
  const HandilDataChange =(e)=>{
    setUser(u=>({...u,[e.target.name]:e.target.value}))
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={HandilSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={HandilDataChange}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={HandilDataChange}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            onChange={HandilDataChange}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={HandilDataChange}       
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
}
