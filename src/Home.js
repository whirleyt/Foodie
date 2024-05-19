import React, { useState, useEffect } from 'react';
import { auth, db, storage } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('Recipes');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRef = await getDocs(collection(db, 'posts'));
        const postsArray = postsRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsArray);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };
    fetchData();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(file);
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      try {
        const timestamp = new Date();
        const postData = {
          userId,
          timestamp,
          type: activeTab,
          textContent: text,
          photoUrl: '',
          location
        };

        if (photo) {
          const storageRef = ref(storage, `post_images/${timestamp}_${photo.name}`);
          const snapshot = await uploadBytes(storageRef, photo);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          postData.photoUrl = downloadUrl;
        }

        const docRef = await addDoc(collection(db, 'posts'), postData);
        console.log('Post added with ID: ', docRef.id);

        const newPost = {
          id: docRef.id,
          ...postData
        };
        setPosts([newPost, ...posts]);

        setText('');
        setPhoto(null);
        setPhotoUrl('');
        setLocation('');
      } catch (error) {
        console.error('Error adding post: ', error);
      }
    } else {
      // User not logged in
    }
  };

  return (
    <div>
      <div>
        <button className={activeTab === 'Recipes' ? 'active' : ''} onClick={() => setActiveTab('Recipes')}>Recipes</button>
        <button className={activeTab === 'Restaurants' ? 'active' : ''} onClick={() => setActiveTab('Restaurants')}>Restaurants</button>
      </div>
      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your post" />
        <input type="file" onChange={handlePhotoChange} />
        {photoUrl && <img src={photoUrl} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <button onClick={handlePost}>Post</button>
      </div>
      <div>
        {posts.map(post => (
          post.type === activeTab && (
            <div key={post.id}>
              <p>User: {post.userId}</p>
              <p>Time: {post.timestamp.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
              <p>Content: {post.textContent}</p>
              <p>Location: {post.location}</p>
              {post.photoUrl && <img src={post.photoUrl} alt="Post" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Home;