import { createContext, useState } from "react";

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function FirebaseProvider({ children }) {
  const [user, setUser]= useState(null)
  const [userData, setUserData] = useState({});
  return (
    <FirebaseContext.Provider value={{ userData, setUserData }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
}
