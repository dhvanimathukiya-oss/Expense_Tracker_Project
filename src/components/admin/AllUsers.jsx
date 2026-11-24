
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../css/AllUser.css";

const AllUser=() => {

    const [users, setUsers]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(() => {

        const fetchUsers=async () => {

            try {

                const res=await fetch(
                    "http://localhost:3000/users"
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }

                const result=await res.json();

                setUsers(result);

                console.log("All Users:", result);

            } catch (error) {

                console.log("Error:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchUsers();

    }, []);

    return (

        <div className="all-user-page">

            <AdminSidebar />

            <main className="all-user-main">

                <h1>All Users</h1>

                <p className="all-user-subtitle">
                    View all registered users.
                </p>

                <div className="all-user-card">

                    <div className="all-user-header">

                        <h2>User Details</h2>

                        <span className="user-count">
                            Total Users: {users.filter(
                                item => item.role==="user"
                            ).length}
                        </span>

                    </div>

                    {loading? (

                        <h3>Loading Users...</h3>

                    ):users.length===0? (

                        <p className="no-users">
                            No users found.
                        </p>

                    ):(

                        <div className="all-user-table-wrapper">

                            <table className="all-user-table">

                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>User ID</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {users.map((item, index) => (

                                        <tr key={item.id}>

                                            <td>{index+1}</td>

                                            <td>{item.name}</td>

                                            <td>{item.email}</td>

                                            <td>
                                                <span className={`user-role ${item.role}`}>
                                                    {item.role}
                                                </span>
                                            </td>

                                            <td>{item.id}</td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
};

export default AllUser;
