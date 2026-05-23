const ProfileHeader = ({ profile }) => {
  return (
    <div>
      <img
        src={profile.profile_image || "/default.png"}
        alt="avatar"
        width={80}
      />
      <h2>{profile.full_name}</h2>
      <p>{profile.bio}</p>
    </div>
  );
};

export default ProfileHeader;