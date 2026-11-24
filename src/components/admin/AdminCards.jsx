import React from "react";
import "../../css/AdminCards.css";

const AdminCards=({ users, transactions }) => {

    const totalUsers=users.filter(
        user => user.role==="user"
    ).length;

    const totalIncome=transactions
        .filter(item => item.type==="income")
        .reduce((total, item) => total+Number(item.amount), 0);

    const totalExpense=transactions
        .filter(item => item.type==="expense")
        .reduce((total, item) => total+Number(item.amount), 0);

    const totalBalance=totalIncome-totalExpense;

    const formatAmount=(amount) => {
        return amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        });
    };

    const cards=[
        {
            title: "Total Users",
            amount: totalUsers,
            icon: "👥",
            color: "users",
            description: "Registered users"
        },
        {
            title: "Total Income",
            amount: formatAmount(totalIncome),
            icon: "📈",
            color: "income",
            description: "Income from all users"
        },
        {
            title: "Total Expenses",
            amount: formatAmount(totalExpense),
            icon: "💸",
            color: "expenses",
            description: "Expenses from all users"
        },
        {
            title: "Total Balance",
            amount: formatAmount(totalBalance),
            icon: "💰",
            color: "balance",
            description: "Remaining total balance"
        }
    ];

    return (
        <div className="admin-cards">

            {cards.map((card, index) => (
                <div className={`admin-card ${card.color}`} key={index}>

                    <div className="admin-card-top">
                        <div className="admin-card-icon">
                            {card.icon}
                        </div>

                    </div>

                    <h3 className="admin-card-title">
                        {card.title}
                    </h3>

                    <h2 className="admin-card-amount">
                        {card.amount}
                    </h2>

                    <p className="admin-card-description">
                        {card.description}
                    </p>

                </div>
            ))}

        </div>
    );
};

export default AdminCards;