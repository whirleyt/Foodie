import React, { useState } from 'react';
import { auth, db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styled from "styled-components";
import { FiCamera } from "react-icons/fi";

const Home = ({ posts, setPosts, users }) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('Recipes');

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

  const Tab = styled.button`
    padding: 10px 30px;
    font-weight: bold;
    color: #D3D3D3;
    cursor: pointer;
    background: #e4f1fe;
    border: 0;
    outline: 0;
    border-bottom: 2px solid transparent;
    transition: ease border-bottom 250ms;
    ${({ active }) =>
      active &&
      `
      border-bottom: 3px solid #22313f;
      color: #22313f;
    `}
  `;

 const TabGroup = () => { // Moved TabGroup inside Home
     const types = ["Recipes", "Restaurants"];
     return (
       <div className="tabs center">
         <div className="tab-container">
           {types.map((type) => (
             <Tab
               key={type}
               active={activeTab === type}
               onClick={() => {
                 setActiveTab(type);
                 updatePlaceholder(type);
                 setPhoto(null);
                 setPhotoUrl('');
                 setLocation('');
               }}
               className="tab"
             >
               {type}
             </Tab>
           ))}
         </div>
       </div>
     );
   };

   const updatePlaceholder = (type) => {
     setText('');
     const input = document.getElementById('post-text');
     input.placeholder = tabPlaceholder[type];
   };

   const tabPlaceholder = {
     Recipes: "Cooked up something delicious lately?",
     Restaurants: "Found a hidden gem to share?"
   };

   function getUserById(userId) {
     const user = users.find(user => user.uid === userId);
     return user ? user.name : 'Unknown User';
   }

	function formatTimestamp(timestamp){
		if (timestamp.seconds && timestamp.nanoseconds) {
			const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
			const formattedDate = date.toLocaleString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
             });
			return formattedDate.replace('at', '|');
		} else {
			const formattedDate = timestamp.toLocaleString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
            });
            return formattedDate.replace('at', '|');
		}
	}

   return (
     <div>
       <div>
         <TabGroup />
      </div>
	  <div className="center post">
        <textarea id="post-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={tabPlaceholder[activeTab]}
        rows={3}
        cols={38}/>
        <div className="upload-photo">
            <label htmlFor="file-upload" className="upload-icon">
                <FiCamera />
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            {photoUrl && <img src={photoUrl} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px' }} />}
        </div>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <button onClick={handlePost} className="custom-post-button">Post</button>
      </div>
      <div className="center">
        <div>
        {posts && posts.map(post => (
          post.type === activeTab && (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-info">
                  <p className="post-name">{getUserById(post.userId)}</p>
                  <p className="post-location">{post.location}</p>
                  <p className="post-text">{post.textContent}</p>
                </div>
                <div className="post-right">
                  <p className="post-timestamp">{formatTimestamp(post.timestamp)}</p>
                  <div className="post-img">
                    {post.photoUrl && <img src={post.photoUrl} alt="Post" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '10px'}} />}
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
        </div>
      </div>
    </div>
  );
};

export default Home;