import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebaseConfig";
import { fetchUserData } from "../firebaseService";

export const profileContext = createContext();

const ProfileContext = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //console.log("__", { user });
      if (!user) {
        setProfile({});
        return;
      }

      (async () => {
        const userInfo = await fetchUserData().catch(() => null);
        if (!userInfo) {
          setProfile({});
          return;
        }

        const loggedInUser = userInfo.find((item) => item.email === user.email);
        setProfile({ ...user, role: loggedInUser?.role?.toLowerCase() });
      })();
    });
    return () => unsubscribe();
  }, []);

  // console.log("Profile: ", profile);
  return (
    <profileContext.Provider value={{ profile }}>
      {children}
    </profileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(profileContext);
};

export default ProfileContext;
