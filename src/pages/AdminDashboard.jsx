import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminCard from "../components/admin/AdminCards";
import { useAuth } from "../context/AuthContext";

const AdminDashboard=() => {

  const [users, setUsers]=useState([]);
  const [transactions, setTransactions]=useState([]);
  const {user,setUser} =useAuth()
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    const fetchData=async () => {
      try {
        // Fetch Users
        const userRes=await fetch(
          "http://localhost:3000/users"
        );
        const userResult=await userRes.json();
        if (!userRes.ok) {
          throw new Error("Failed to fetch users");
        }
        setUsers(userResult);
        // Fetch Expenses
        const expenseRes=await fetch(
          "http://localhost:3000/expenses"
        );
        const expenseResult=await expenseRes.json();
        if (!expenseRes.ok) {
          throw new Error("Failed to fetch expenses");
        }
        setTransactions(expenseResult);
        console.log("Users:", userResult);
        console.log("Expenses:", expenseResult);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f8fafc"
        }}
      >
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.name} !</p>
        {loading? (
          <h3>Loading...</h3>
        ):(
          <AdminCard
            users={users}
            transactions={transactions}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;