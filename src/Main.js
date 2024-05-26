import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Layout from './Layout';
import Profile from './Profile';
import './App.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function Main() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async (navigate) => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

   useEffect(() => {
      const fetchPosts = async () => {
        try {
  		  const userPostsRef = collection(db, 'posts');
            const userPostsSnapshot = await getDocs(userPostsRef);
            const userPostsArray = userPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(userPostsArray);
        } catch (error) {
          console.error('Error fetching posts: ', error);
        }
      };
      fetchPosts();
    }, []);

  return (
      <Router>
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Layout posts={posts} user={user} setPosts={setPosts} />}>
            <Route path="/home" element={<Home posts={posts} setPosts={setPosts} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile posts={posts} user={user} />} />
          </Route>
        </Routes>
      </Router>
    );
}

export default Main;