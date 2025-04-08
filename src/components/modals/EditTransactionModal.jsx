import { useState } from 'react';
import { X } from 'lucide-react';

export default function EditTransactionModal({
    selectedTransaction,
    setSelectedTransaction,
    transactions = [],
    setTransactions,
    setShowEditModal,
}) {
    const [editedTransaction, setEditedTransaction] = useState({ ...selectedTransaction });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTransaction(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTransactions = transactions.map(transaction =>
            transaction['Transaction ID'] === selectedTransaction['Transaction ID']
                ? editedTransaction
                : transaction
        );
        setTransactions(updatedTransactions);
        setSelectedTransaction(editedTransaction);
        setShowEditModal(false);
    };

    const handleClose = () => {
        setShowEditModal(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">Edit Transaction</h3>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-hidden">
                    <div className="h-full flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                            {/* Transaction ID (disabled) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                                <input
                                    type="text"
                                    name="Transaction ID"
                                    value={editedTransaction['Transaction ID'] || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-sm sm:text-base"
                                    disabled
                                />
                            </div>

                            {/* Subscription ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subscription ID</label>
                                <input
                                    type="text"
                                    name="Subscription ID"
                                    value={editedTransaction['Subscription ID'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    required
                                />
                            </div>

                            {/* Customer CIF No. */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Customer CIF No.</label>
                                <input
                                    type="text"
                                    name="Cif No."
                                    value={editedTransaction['Cif No.'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    required
                                    disabled
                                />
                            </div>

                            {/* Transaction Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Date</label>
                                <input
                                    type="datetime-local"
                                    name="Transaction Date"
                                    value={editedTransaction['Transaction Date'] ?
                                        new Date(editedTransaction['Transaction Date']).toISOString().slice(0, 16) : ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    required
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="Amount"
                                    value={editedTransaction.Amount || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    required
                                    step="0.01"
                                />
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                <select
                                    name="Payment Method"
                                    value={editedTransaction['Payment Method'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    required
                                >
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>

                            {/* Transaction Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                                <select
                                    name="Transaction Type"
                                    value={editedTransaction['Transaction Type'] || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    required
                                >
                                    <option value="Subscription Activation">Subscription Activation</option>
                                    <option value="Subscription Renewal">Subscription Renewal</option>
                                    <option value="Payment">Payment</option>
                                    <option value="Refund">Refund</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    name="Status"
                                    value={editedTransaction.Status || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    required
                                >
                                    <option value="Completed">Completed</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Refunded">Refunded</option>
                                </select>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6">
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}