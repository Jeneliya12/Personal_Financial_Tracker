import React from "react";

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg relative">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
        Transaction History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2 px-4 text-sm sm:text-base">Description</th>
              <th className="py-2 px-4 text-sm sm:text-base">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="2" className="py-4 px-6 text-center text-gray-400">
                  <div className="flex items-center justify-center space-x-4 m-16">
                    <img
                      src="/transaction.jpg"
                      alt="No transactions"
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-full"
                    />
                    <span className="text-sm sm:text-base">
                      No transactions to display
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-600">
                  <td className="py-2 px-4 text-sm sm:text-base">
                    {transaction.description}
                  </td>
                  <td
                    className={`py-2 px-4 text-sm sm:text-base ${
                      transaction.amount < 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {transaction.amount < 0
                      ? `- $${Math.abs(transaction.amount).toLocaleString()}`
                      : `+ $${transaction.amount.toLocaleString()}`}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
