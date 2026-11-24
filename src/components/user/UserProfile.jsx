
import React from "react";
import { useAuth } from "../../context/AuthContext";
import UserSidebar from "./UserSidebar";
import "../../css/UserProfile.css";

const UserProfile=() => {

  const { user }=useAuth();

  if (!user) {
    return <h3>Please login again.</h3>;
  }

  const initial=user.name
    ? user.name.charAt(0).toUpperCase()
    :"U";

  return (
    <div className="user-profile-page">

      <UserSidebar />

      <main className="user-profile-main">

        <h1>My Profile</h1>

        <p className="profile-subtitle">
          View your personal account information.
        </p>

        <div className="profile-card">

          {/* Profile Header */}
          <div className="profile-header">

            <div className="profile-avatar">
              {initial}
            </div>

            <div className="profile-header-info">

              <h2>{user.name}</h2>

              <p>{user.email}</p>

              <span className="profile-role">
                {user.role}
              </span>

            </div>

          </div>

          <div className="profile-divider"></div>

          {/* Personal Information */}
          <div className="profile-section">

            <h3>Personal Information</h3>

            <div className="profile-details">

              <div className="profile-detail-item">
                <label>Full Name</label>
                <p>{user.name}</p>
              </div>

              <div className="profile-detail-item">
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>

              <div className="profile-detail-item">
                <label>Account Role</label>
                <p className="profile-role-text">
                  {user.role}
                </p>
              </div>

              <div className="profile-detail-item">
                <label>User ID</label>
                <p>{user.id}</p>
              </div>

            </div>

          </div>

          <div className="profile-divider"></div>

          {/* Account Information */}
          <div className="profile-account-info">

            <div className="profile-account-icon">
              ✓
            </div>

            <div>
              <h4>Account Information</h4>
              <p>
                Your account is currently logged in.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default UserProfile;
