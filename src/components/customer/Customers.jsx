import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { sampleCustomers } from '../../seed/data';

export default function Customers({ setActiveNavItem, loading, setLoading, setSelectedCustomer }) {
    const [customers, setCustomers] = useState(sampleCustomers);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedCustomers, setSearchedCustomers] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 7;

    // Sorting function
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedCustomers = [...customers].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setCustomers(sortedCustomers);
    };

    // Pagination logic
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(customers.length / customersPerPage);

    // Search function
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const filtered = sampleCustomers.filter(customer =>
                Object.values(customer).some(val =>
                    val.toString().toLowerCase().includes(searchQuery.toLowerCase())
                ));
            setSearchedCustomers(true);
            setCustomers(filtered);
            setCurrentPage(1);
            setLoading(false);
        }, 800);
    };

    // Reset search
    const resetSearch = () => {
        setSearchQuery('');
        setCustomers(sampleCustomers);
        setSearchedCustomers(false);
        setCurrentPage(1);
    };

    // Handle customer click - redirect to cases page with customer data
    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
        setActiveNavItem('CASES');
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">CUSTOMERS</h2>

            <div className="mb-8">
                <p className="text-gray-600 mb-2">SEARCH CUSTOMER</p>
                {searchedCustomers && (
                    <div className="flex items-center gap-4 mb-2">
                        <div className="text-sm text-gray-600">Search Results:</div>
                        <div className="text-sm font-medium">{`${customers.length} customers found`}</div>
                        <button
                            onClick={resetSearch}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to all customers
                        </button>
                    </div>
                )}

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-4 py-2 bg-gray-100 text-gray-500">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Email/Name/Phone no...."
                            className="flex-1 px-4 py-2 focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg whitespace-nowrap flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <Search className="w-4 h-4 mr-1" />
                        )}
                        Search
                    </button>
                </form>
            </div>

            {/* Customer List Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {Object.keys(customers[0] || {}).map((key) => (
                                            <th
                                                key={key}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                                onClick={() => requestSort(key)}
                                            >
                                                <div className="flex items-center">
                                                    {key}
                                                    {sortConfig.key === key && (
                                                        sortConfig.direction === 'asc' ? (
                                                            <ChevronUp className="ml-1 h-4 w-4" />
                                                        ) : (
                                                            <ChevronDown className="ml-1 h-4 w-4" />
                                                        )
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentCustomers.map((customer, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => handleCustomerClick(customer)}
                                        >
                                            {Object.values(customer).map((value, i) => (
                                                <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {customers.length > customersPerPage && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="flex-1 flex justify-between md:hidden">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                                    <div>
                                        <p className=" md:text-xs md:text-gray-700">
                                            Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{' '}
                                            <span className="font-medium">
                                                {Math.min(indexOfLastCustomer, customers.length)}
                                            </span>{' '}
                                            of <span className="font-medium">{customers.length}</span> results
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
                    </>
                )}
            </div>
        </div>
    );
}