import React, { useState } from 'react';
import Logo from '../../assets/Olx-logo.png';
import './Signup.css';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

export default function Signup() {
  const [User, setUser] = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [spinner , setSpinner] = useState(false)

  const validate = () => {
    const err = {};
    if (User.name.trim().length < 3) err.name = 'Name must be at least 3 characters';
    if (!User.email.match(/^\S+@\S+\.\S+$/)) err.email = 'Enter a valid email';
    if (!User.phone.match(/^\d{10}$/)) err.phone = 'Phone must be 10 digits';
    if (User.password.length < 6) err.password = 'Password must be at least 6 characters';
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
        navigate('/login');
        setSpinner(false)
      }
    } catch (error) {
      console.error('Signup Error:', error.message);
    }
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
        <p className="loginText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>}
    </>
  );
}
