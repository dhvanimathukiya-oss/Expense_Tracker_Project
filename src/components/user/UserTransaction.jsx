
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserSidebar from "../../components/user/UserSidebar";
import "../../css/UserTransaction.css";

const UserTransaction=() => {

  const { user }=useAuth();

  const [transactions, setTransactions]=useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {

    const fetchTransactions=async () => { 

      try {

        const res=await fetch(
          "http://localhost:3000/expenses"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const result=await res.json();

        const filteredData=result.filter(
          item => String(item.userId)===String(user.id)
        );

        setTransactions(filteredData);

        console.log("Logged User:", user.name);
        console.log("Transactions:", filteredData);

      } catch (error) {

        console.log("Error:", error);

      } finally {

        setLoading(false);

      }
    };

    if (user?.id) {
      fetchTransactions();
    } else {
      setLoading(false);
    }

  }, [user?.id]);

  if (!user) {
    return <h3>Please login again.</h3>;
  }

  return (

    <div className="user-transaction-page">

      <UserSidebar />

      <main className="user-transaction-main">

        <h1>My Transactions</h1>

        <p className="user-transaction-subtitle">
          View your income and expenses.
        </p>

        <div className="transaction-table-card">

          <h2>Transaction History</h2>

          {loading? (

            <h3>Loading...</h3>

          ):transactions.length===0? (

            <p className="no-transactions">
              No transactions found.
            </p>

          ):(

            <div className="transaction-table-wrapper">

              <table className="user-transaction-table">

                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {transactions.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index+1}</td>

                      <td>{item.title}</td>

                      <td>
                        ₹{Number(item.amount).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <span className={`transaction-type ${item.type}`}>
                          {item.type==="income"
                            ? "Income"
                            :"Expense"}
                        </span>
                      </td>

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

export default UserTransaction;
