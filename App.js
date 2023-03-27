import AppNavigation from './src/navigation/AppNavigation';
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import Login from './src/screens/Login';
import { useState } from 'react';
const firebaseConfig = {
  apiKey: "AIzaSyBb7LA17X8rFCx-LP0dX7cSFYvcnIune6M",
  authDomain: "projecttest1-f4224.firebaseapp.com",
  projectId: "projecttest1-f4224",
  storageBucket: "projecttest1-f4224.appspot.com",
  messagingSenderId: "978560774252",
  appId: "1:978560774252:web:dedc0f79c762c5e801a849"
};

const app = initializeApp(firebaseConfig);

export default function App() {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);

  onAuthStateChanged(getAuth(app), (user) => {
    if (user) {
      console.log("User logged in...");
      setUser(user);
    } else {
      console.log("User not logged in...");
      setUser(null);
    }
  });

  if (user) {
    return (
      <AppNavigation></AppNavigation>
    );
  } else {
    return (
      <Login></Login>
    );
  }
}
