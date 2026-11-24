
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "../../css/AllTransaction.css";

const AllTransaction=() => {

    const [users, setUsers]=useState([]);
    const [transactions, setTransactions]=useState([]);
    const [loading, setLoading]=useState(true);
    const [deletingId, setDeletingId]=useState(null);

    useEffect(() => {

        const fetchData=async () => {

            try {

                // Fetch Users
                const userRes=await fetch(
                    "http://localhost:3000/users"
                );

                if (!userRes.ok) {
                    throw new Error("Failed to fetch users");
                }

                const userResult=await userRes.json();
                setUsers(userResult);

                // Fetch All Transactions
                const expenseRes=await fetch(
                    "http://localhost:3000/expenses"
                );

                if (!expenseRes.ok) {
                    throw new Error("Failed to fetch transactions");
                }

                const expenseResult=await expenseRes.json();
                setTransactions(expenseResult);

            } catch (error) {

                console.log("Error:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchData();

    }, []);

    // Find User Name
    const getUserName=(userId) => {

        const user=users.find(
            item => String(item.id)===String(userId)
        );

        return user? user.name:"Unknown User";
    };

    // Format Amount
    const formatAmount=(amount) => {

        return Number(amount).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        });

    };

    // Delete Transaction
    const handleDelete=async (id) => {

        const confirmDelete=window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setDeletingId(id);

            const res=await fetch(
                `http://localhost:3000/expenses/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete transaction");
            }

            // Remove deleted transaction from state
            setTransactions(prev =>
                prev.filter(item => String(item.id)!==String(id))
            );

            alert("Transaction deleted successfully!");

        } catch (error) {

            console.log("Delete Error:", error);
            alert("Unable to delete transaction.");

        } finally {

            setDeletingId(null);

        }
    };

    return (
        <div className="all-transaction-page">
            <AdminSidebar />
            <main className="all-transaction-main">
                <h1>All Transactions</h1>
                <p className="all-transaction-subtitle">
                    View and manage all users' income and expenses.
                </p>

                <div className="all-transaction-card">

                    <div className="all-transaction-header">

                        <h2>Transaction History</h2>

                        <span className="transaction-count">
                            Total Transactions: {transactions.length}
                        </span>

                    </div>

                    {loading? (<h3>Loading Transactions...</h3>):
                        transactions.length===0? (
                        <p className="no-all-transactions">
                            No transactions found.
                        </p>
                    ):
                    (
                        <div className="all-transaction-table-wrapper">
                            <table className="all-transaction-table">
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>User Name</th>
                                        <th>Title</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index+1}</td>
                                            <td>
                                                {getUserName(item.userId)}
                                            </td>
                                            <td>{item.title}</td>
                                            <td className={`all-amount ${item.type}`}>
                                                {formatAmount(item.amount)}
                                            </td>
                                            <td>
                                                <span className={`all-status ${item.type}`}>
                                                    {item.type==="income"
                                                        ? "Income"
                                                        :"Expense"}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="delete-transaction-btn"
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deletingId===item.id}
                                                >
                                                    {deletingId===item.id
                                                        ? "Deleting..."
                                                        :"Delete"}
                                                </button>
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

export default AllTransaction;
