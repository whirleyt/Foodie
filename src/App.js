import './App.css';
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        setData(querySnapshot.docs.map(doc => doc.data()));
      };
      fetchData();
    }
  }, [user]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, 'email@example.com', 'password')
      .catch((error) => console.error("Authentication error:", error));
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      {user ? <div>Logged in as {user.email}</div> : <button onClick={handleLogin}>Login</button>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
