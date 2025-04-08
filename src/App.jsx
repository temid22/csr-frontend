import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import CustomersPage from './components/customer/Customers';
import CasesPage from './components/cases/Cases';
import { sampleCustomers } from './seed/data';
import EditCustomerModal from './components/modals/EditCustomerModal';
import EditVehicleSubscriptionModal from './components/modals/EditVehicleSubscriptionModal';
import EditTransactionModal from './components/modals/EditTransactionModal';
import { transactions as transactionsData } from './seed/transactions';
import { vehicleSubscriptions as vehicleSubscriptionsData } from './seed/vehicleSubscriptions';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState('CUSTOMERS');
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [showEditModal, setShowEditModal] = useState(false);
  const [transactions, setTransactions] = useState(transactionsData);
  const [vehicleSubscriptions, setVehicleSubscriptions] = useState(vehicleSubscriptionsData);
  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);
  const [showEditVehicleSubscriptionModal, setShowEditVehicleSubscriptionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
        setShowEditModal={setShowEditModal}
        setShowEditTransactionModal={setShowEditTransactionModal}
        setShowEditVehicleSubscriptionModal={setShowEditVehicleSubscriptionModal}
        selectedCustomer={selectedCustomer}
        selectedTransaction={selectedTransaction}
        selectedSubscription={selectedSubscription}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={sampleCustomers[0]}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {activeNavItem === 'CUSTOMERS' && (
            <CustomersPage
              setActiveNavItem={setActiveNavItem}
              loading={loading}
              setLoading={setLoading}
              setSelectedCustomer={setSelectedCustomer}
            />
          )}
          {activeNavItem === 'CASES' && (
            <CasesPage
              selectedCustomer={selectedCustomer}
              setActiveNavItem={setActiveNavItem}
            />
          )}
        </main>
      </div>
      {showEditModal && selectedCustomer && (
        <EditCustomerModal
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          customers={customers}
          setCustomers={setCustomers}
          setShowEditModal={setShowEditModal}
          setActiveNavItem={setActiveNavItem}
        />
      )}
      {showEditTransactionModal && selectedTransaction && (
        <EditTransactionModal
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          transactions={transactions}
          setTransactions={setTransactions}
          setShowEditModal={setShowEditTransactionModal}
          setActiveNavItem={setActiveNavItem}
        />
      )}

      {showEditVehicleSubscriptionModal && selectedSubscription && (
        <EditVehicleSubscriptionModal
          selectedSubscription={selectedSubscription}
          setSelectedSubscription={setSelectedSubscription}
          vehicleSubscriptions={vehicleSubscriptions}
          setVehicleSubscriptions={setVehicleSubscriptions}
          setShowEditModal={setShowEditVehicleSubscriptionModal}
          setActiveNavItem={setActiveNavItem}
        />
      )}
    </div>
  );
}

export default App;