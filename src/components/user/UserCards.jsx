
import React from "react";
import "../../css/UserCards.css";

const UserCards=({ transactions=[] }) => {

    const totalIncome=transactions
        .filter(item => item.type==="income")
        .reduce((total, item) => total+Number(item.amount), 0);

    const totalExpenses=transactions
        .filter(item => item.type==="expense")
        .reduce((total, item) => total+Number(item.amount), 0);

    const balance=totalIncome-totalExpenses;

    const formatAmount=(amount) => {
        return amount.toLocaleString("en-IN", {
            style: "currency",currency: "INR"
        });
    };

    const cards=[
        {
            title: "Total Balance",
            amount: formatAmount(balance),
            icon: "💰",
            color: "balance",
            description: "Your remaining balance"
        },
        {
            title: "Total Income",
            amount: formatAmount(totalIncome),
            icon: "📈",
            color: "income",
            description: "Your total income"
        },
        {
            title: "Total Expenses",
            amount: formatAmount(totalExpenses),
            icon: "💸",
            color: "expenses",
            description: "Your total expenses"
        }
    ];

    return (
        <div className="user-cards">

            {cards.map((card, index) => (

                <div
                    className={`user-card ${card.color}`}
                    key={index}
                >

                    <div className="user-card-top">
                        <div className="user-card-icon">
                            {card.icon}
                        </div>
                    </div>

                    <h3 className="user-card-title">
                        {card.title}
                    </h3>

                    <h2 className="user-card-amount">
                        {card.amount}
                    </h2>

                    <p className="user-card-description">
                        {card.description}
                    </p>

                </div>

            ))}

        </div>
    );
};

export default UserCards;
