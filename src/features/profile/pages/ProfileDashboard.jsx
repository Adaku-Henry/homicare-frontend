import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { Link, useNavigate } from "react-router-dom";
import { useProfileContext } from "../context/ProfileContext";

import ProfileHeader from "../components/ProfileHeader";
import ProfileAvatar from "../components/ProfileAvatar";

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const { profile, loading } = useProfileContext();

  // =========================
  // STATES (ONLY ACTIVE ONES)
  // =========================
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const [notifications] = useState([
    { id: 1, text: "Profile viewed by 12 users", time: "2 mins ago" },
    { id: 2, text: "New booking request received", time: "10 mins ago" },
  ]);

  const [activities] = useState([
    "Updated profile photo",
    "Completed electrical repair",
    "Received 5-star rating",
    "Connected with new customer",
  ]);

  const [followers, setFollowers] = useState(
    profile?.followers || 0
  );

  const [profileViews, setProfileViews] = useState(124);

  const [isOnline, setIsOnline] = useState(
    profile?.online || false
  );

  const [themeDark, setThemeDark] = useState(true);

  // =========================
  // SAFE PROFILE (MEMOIZED)
  // =========================
  const safeProfile = useMemo(() => {
    return {
      fullName: profile?.fullName || "Unknown User",
      email: profile?.email || "No email",
      phone: profile?.phone || "No phone",
      avatar: profile?.avatar || "https://i.pravatar.cc/200",
      coverPhoto:
        profile?.coverPhoto ||
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      bio: profile?.bio || "Welcome to HomiCare",
      city: profile?.city || "Kampala",
      address: profile?.address || "No address",
      rate: profile?.rate || "0",
      availability: profile?.availability || "Available",
      skills: profile?.skills || [],
      experience: profile?.experience || "No experience",
      role: profile?.role || "Customer",
      completedJobs: profile?.completedJobs || 0,
      rating: profile?.rating || "0.0",
      wallet: profile?.wallet || 0,
      username: profile?.username || "username",
    };
  }, [profile]);

  // =========================
  // PROFILE VIEW COUNTER (SIMULATED)
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setProfileViews((v) => v + 1);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // FILTERED ACTIVITY
  // =========================
  const filteredActivities = useMemo(() => {
    return activities.filter((a) =>
      a.toLowerCase().includes(search.toLowerCase())
    );
  }, [activities, search]);

  // =========================
  // FOLLOW ACTION
  // =========================
  const handleFollow = useCallback(() => {
    setFollowers((f) => f + 1);
  }, []);

  // =========================
  // ONLINE TOGGLE
  // =========================
  const toggleOnline = () => {
    setIsOnline((prev) => !prev);
  };

  // =========================
  // SHARE PROFILE
  // =========================
  const shareProfile = async () => {
    try {
      await navigator.share({
        title: "HomiCare Profile",
        text: safeProfile.fullName,
        url: window.location.href,
      });
    } catch (err) {
      console.log("Share not supported");
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className={`dashboardWrapper ${themeDark ? "darkTheme" : "lightTheme"}`}>

      {/* ================= COVER ================= */}
      <div className="dashboardCover">
        <img
          src={safeProfile.coverPhoto}
          alt="cover"
          className="dashboardCoverImage"
        />

        <div className="dashboardOverlay"></div>

        <div className="dashboardTopBar">
          <div>
            <h1>HomiCare Dashboard</h1>
            <p>Welcome {safeProfile.fullName}</p>
          </div>

          <div className="topActions">
            <button onClick={() => setThemeDark(!themeDark)}>
              {themeDark ? "☀ Light" : "🌙 Dark"}
            </button>

            <button onClick={shareProfile}>🔗 Share</button>
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <ProfileHeader />

      {/* ================= GRID ================= */}
      <div className="dashboardGrid">

        {/* LEFT */}
        <div className="dashboardSidebar">

          <div className="dashboardCard">
            <ProfileAvatar />

            <h2>{safeProfile.fullName}</h2>
            <p>@{safeProfile.username}</p>

            <p>{safeProfile.bio}</p>

            <div className="profileStats">
              <div>
                <h3>{followers}</h3>
                <p>Followers</p>
              </div>

              <div>
                <h3>{profileViews}</h3>
                <p>Views</p>
              </div>
            </div>

            <button onClick={() => navigate("/profile/edit")}>
              ✏ Edit Profile
            </button>

            <button onClick={handleFollow}>+ Follow</button>

            <button onClick={toggleOnline}>
              {isOnline ? "🟢 Online" : "⚫ Offline"}
            </button>
          </div>

          {/* LINKS */}
          <div className="dashboardCard">
            <h3>Quick Links</h3>

            <Link to="/profile/edit">Edit</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/bookings">Bookings</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dashboardContent">

          {/* TABS */}
          <div className="dashboardTabs">
            {["overview", "services", "activity", "analytics"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "activeTab" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="infoGrid">
              <div className="dashboardCard">Jobs: {safeProfile.completedJobs}</div>
              <div className="dashboardCard">Rating: {safeProfile.rating}</div>
              <div className="dashboardCard">Wallet: UGX {safeProfile.wallet}</div>
              <div className="dashboardCard">City: {safeProfile.city}</div>
            </div>
          )}

          {/* ACTIVITY */}
          {activeTab === "activity" && (
            <div className="dashboardCard">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search activity..."
              />

              {filteredActivities.map((a, i) => (
                <p key={i}>✔ {a}</p>
              ))}
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="dashboardCard">
              <h3>Analytics</h3>
              <p>Profile Views: {profileViews}</p>
              <p>Followers: {followers}</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default ProfileDashboard;