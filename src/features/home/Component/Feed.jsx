import React, { useState } from "react";

// ================= COMPONENTS =================
import HeroSection from ".//HeroSection";
import ServiceCategories from ".//ServiceCategories";
import FeaturedProviders from ".//FeaturedProviders";
import HowItWorks from ".//HowItWorks";
import Testimonials from ".//Testimonials";

function Home() {

  const currentUser = {
    name: "You",
    role: "User"
  };

  // ================= POSTS =================
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "John Cleaner",
      role: "Professional Cleaner",
      content: "Just finished a deep cleaning service in Kampala.",
      likes: 10,
      comments: [
        { id: 1, user: "Sarah", text: "Great work!" }
      ],
      showComments: false
    },
    {
      id: 2,
      name: "Electric Pro",
      role: "Electrician",
      content: "Available for weekend electrical repairs.",
      likes: 5,
      comments: [],
      showComments: false
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  // ================= ADD POST =================
  const addPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      name: currentUser.name,
      role: currentUser.role,
      content: newPost,
      likes: 0,
      comments: [],
      showComments: false
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  // ================= LIKE =================
  const likePost = (id) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  // ================= TOGGLE COMMENTS =================
  const toggleComments = (id) => {
    setPosts(posts.map(p =>
      p.id === id ? { ...p, showComments: !p.showComments } : p
    ));
  };

  // ================= ADD COMMENT =================
  const addComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: Date.now(),
              user: currentUser.name,
              text
            }
          ]
        };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>

      {/* HERO */}
      <HeroSection />

      {/* QUICK ACTIONS */}
      <div style={{ marginTop: "30px" }}>
        <h2>Quick Actions</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => window.location.href = "/services"} style={btnStyle}>
            Services
          </button>

          <button onClick={() => window.location.href = "/providers"} style={btnStyle}>
            Providers
          </button>

          <button onClick={() => window.location.href = "/bookings"} style={btnStyle}>
            Bookings
          </button>

          <button onClick={() => window.location.href = "/wallet"} style={btnStyle}>
            Wallet
          </button>
        </div>
      </div>

      {/* CREATE POST */}
      <div style={postBox}>
        <h3>Create Post</h3>

        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's happening?"
          style={textarea}
        />

        <button onClick={addPost} style={postBtn}>
          Post
        </button>
      </div>

      {/* FEED */}
      <div style={{ marginTop: "40px" }}>
        <h2>Community Feed</h2>

        {posts.map(post => (
          <div key={post.id} style={card}>

            <div>
              <strong>{post.name}</strong>
              <p style={{ margin: 0, fontSize: 12, color: "gray" }}>
                {post.role}
              </p>
            </div>

            <p style={{ marginTop: 10 }}>{post.content}</p>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => likePost(post.id)} style={btnSmall}>
                👍 {post.likes}
              </button>

              <button onClick={() => toggleComments(post.id)} style={btnSmall}>
                💬 Comments ({post.comments.length})
              </button>
            </div>

            {/* COMMENTS SECTION */}
            {post.showComments && (
              <div style={{ marginTop: 10 }}>

                {/* COMMENT LIST */}
                {post.comments.map(c => (
                  <div key={c.id} style={commentBox}>
                    <strong>{c.user}:</strong> {c.text}
                  </div>
                ))}

                {/* ADD COMMENT */}
                <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
                  <input
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({
                        ...commentInputs,
                        [post.id]: e.target.value
                      })
                    }
                    placeholder="Write a comment..."
                    style={input}
                  />

                  <button onClick={() => addComment(post.id)} style={btnSmall}>
                    Send
                  </button>
                </div>

              </div>
            )}

          </div>
        ))}
      </div>

      {/* OTHER SECTIONS */}
      <ServiceCategories />
      <FeaturedProviders />
      <HowItWorks />
      <Testimonials />

    </div>
  );
}

// ================= STYLES =================
const card = {
  background: "#fff",
  padding: 15,
  marginBottom: 15,
  borderRadius: 10,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const btnStyle = {
  padding: "10px",
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: 6
};

const btnSmall = {
  padding: "6px 10px",
  background: "#eee",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
};

const postBox = {
  marginTop: 20,
  padding: 15,
  background: "#f9fafb",
  borderRadius: 10
};

const textarea = {
  width: "100%",
  height: 70,
  marginTop: 10
};

const input = {
  flex: 1,
  padding: 8
};

const commentBox = {
  background: "#f3f4f6",
  padding: 6,
  marginTop: 5,
  borderRadius: 6
};

export default Home;