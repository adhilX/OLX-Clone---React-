import React, { useContext, useState } from 'react';

import Logo from '../../assets/Olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/firebaseContext';


function Login() {
  const [User , setUser] = useState({email:'',password:''})

  const HandleData = (e)=>{
    setUser((u)=>({...u,[e.target.name]:e.target.value}))
  }
  const navigate = useNavigate();
  const { setUserData } = useContext(FirebaseContext);

  const HandleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const userCredentials = await signInWithEmailAndPassword(auth,User.email,User.password)
      const userData = userCredentials.user
      console.log(userCredentials)
      if(userData){
        console.log('dkjddkdf')
        console.log(userData)                   
        setUserData(userData)
        navigate('/')
      }
    } catch (error) {
      
    }
    
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={HandleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={HandleData}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={HandleData}
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <Link to={'/signup'}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
