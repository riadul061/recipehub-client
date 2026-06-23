"use client";
export default function AdminTransactionsClient({ transactions, pagination }) {
  return (
    <div><h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md">
          <thead className="bg-gray-50 dark:bg-slate-700"><tr><th className="text-left p-4 font-semibold text-sm">User</th><th className="text-left p-4 font-semibold text-sm">Amount</th><th className="text-left p-4 font-semibold text-sm">Date</th><th className="text-left p-4 font-semibold text-sm">Status</th><th className="text-left p-4 font-semibold text-sm">Transaction ID</th></tr></thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {transactions.map(t => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="p-4"><span className="font-medium text-sm">{t.userEmail}</span></td>
                <td className="p-4 text-sm">${t.amount}</td>
                <td className="p-4 text-sm">{new Date(t.paidAt).toLocaleDateString()}</td>
                <td className="p-4"><span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-600">{t.paymentStatus}</span></td>
                <td className="p-4 text-xs text-slate-500 font-mono">{t.transactionId?.slice(0, 20)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}