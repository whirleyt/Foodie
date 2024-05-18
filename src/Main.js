import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function Main() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
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

  const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    return (
      <div>
        <h1>Welcome to My App</h1>
        {user ? (
          <div>
            Logged in as {user.email}
            <button onClick={handleLogout}>Logout</button>
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p>Please log in to view your data.</p>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        )}
      </div>
    );
}

export default Main;