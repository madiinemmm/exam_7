import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";

const useRegister = () => {
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();
  const registerWithEmail = async (email, password, displayName, photoURL) => {
    console.log(displayName, photoURL, auth.currentUser);
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      dispatch(login(user));
      toast.success("Welcome");
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error("Error");
      setIsPending(false);
    }
  };
  return { registerWithEmail, isPending };
};

export { useRegister };
