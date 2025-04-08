import { useState } from 'react';
import { X } from 'lucide-react';

export default function EditVehicleSubscriptionModal({
  selectedSubscription,
  setSelectedSubscription,
  vehicleSubscriptions = [],
  setVehicleSubscriptions,
  setShowEditModal,
  // setActiveNavItem
}) {
  const [editedSubscription, setEditedSubscription] = useState({ ...selectedSubscription });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSubscription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSubscriptions = vehicleSubscriptions.map(subscription =>
      subscription['Subscription ID'] === selectedSubscription['Subscription ID']
        ? editedSubscription
        : subscription
    );
    setVehicleSubscriptions(updatedSubscriptions);
    setSelectedSubscription(editedSubscription);
    // setActiveNavItem('CASES');
    setShowEditModal(false);
  };

  const handleClose = () => {
    // setActiveNavItem('CASES');
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

        <h3 className="text-lg font-medium text-gray-800 mb-4">Edit Vehicle Subscription</h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Subscription ID (disabled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subscription ID</label>
              <input
                type="text"
                name="Subscription ID"
                value={editedSubscription['Subscription ID'] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                disabled
              />
            </div>

            {/* Customer Cif No. */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer CIF No.</label>
              <input
                type="text"
                name="Customer Cif No."
                value={editedSubscription['Cif No.'] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
              <select
                name="Vehicle Type"
                value={editedSubscription['Vehicle Type'] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>

            {/* Make */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
              <input
                type="text"
                name="Make"
                value={editedSubscription.Make || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                name="Model"
                value={editedSubscription.Model || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                name="Year"
                value={editedSubscription.Year || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
              <input
                type="text"
                name="License Plate"
                value={editedSubscription['License Plate'] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Subscription Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
              <select
                name="Subscription Plan"
                value={editedSubscription['Subscription Plan'] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="Start Date"
                value={editedSubscription['Start Date'] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="End Date"
                value={editedSubscription['End Date'] || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="Status"
                value={editedSubscription.Status || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Expired">Expired</option>
              </select>
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