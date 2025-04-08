import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft, ArrowLeft, Plus } from 'lucide-react';
import { caseData } from '../../seed/caseData';
import EditTransactionModal from '../modals/EditTransactionModal';
import EditVehicleSubscriptionModal from '../modals/EditVehicleSubscriptionModal';
import { transactions as transactionData } from '../../seed/transactions';
import { vehicleSubscriptions as vehicleSubscriptionsData } from '../../seed/vehicleSubscriptions';


export default function Cases({ selectedCustomer, setActiveNavItem }) {
    // Case-related states
    const [pendingSortConfig, setPendingSortConfig] = useState({ key: null, direction: 'asc' });
    const [historySortConfig, setHistorySortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPendingPage, setCurrentPendingPage] = useState(1);
    const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
    const casesPerPage = 3;

    // Transaction and Subscription states
    const [transactionSortConfig, setTransactionSortConfig] = useState({ key: null, direction: 'asc' });
    const [subscriptionSortConfig, setSubscriptionSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
    const [currentSubscriptionPage, setCurrentSubscriptionPage] = useState(1);
    const itemsPerPage = 5;

    // Modal states
    const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);
    const [showEditVehicleSubscriptionModal, setShowEditVehicleSubscriptionModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedSubscription, setSelectedSubscription] = useState(null);


    // Status colors
    const statusColors = {
        open: 'bg-blue-100 text-blue-800',
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-green-100 text-green-800',
        escalated: 'bg-red-100 text-red-800'
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Filter cases
    const pendingCases = caseData.filter(caseItem =>
        ['pending', 'open', 'escalated'].includes(caseItem.Status)
    );
    const historyCases = caseData.filter(caseItem =>
        caseItem.Status === 'completed'
    );

    // Filter transactions and subscriptions by selected customer
    const customerTransactions = transactionData.filter(
        transaction => transaction['Cif No.'] === selectedCustomer?.['Cif No.']
    );

    const customerSubscriptions = vehicleSubscriptionsData.filter(
        subscription => subscription['Cif No.'] === selectedCustomer?.['Cif No.']
    );

    // Generic sort function
    const requestSort = (key, type) => {
        let config;
        let setConfig;

        switch (type) {
            case 'pending':
                config = pendingSortConfig;
                setConfig = setPendingSortConfig;
                break;
            case 'history':
                config = historySortConfig;
                setConfig = setHistorySortConfig;
                break;
            case 'transactions':
                config = transactionSortConfig;
                setConfig = setTransactionSortConfig;
                break;
            case 'subscriptions':
                config = subscriptionSortConfig;
                setConfig = setSubscriptionSortConfig;
                break;
            default:
                return;
        }

        let direction = 'asc';
        if (config.key === key && config.direction === 'asc') {
            direction = 'desc';
        }
        setConfig({ key, direction });
    };

    // Generic sort implementation
    const sortedData = (data, config) => {
        const sortableItems = [...data];
        if (config.key) {
            sortableItems.sort((a, b) => {
                if (a[config.key] < b[config.key]) return config.direction === 'asc' ? -1 : 1;
                if (a[config.key] > b[config.key]) return config.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    };

    // Sort all data
    const sortedPendingCases = sortedData(pendingCases, pendingSortConfig);
    const sortedHistoryCases = sortedData(historyCases, historySortConfig);
    const sortedTransactions = sortedData(customerTransactions, transactionSortConfig);
    const sortedSubscriptions = sortedData(customerSubscriptions, subscriptionSortConfig);

    // Pagination
    const paginate = (data, currentPage, itemsPerPage) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    };

    const currentPendingCases = paginate(sortedPendingCases, currentPendingPage, casesPerPage);
    const currentHistoryCases = paginate(sortedHistoryCases, currentHistoryPage, casesPerPage);
    const currentTransactions = paginate(sortedTransactions, currentTransactionPage, itemsPerPage);
    const currentSubscriptions = paginate(sortedSubscriptions, currentSubscriptionPage, itemsPerPage);

    // Render table function
    const renderTable = (data, columns, title, currentPage, setCurrentPage, totalItems, type) => {
        const totalPages = Math.ceil(totalItems / (type === 'cases' ? casesPerPage : itemsPerPage));

        return (
            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((column) => (
                                        <th
                                            key={column}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={() => requestSort(column, type)}
                                        >
                                            <div className="flex items-center">
                                                {column}
                                                {(type === 'pending' && pendingSortConfig.key === column) ||
                                                    (type === 'history' && historySortConfig.key === column) ||
                                                    (type === 'transactions' && transactionSortConfig.key === column) ||
                                                    (type === 'subscriptions' && subscriptionSortConfig.key === column) ? (
                                                    (type === 'pending' ? pendingSortConfig.direction :
                                                        type === 'history' ? historySortConfig.direction :
                                                            type === 'transactions' ? transactionSortConfig.direction :
                                                                subscriptionSortConfig.direction) === 'asc' ? (
                                                        <ChevronUp className="ml-1 h-4 w-4" />
                                                    ) : (
                                                        <ChevronDown className="ml-1 h-4 w-4" />
                                                    )
                                                ) : null}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => {
                                            if (type === 'transactions') {
                                                setSelectedTransaction(item);
                                                setShowEditTransactionModal(true);
                                            } else if (type === 'subscriptions') {
                                                setSelectedSubscription(item);

                                                setShowEditVehicleSubscriptionModal(true);
                                            }
                                        }}
                                    >
                                        {columns.map((column) => (
                                            <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {column.includes('Date') ? formatDate(item[column]) :
                                                    column === 'Status' ? (
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item[column]] || 'bg-gray-100 text-gray-800'}`}>
                                                            {item[column]}
                                                        </span>
                                                    ) : item[column]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalItems > (type === 'cases' ? casesPerPage : itemsPerPage) && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{((currentPage - 1) * (type === 'cases' ? casesPerPage : itemsPerPage)) + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(currentPage * (type === 'cases' ? casesPerPage : itemsPerPage), totalItems)}
                                        </span>{' '}
                                        of <span className="font-medium">{totalItems}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                            <button
                                                key={number}
                                                onClick={() => setCurrentPage(number)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {number}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">CASES</h2>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setActiveNavItem('CUSTOMERS')}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Customers
                    </button>
                    <button
                        onClick={() => console.log('New Case clicked')}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        New Case
                    </button>
                </div>
            </div>

            {selectedCustomer ? (
                <>
                    {/* Customer Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Customer Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(selectedCustomer).map((key) => (
                                <div key={key}>
                                    <p className="text-sm text-gray-500">{key}</p>
                                    <p className="text-gray-800">{selectedCustomer[key]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending Cases */}
                    {renderTable(
                        currentPendingCases,
                        Object.keys(pendingCases[0] || {}),
                        "Pending Cases",
                        currentPendingPage,
                        setCurrentPendingPage,
                        pendingCases.length,
                        'pending'
                    )}

                    {/* History Cases */}
                    {renderTable(
                        currentHistoryCases,
                        Object.keys(historyCases[0] || {}),
                        "Case History",
                        currentHistoryPage,
                        setCurrentHistoryPage,
                        historyCases.length,
                        'history'
                    )}

                    {/* Customer Transactions */}
                    {renderTable(
                        currentTransactions,
                        ["Transaction ID", "Transaction Date", "Amount", "Payment Method", "Status"],
                        "Customer Transactions",
                        currentTransactionPage,
                        setCurrentTransactionPage,
                        customerTransactions.length,
                        'transactions'
                    )}

                    {/* Vehicle Subscriptions */}
                    {renderTable(
                        currentSubscriptions,
                        ["Subscription ID", "Vehicle Type", "Make", "Model", "Status"],
                        "Vehicle Subscriptions",
                        currentSubscriptionPage,
                        setCurrentSubscriptionPage,
                        customerSubscriptions.length,
                        'subscriptions'
                    )}
                </>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <p className="text-gray-500">No customer selected</p>
                </div>
            )}

            {/* Edit Modals */}
            {showEditTransactionModal && selectedTransaction && (
                <EditTransactionModal
                    selectedTransaction={selectedTransaction}
                    setSelectedTransaction={setSelectedTransaction}
                    setShowEditModal={setShowEditTransactionModal}
                    transactions={customerTransactions}
                    setTransactions={(updatedTransactions) => {
                        // Update your state or data source here
                        console.log('Updated transactions:', updatedTransactions);
                    }}

                />
            )}

            {showEditVehicleSubscriptionModal && selectedSubscription && (
                <EditVehicleSubscriptionModal
                    selectedSubscription={selectedSubscription}
                    setSelectedSubscription={setSelectedSubscription}
                    setShowEditModal={setShowEditVehicleSubscriptionModal}
                    vehicleSubscriptions={customerSubscriptions}
                    setVehicleSubscriptions={(updatedSubs) => {

                        console.log('Updated subscriptions:', updatedSubs);
                    }}

                />
            )}
        </div>
    );
}