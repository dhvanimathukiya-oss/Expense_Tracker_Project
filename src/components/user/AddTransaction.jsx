
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserSidebar from "../../components/user/UserSidebar";
import "../../css/AddTransaction.css";

const AddTransaction=() => {

  const { user }=useAuth();

  const [formData, setFormData]=useState({
    type: "expense",
    title: "",
    amount: ""
  });

  const [message, setMessage]=useState("");
  const [loading, setLoading]=useState(false);

  const handleChange=(e) => {
    const { name, value }=e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit=async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setMessage("Please login again.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const transaction={
        userId: user.id,
        type: formData.type,
        title: formData.title.trim(),
        amount: String(formData.amount)
      };

      const res=await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
      });

      if (!res.ok) {
        throw new Error("Transaction not added");
      }

      setMessage(
        formData.type==="income"
          ? "Income added successfully!"
          :"Expense added successfully!"
      );

      setFormData({
        type: "expense",
        title: "",
        amount: ""
      });

    } catch (error) {
      console.log("Error:", error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-transaction-page">

      <UserSidebar />

      <main className="add-transaction-main">

        <h1>Add Transaction</h1>

        <p className="add-transaction-subtitle">
          Manage your income and expenses.
        </p>

        <div className="add-transaction-card">

          <h2>Transaction Details</h2>

          <form onSubmit={handleSubmit}>

            <div className="transaction-form-group">
              <label>Transaction Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="transaction-input"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="transaction-form-group">
              <label>Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter transaction title"
                value={formData.title}
                onChange={handleChange}
                className="transaction-input"
                required
              />
            </div>

            <div className="transaction-form-group">
              <label>Amount (₹)</label>

              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                className="transaction-input"
                required
              />
            </div>

            {message&&(
              <p className={`transaction-message ${message.includes("successfully")
                  ? "success"
                  :"error"
                }`}>
                {message}
              </p>
            )}

<button
              type="submit"
              className="transaction-submit-btn"
              disabled={loading}
            >
              {loading? "Submitting...":"Submit"}
            </button>

          </form>

        </div>

      </main>

    </div>
  );
};

export default AddTransaction;
