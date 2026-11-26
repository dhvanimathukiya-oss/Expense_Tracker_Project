
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../css/UserSidebar.css";

const UserSidebar=() => {

    const navigate=useNavigate();
    const { user, logout }=useAuth();

    const handleLogout=() => {
        logout();
        navigate("/", { replace: true });
    };

    const menuItems=[
        { name: "Dashboard", path: "/userdash", icon: "🏠" },
        { name: "My Transactions", path: "/usertransaction", icon: "💸" },
        { name: "Add Transaction", path: "/addtransaction", icon: "➕" },
        { name: "My Profile", path: "/userprofile", icon: "👤" }
    ];

    return (
        <aside className="admin-sidebar">

            <div className="admin-sidebar-logo">
                <div className="admin-logo-icon">₹</div>

                <div>
                    <h2>{user?.name}</h2>
                    <p>User Panel</p>
                </div>
            </div>

            <div className="admin-sidebar-menu">
                <p className="admin-menu-title">MY WORKSPACE</p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `admin-menu-link ${isActive? "active":""}`
                        }
                    >
                        <span className="admin-menu-icon">
                            {item.icon}
                        </span>

                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>

            <div className="admin-sidebar-bottom">

                <div className="admin-profile">
                    <div className="admin-avatar">U</div>

                    <div>
                        <h4>User Account</h4>
                        <p>Personal Finance</p>
                    </div>
                </div>

                <button
                    type="button"
                    className="admin-logout-btn"
                    onClick={handleLogout}
                >
                    <span>↪</span> Logout
                </button>

            </div>

        </aside>
    );
};

export default UserSidebar;
