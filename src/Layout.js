import { Outlet } from 'react-router-dom';

const Layout = ({ posts, user, setPosts, users }) => {

  return (
    <div>
      <header>{}</header>
      <main>
        {}
        <Outlet posts={posts} user={user} setPosts={setPosts} users={users}/>
      </main>
      <footer>{}</footer>
    </div>
  );
};

export default Layout;