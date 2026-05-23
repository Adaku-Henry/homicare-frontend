import { useState } from "react";

const ProfileAvatar = () => {
  const [avatar, setAvatar] = useState("");

  return (
    <div>
      <img
        src={avatar || "/default.png"}
        className="w-20 h-20 rounded-full"
        alt="avatar"
      />

      <input
        type="file"
        onChange={(e) =>
          setAvatar(URL.createObjectURL(e.target.files[0]))
        }
      />
    </div>
  );
};

export default ProfileAvatar;