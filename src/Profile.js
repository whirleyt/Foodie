
const Profile = ({ posts, user, users }) => {

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

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
      <h2>Your Posts</h2>
      {posts && posts.filter(post => user.uid === post.userId).map(post => (
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
      ))}
    </div>
  );
};

export default Profile;