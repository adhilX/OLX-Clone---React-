import React, { useContext, useState } from 'react';
import google from '../../assets/google.png'
import Logo from '../../assets/Olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/firebaseContext';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import GoogleSignup from '../../store/googleAuth';

const errorMessages = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/invalid-credential': 'Incorrect Email or Password.',
};
function Login() {
  const [User , setUser] = useState({email:'',password:''})
  const [errors, setErrors] = useState({});
  const [spinner , setSpinner] = useState(false)
  const validation =()=>{
    const err={}
    if (!User.email.match(/^\S+@\S+\.\S+$/)) err.email = 'Enter a valid email';
    if (User.password.length < 6) err.password = 'Password must be at least 6 characters';
    setErrors(err)
    return Object.keys(err).length === 0
  }
  const HandleData = (e)=>{
    setUser((u)=>({...u,[e.target.name]:e.target.value}))
  }
  const navigate = useNavigate();
  const { setUserData } = useContext(FirebaseContext);

  const HandleSubmit =async (e)=>{
    e.preventDefault()
    if(!validation())return
    try {
      setSpinner(true)
      const userCredentials = await signInWithEmailAndPassword(auth,User.email,User.password)
      const userData = userCredentials.user
      console.log(userCredentials)
      if(userData){
        // console.log('dkjddkdf')
        console.log(userData)                   
        setUserData(userData)
        navigate('/',{replace:true})
        setSpinner(false)
        toast.success('Login successully')
      }
    } catch (error) {
      setSpinner(false)
      console.log('Loginup error',error)
      const errorCode = error.code
      const message = errorMessages[errorCode] || 'Something went wrong , Please try again'
      toast.error(message)
    }
  }
  const handleGoogleSignup = () => {
    GoogleSignup(navigate, setSpinner);
  };


  return (
    <>
    {spinner?<div className='spinner'><BeatLoader color="#4d7068" /></div>:
    <div className="loginWrapper">
    <div className="loginParentDiv">
      <img width="120px" src={Logo} alt="Logo" />
      <form onSubmit={HandleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          onChange={HandleData}
          placeholder="Enter your email"
          
        />
            {errors.email && <span className="error">{errors.email}</span>}
        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          onChange={HandleData}
          placeholder="Enter your password"
          
        />
            {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit">Login</button>
      </form>
       <p>Continue with</p>
      <img src={google} alt="Google Sign-in" className="google-login" onClick={handleGoogleSignup} />
      
      <p className="signupText">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  </div>
    }
    </>
  );
}

export default Login;
