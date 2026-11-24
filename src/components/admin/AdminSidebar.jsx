
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../css/Adminsidebar.css"

const AdminSidebar=() => {
    const navigate=useNavigate();
    const { user,setUser }=useAuth();

    const handleLogout=() => {
        localStorage.removeItem("loginuser");

        if (setUser) {
            setUser(null);
        }

        navigate("/login");
    };

    const menuItems=[
        { name: "Dashboard", path: "/admindash", icon: "🏠" },
        { name: "All Users", path: "/alluser", icon: "👥" },
        { name: "All Transactions", path: "/alltransaction", icon: "💸" },
        { name: "Profile", path: "/adminprofile", icon: "📊" },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-logo">
                <div className="admin-logo-icon">₹</div>
                <div>
                    <h2>{user.name}</h2>
                    <p>Admin Panel</p>
                </div>
            </div>

            <div className="admin-sidebar-menu">
                <p className="admin-menu-title">MAIN MENU</p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `admin-menu-link ${isActive? "active":""}`
                        }
                    >
                        <span className="admin-menu-icon">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>

            <div className="admin-sidebar-bottom">
                <div className="admin-profile">
                    <div className="admin-avatar">A</div>
                    <div>
                        <h4>Administrator</h4>
                        <p>Admin Account</p>
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

export default AdminSidebar;