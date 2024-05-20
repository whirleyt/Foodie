import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Profile = ({ posts, user }) => {

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>Your Posts</h2>
      {posts && posts.filter(post => user.uid === post.userId).map(post => (
        <div key={post.id}>
          <p>User: {post.userId}</p>
          <p>Time:</p>
          <p>Content: {post.textContent}</p>
          <p>Location: {post.location}</p>
          <img src={post.photoUrl} alt="Post" />
        </div>
      ))}
    </div>
  );
};

export default Profile;