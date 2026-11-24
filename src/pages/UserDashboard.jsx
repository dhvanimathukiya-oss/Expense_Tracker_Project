
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserSidebar from "../components/user/UserSidebar";
import UserCards from "../components/user/UserCards";

const UserDashboard=() => {

  const { user }=useAuth();

  const [transactions, setTransactions]=useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {

    const fetchExpenses=async () => {
      try {
        const res=await fetch(
          "http://localhost:3000/expenses"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const result=await res.json();

        const filteredData=result.filter(
          item => String(item.userId)===String(user.id)
        );

        setTransactions(filteredData);

        console.log("Logged User:", user);
        console.log("User Transactions:", filteredData);

      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchExpenses();
    } else {
      setLoading(false);
    }

  }, [user?.id]);

  if (!user) {
    return <h3>Please login again.</h3>;
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh"
    }}>

      <UserSidebar />

      <main style={{
        flex: 1,
        padding: "30px",
        background: "#f8fafc",
        minWidth: 0
      }}>

        <h1>User Dashboard</h1>

        <p>Welcome, {user.name}</p>

        {loading? (
          <h3>Loading...</h3>
        ):(
          <UserCards transactions={transactions} />
        )}

      </main>

    </div>
  );
};

export default UserDashboard;
