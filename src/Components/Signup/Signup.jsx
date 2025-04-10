import React, { useState } from 'react';
import Logo from '../../assets/Olx-logo.png';
import google from '../../assets/google.png'
import './Signup.css';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import GoogleSignup from '../../store/googleAuth';

const errorMessages = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/invalid-credential': 'Incorrect Email or Password.',
};
export default function Signup() {
  const [User, setUser] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [spinner , setSpinner] = useState(false)
  
  const validate = () => {
    const err = {};
    if (User.name.trim().length < 3) err.name = 'Name must be at least 3 characters';
    if (!User.email.trim().match(/^\S+@\S+\.\S+$/)) err.email = 'Enter a valid email';
    if (!User.phone.match(/^\d{10}$/)) err.phone = 'Phone must be 10 digits';
    if (User.password.trim().length < 6) err.password = 'Password must be at least 6 characters';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const HandilSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSpinner(true)
      const result = await createUserWithEmailAndPassword(auth, User.email, User.password);
      if (result.user) {
        await updateProfile(result.user, { displayName: User.name });
        await setDoc(doc(db, 'User', result.user.uid), {
          name: User.name,
          phone: User.phone,
        });
        navigate('/login',{replace:true});
        setSpinner(false)
      }
    } catch (error) {
      setSpinner(false)
      console.error('Signup Error:', error);
      const errorCode = error.code
      const message = errorMessages[errorCode] || 'Something went wrong , Please try again'
      toast.error(message)

    }
  };
  const handleGoogleSignup = () => {
    GoogleSignup(navigate, setSpinner);
  };
  

  const HandilDataChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' })); 
  };

  return (
    <>
    {spinner?<div className='spinner'><BeatLoader color="#4d7068" /></div>:
    <div className="signupWrapper">
      <div className="signupParentDiv">
        <img width="120px" src={Logo} alt="Logo" />
        <form onSubmit={HandilSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            id="username"
            name="name"
            placeholder="Enter your username"
            onChange={HandilDataChange}
            value={User.name}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={HandilDataChange}
            value={User.email}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone"
            onChange={HandilDataChange}
            value={User.phone}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            onChange={HandilDataChange}
            value={User.password}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit">Signup</button>
        </form>
        <p>Continue with</p>
<img src={google} alt="Google Sign-in" className="google-login" onClick={handleGoogleSignup} />

        <p className="loginText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>}
    </>
  );
}
