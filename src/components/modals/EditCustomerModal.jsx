import { useState } from 'react';
import { X } from 'lucide-react';

export default function EditCustomerModal({
    selectedCustomer,
    setSelectedCustomer,
    customers,
    setCustomers,
    setShowEditModal,
    setActiveNavItem
}) {
    const [editedCustomer, setEditedCustomer] = useState({ ...selectedCustomer });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the customers array
        const updatedCustomers = customers.map(customer =>
            customer['Cif No.'] === selectedCustomer['Cif No.'] ? editedCustomer : customer
        );
        setCustomers(updatedCustomers);
        setSelectedCustomer(editedCustomer);
        setActiveNavItem('CASES'); // rturn to cases page
        setShowEditModal(false);
    };

    const handleClose = () => {
        setActiveNavItem('CASES'); // return to cases page
        setShowEditModal(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Customer Details</h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="Name"
                                value={editedCustomer.Name || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Great ID (Email)</label>
                            <input
                                type="email"
                                name="Great Id(Email)"
                                value={editedCustomer['Great Id(Email)'] || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* ID Type Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                            <select
                                name="Id type"
                                value={editedCustomer['Id type'] || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="Passport">Passport</option>
                                <option value="Driver License">Driver License</option>
                                <option value="National ID">National ID</option>
                            </select>
                        </div>

                        {/* ID Number Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                            <input
                                type="text"
                                name="Id no."
                                value={editedCustomer['Id no.'] || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* CIF Number Field (disabled) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CIF Number</label>
                            <input
                                type="text"
                                name="Cif No."
                                value={editedCustomer['Cif No.'] || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                required
                                disabled
                            />
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="Phone"
                                value={editedCustomer.Phone || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}