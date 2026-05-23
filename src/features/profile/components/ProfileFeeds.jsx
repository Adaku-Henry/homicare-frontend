import React, { useState } from "react";

const ProfileFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Completed a house wiring job today ⚡",
      likes: 3,
      comments: ["Great work!", "Nice job 👏"],
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  // ➕ ADD POST
  const handlePost = () => {
    if (!newPost.trim()) return;

    const newItem = {
      id: Date.now(),
      text: newPost,
      likes: 0,
      comments: [],
    };

    setPosts([newItem, ...posts]);
    setNewPost("");
  };

  // 👍 LIKE POST
  const handleLike = (id) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  // 💬 ADD COMMENT
  const handleComment = (id) => {
    const comment = commentInputs[id];
    if (!comment) return;

    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, comments: [...p.comments, comment] }
        : p
    ));

    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  return (
    <div className="space-y-6">

      {/* CREATE POST */}
      <div className="bg-white p-4 rounded-xl shadow">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something about your work..."
          className="w-full border p-2 rounded-lg"
        />

        <button
          onClick={handlePost}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Post
        </button>
      </div>

      {/* POSTS */}
      {posts.map(post => (
        <div key={post.id} className="bg-white p-4 rounded-xl shadow">

          <p className="text-gray-800">{post.text}</p>

          {/* ACTIONS */}
          <div className="flex justify-between mt-3 text-sm text-gray-500">
            <button onClick={() => handleLike(post.id)}>
              👍 Like ({post.likes})
            </button>
          </div>

          {/* COMMENTS */}
          <div className="mt-3 space-y-2">
            {post.comments.map((c, i) => (
              <p key={i} className="text-sm bg-gray-100 p-2 rounded">
                {c}
              </p>
            ))}
          </div>

          {/* ADD COMMENT */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={commentInputs[post.id] || ""}
              onChange={(e) =>
                setCommentInputs({
                  ...commentInputs,
                  [post.id]: e.target.value,
                })
              }
              placeholder="Write a comment..."
              className="flex-1 border p-2 rounded"
            />

            <button
              onClick={() => handleComment(post.id)}
              className="bg-gray-800 text-white px-3 rounded"
            >
              Send
            </button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default ProfileFeed;