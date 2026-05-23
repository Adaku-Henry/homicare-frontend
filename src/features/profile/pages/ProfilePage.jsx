import React, { useState } from "react";

function ProfilePage() {

  const currentUser = {
    id: 1,
    name: "John Cleaner",
    role: "Service Provider",
    bio: "Professional cleaner with 5+ years experience in home & office cleaning.",
    skills: ["Cleaning", "Laundry", "Sanitization"],
    experience: "5 Years",
    followers: 120,
    following: 45,
    isFollowing: false
  };

  // ================= POSTS =================
  const [posts] = useState([
    { id: 1, content: "Available for weekend cleaning services!" },
    { id: 2, content: "Just completed a deep cleaning project 💪" }
  ]);

  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div style={container}>

      {/* ================= HEADER ================= */}
      <div style={header}>

        <div style={avatar}>
          {currentUser.name.charAt(0)}
        </div>

        <div style={{ flex: 1 }}>
          <h2>{currentUser.name}</h2>
          <p style={{ color: "gray" }}>{currentUser.role}</p>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            style={followBtn}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>

      </div>

      {/* ================= STATS ================= */}
      <div style={statsBox}>
        <div>Followers: {currentUser.followers}</div>
        <div>Following: {currentUser.following}</div>
        <div>Posts: {posts.length}</div>
      </div>

      {/* ================= ABOUT ================= */}
      <div style={section}>
        <h3>About</h3>
        <p>{currentUser.bio}</p>
      </div>

      {/* ================= SKILLS ================= */}
      <div style={section}>
        <h3>Skills</h3>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {currentUser.skills.map((skill, index) => (
            <span key={index} style={skillTag}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ================= POSTS ================= */}
      <div style={section}>
        <h3>Posts</h3>

        {posts.map(post => (
          <div key={post.id} style={postCard}>
            {post.content}
          </div>
        ))}
      </div>

    </div>
  );
}

// ================= STYLES =================
const container = {
  maxWidth: 800,
  margin: "auto",
  padding: 20
};

const header = {
  display: "flex",
  gap: 20,
  alignItems: "center",
  background: "#f9fafb",
  padding: 20,
  borderRadius: 10
};

const avatar = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "#111827",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24
};

const followBtn = {
  marginTop: 10,
  padding: "8px 12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 6
};

const statsBox = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: 20,
  padding: 15,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const section = {
  marginTop: 25,
  padding: 15,
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const skillTag = {
  padding: "5px 10px",
  background: "#e5e7eb",
  borderRadius: 20,
  fontSize: 12
};

const postCard = {
  padding: 10,
  borderBottom: "1px solid #eee"
};

export default ProfilePage;