
import React from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../css/AdminProfile.css";
const AdminProfile = () => {
    const { user } = useAuth();
    if (!user) {
        return <h3>Please login again.</h3>;
    }
    const initial = user.name
        ? user.name.charAt(0).toUpperCase()
        : "A";
    return (
        <div className="admin-profile-page">
            <AdminSidebar />
            <main className="admin-profile-main">
                <h1>My Profile</h1>
                <p className="admin-profile-subtitle">
                    View your admin account information.
                </p>
                <div className="admin-profile-card">
                    <div className="admin-profile-header">
                        <div className="admin-profile-avatar">
                            {initial}
                        </div>
                        <div className="admin-profile-header-info">
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <span className="admin-profile-role">
                                {user.role}
                            </span>
                        </div>
                    </div>
                    <div className="admin-profile-divider"></div>
                    <div className="admin-profile-section">
                        <h3>Personal Information</h3>
                        <div className="admin-profile-details">
                            <div className="admin-profile-detail-item">
                                <label>Full Name</label>
                                <p>{user.name}</p>
                            </div>
                            <div className="admin-profile-detail-item">
                                <label>Email Address</label>
                                <p>{user.email}</p>
                            </div>
                            <div className="admin-profile-detail-item">
                                <label>Account Role</label>
                                <p className="admin-profile-role-text">
                                    {user.role}
                                </p>
                            </div>
                            <div className="admin-profile-detail-item">
                                <label>Admin ID</label>
                                <p>{user.id}</p>
                            </div>
                        </div>
                    </div>
                    <div className="admin-profile-divider"></div>
                    <div className="admin-profile-account-info">
                        <div className="admin-profile-account-icon">✓</div>
                        <div>
                            <h4>Account Information</h4>
                            <p>
                                Your administrator account is currently logged in.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminProfile;
