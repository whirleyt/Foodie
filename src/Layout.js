import { Outlet } from 'react-router-dom';

const Layout = ({ posts, user, setPosts }) => {

  return (
    <div>
      <header>{}</header>
      <main>
        {}
        <Outlet posts={posts} user={user} setPosts={setPosts}/>
      </main>
      <footer>{}</footer>
    </div>
  );
};

export default Layout;