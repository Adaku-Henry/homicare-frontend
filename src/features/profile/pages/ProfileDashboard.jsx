import React from "react";
import { Link } from "react-router-dom";
import { useProfileContext } from "../context/ProfileContext";

import ProfileHeader from "../components/ProfileHeader";
import ProfileAvatar from "../components/ProfileAvatar";

const ProfileDashboard = () => {
  const { profile } = useProfileContext();

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* HEADER */}
      <ProfileHeader />

      {/* BODY */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white p-4 rounded-xl shadow">

          {/* AVATAR */}
          <ProfileAvatar />

          {/* USER INFO */}
          <div className="mt-3">
            <h2 className="text-lg font-bold">
              {profile?.fullName || "No Name"}
            </h2>

            <p className="text-sm text-gray-500">
              {profile?.email || "No email"}
            </p>

            <p className="text-sm text-gray-500">
              {profile?.phone || "No phone"}
            </p>
          </div>

          {/* NAV LINKS */}
          <div className="mt-5 space-y-2">

            <Link className="block text-blue-600" to="/profile/edit">
              Edit Profile
            </Link>

            <Link className="block text-blue-600" to="/profile/address">
              Manage Address
            </Link>

            <Link className="block text-blue-600" to="/profile/security">
              Security Settings
            </Link>

            <Link className="block text-blue-600" to="/profile/notifications">
              Notifications
            </Link>

            <Link className="block text-blue-600" to="/profile/preferences">
              Preferences
            </Link>

            <Link className="block text-red-500" to="/profile/close">
              Close Account
            </Link>

          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="md:col-span-2 bg-white p-4 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Profile Overview
          </h2>

          {/* PROFILE DATA */}
          <div className="grid grid-cols-2 gap-4">

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">Full Name</p>
              <h3 className="text-lg font-bold">
                {profile?.fullName || "-"}
              </h3>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">Email</p>
              <h3 className="text-lg font-bold">
                {profile?.email || "-"}
              </h3>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">Phone</p>
              <h3 className="text-lg font-bold">
                {profile?.phone || "-"}
              </h3>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-500">Avatar</p>
              <h3 className="text-lg font-bold">
                {profile?.avatar ? "Uploaded" : "Not set"}
              </h3>
            </div>

          </div>

          {/* EXTRA DETAILS (from EditProfile) */}
          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="p-3 bg-blue-50 rounded">
              <p className="text-sm text-gray-500">Skills</p>
              <h3 className="text-lg font-bold">
                {profile?.skills || "--"}
              </h3>
            </div>

            <div className="p-3 bg-green-50 rounded">
              <p className="text-sm text-gray-500">Experience</p>
              <h3 className="text-lg font-bold">
                {profile?.experience || "--"}
              </h3>
            </div>

            <div className="p-3 bg-yellow-50 rounded">
              <p className="text-sm text-gray-500">Rate</p>
              <h3 className="text-lg font-bold">
                {profile?.rate ? `UGX ${profile.rate}` : "--"}
              </h3>
            </div>

            <div className="p-3 bg-purple-50 rounded">
              <p className="text-sm text-gray-500">Availability</p>
              <h3 className="text-lg font-bold">
                {profile?.availability || "--"}
              </h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfileDashboard;