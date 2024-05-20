import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Layout = ({ posts, user }) => {

  return (
    <div>
      <header>{}</header>
      <main>
        {}
        <Outlet posts={posts} user={user}/>
      </main>
      <footer>{}</footer>
    </div>
  );
};

export default Layout;