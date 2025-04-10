// googleAuth.js
import { signInWithPopup ,GoogleAuthProvider} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { toast } from "react-toastify";

const GoogleSignup = async (navigate, setSpinner) => {
  setSpinner(true);
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "User", user.uid), {
      name: user.displayName,
      email: user.email,
      phone: user.phoneNumber || "",
    });

    toast.success("Signup successful with Google!");
    navigate("/");
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    toast.error("Google Signup failed. Please try again.");
  } finally {
    setSpinner(false);
  }
};

export default GoogleSignup;
