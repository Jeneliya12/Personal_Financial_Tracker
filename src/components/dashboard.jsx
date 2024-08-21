import Navbar from "./navbar";
import Header from "./header";

function Dashboard() {
  return (
    <div className="bg-black text-white w-full h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Left Column: Navigation */}
        <Navbar />

        {/* Right Column: Main Content */}
        <main className="flex-1 p-6 bg-black">
          <div className="mb-6">
            <h1 className="text-4xl font-bold">YOUR BALANCE IS: $18,000</h1>
          </div>
          <div className="flex items-center justify-center flex-col md:flex-row gap-8 mb-8">
            {/* Left Column within Main Content */}
            <div className="flex-1 max-w-lg bg-gray-800 p-8 rounded-lg flex flex-col items-center">
              <h2 className="text-4xl font-semibold mb-4">Income/Budget</h2>
              <h2 className="text-3xl text-gray-400">$20,000</h2>
            </div>

            {/* Right Column within Main Content */}
            <div className="flex-1 max-w-lg bg-gray-800 p-8 rounded-lg flex flex-col items-center">
              <h2 className="text-4xl font-semibold mb-4">Expenses</h2>
              <h2 className="text-3xl text-gray-400">$2,000</h2>
            </div>
          </div>
          {/* Transaction History */}
          <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Transaction History</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-600">
                  <td className="py-2 px-4">2024-08-15</td>
                  <td className="py-2 px-4">Groceries</td>
                  <td className="py-2 px-4 text-red-400">- $150</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2 px-4">2024-08-10</td>
                  <td className="py-2 px-4">Salary</td>
                  <td className="py-2 px-4 text-green-400">+ $2,000</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="py-2 px-4">2024-08-08</td>
                  <td className="py-2 px-4">Electric Bill</td>
                  <td className="py-2 px-4 text-red-400">- $75</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
