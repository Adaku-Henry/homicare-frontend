import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../context/ProfileContext";
import { getSocket } from "../../chat/socket/socket";

const socket = getSocket();

/* =========================
   SAFE FALLBACK PROFILE
========================= */
const emptyProfile = {
  id: "",
  fullName: "Unknown User",
  username: "user",
  avatar: "https://i.pravatar.cc/300",
  coverPhoto:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  bio: "No bio available",
  role: "User",
  verified: false,
  online: false,
  followers: 0,
  followingCount: 0,
  likes: 0,
  wallet: 0,
  skills: [],
  services: [],
  posts: [],
  lastSeen: "recently",
};

const ProfileHeader = () => {
  const navigate = useNavigate();
  const { profile, loading } = useProfileContext();

  const safeProfile = profile || emptyProfile;

  /* =========================
     UI STATE
  ========================= */
  const [activeTab, setActiveTab] = useState("posts");
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);

  const [followersCount, setFollowersCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);

  const [isTyping, setIsTyping] = useState(false);
  const [showMore, setShowMore] = useState(false);

  /* =========================
     INITIALIZE STATS
  ========================= */
  useEffect(() => {
    setFollowersCount(safeProfile.followers || 0);
    setLikesCount(Math.floor(Math.random() * 5000));
    setViewsCount(Math.floor(Math.random() * 20000));
  }, [safeProfile.followers]);

  /* =========================
     LIVE SOCKET UPDATES
  ========================= */
  useEffect(() => {
    if (!socket) return;

    const handler = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "follow_update") {
          setFollowersCount(data.data.followers || 0);
        }

        if (data.event === "profile_like") {
          setLikesCount(data.data.likes || 0);
        }

        if (data.event === "profile_typing") {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1500);
        }
      } catch (err) {}
    };

    socket.addEventListener("message", handler);

    return () => socket.removeEventListener("message", handler);
  }, []);

  /* =========================
     ACTIONS (SOCIAL CORE)
  ========================= */
  const handleFollow = useCallback(() => {
    const next = !following;
    setFollowing(next);

    setFollowersCount((p) =>
      next ? p + 1 : Math.max(0, p - 1)
    );

    socket?.send(
      JSON.stringify({
        event: "follow_user",
        data: { userId: safeProfile.id, following: next },
      })
    );
  }, [following, safeProfile.id]);

  const handleLike = useCallback(() => {
    const next = !liked;
    setLiked(next);

    setLikesCount((p) =>
      next ? p + 1 : Math.max(0, p - 1)
    );

    socket?.send(
      JSON.stringify({
        event: "profile_like",
        data: { userId: safeProfile.id },
      })
    );
  }, [liked, safeProfile.id]);

  const openChat = () => navigate(`/chat/${safeProfile.id}`);

  const shareProfile = async () => {
    try {
      await navigator.share({
        title: safeProfile.fullName,
        text: safeProfile.bio,
        url: window.location.href,
      });
    } catch {}
  };

  /* =========================
     FORMATTED WALLET
  ========================= */
  const wallet = useMemo(() => {
    return Number(safeProfile.wallet || 0).toLocaleString();
  }, [safeProfile.wallet]);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="tiktok-loader">
        Loading profile...
      </div>
    );
  }

  /* =========================
     UI RENDER
  ========================= */
  return (
    <div className="tiktokProfileWrapper">

      {/* ================= COVER HERO ================= */}
      <div className="tiktokCover">
        <img
          src={safeProfile.coverPhoto}
          alt="cover"
          className="tiktokCoverImg"
        />

        <div className="tiktokTopActions">
          <button onClick={shareProfile}>Share</button>
          <button onClick={handleLike}>
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>
        </div>
      </div>

      {/* ================= FLOATING AVATAR ================= */}
      <div className="tiktokAvatarSection">
        <img
          src={safeProfile.avatar}
          alt="avatar"
          className="tiktokAvatar"
        />

        <div className={`onlineDot ${safeProfile.online ? "on" : "off"}`} />

        <h2>
          {safeProfile.fullName}
          {safeProfile.verified && (
            <span className="verified">✔</span>
          )}
        </h2>

        <p className="username">@{safeProfile.username}</p>

        <p className="bio">{safeProfile.bio}</p>

        {isTyping && <p className="typing">typing...</p>}
      </div>

      {/* ================= STATS ROW ================= */}
      <div className="tiktokStats">
        <div>
          <h3>{followersCount}</h3>
          <p>Followers</p>
        </div>

        <div>
          <h3>{likesCount}</h3>
          <p>Likes</p>
        </div>

        <div>
          <h3>{viewsCount}</h3>
          <p>Views</p>
        </div>

        <div>
          <h3>UGX {wallet}</h3>
          <p>Wallet</p>
        </div>
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="tiktokActions">
        <button className="primary" onClick={handleFollow}>
          {following ? "Following" : "Follow"}
        </button>

        <button onClick={openChat}>Message</button>

        <button onClick={handleLike}>
          {liked ? "Liked" : "Like"}
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="tiktokTabs">
        <button onClick={() => setActiveTab("posts")}>Posts</button>
        <button onClick={() => setActiveTab("services")}>Services</button>
        <button onClick={() => setActiveTab("about")}>About</button>
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="tiktokContent">

        {activeTab === "posts" && (
          <div className="grid">
            {(safeProfile.posts || []).map((p, i) => (
              <div key={i} className="card">
                <h4>{p.title || "Post"}</h4>
                <p>{p.content || ""}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid">
            {(safeProfile.services || []).map((s, i) => (
              <div key={i} className="card">
                <h4>{s.name}</h4>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="aboutCard">
            <p><b>Role:</b> {safeProfile.role}</p>
            <p><b>Email:</b> {safeProfile.email}</p>
            <p><b>Location:</b> {safeProfile.location}</p>
            <p><b>Last Seen:</b> {safeProfile.lastSeen}</p>
          </div>
        )}

      </div>

      {/* ================= EXPAND ================= */}
      <button
        className="showMoreBtn"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Hide Details" : "Show More"}
      </button>

      {showMore && (
        <div className="extraGrid">
          <div>Skills: {(safeProfile.skills || []).join(", ")}</div>
        </div>
      )}

    </div>
  );
};

export default ProfileHeader;