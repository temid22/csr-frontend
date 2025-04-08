import { CaseSensitive as Case, UserPlus, RefreshCw, UsersRound } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    activeNavItem,
    setActiveNavItem,
    setShowEditModal,
    setShowEditTransactionModal,
    setShowEditVehicleSubscriptionModal,
    selectedCustomer,
    selectedTransaction,
    selectedSubscription
}) {
    const [isMd, setIsMd] = useState(false);
    const [manuallyToggled, setManuallyToggled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const newIsMd = window.innerWidth >= 768;
            if (newIsMd !== isMd && !manuallyToggled) {
                setSidebarOpen(newIsMd);
            }
            setIsMd(newIsMd);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMd, setSidebarOpen, manuallyToggled]);

    useEffect(() => {

        if (!manuallyToggled) {
            return;
        }
        const timeoutId = setTimeout(() => {
            setManuallyToggled(false);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [sidebarOpen, setManuallyToggled, manuallyToggled]);

    const mainNavItems = [
        { name: 'CUSTOMERS', icon: UsersRound },
        { name: 'CASES', icon: Case }
    ];

    const caseSubItems = [
        {
            name: 'EDIT CUSTOMER INFO',
            icon: UserPlus,
            action: () => selectedCustomer && setShowEditModal(true),
            disabled: !selectedCustomer
        },
        {
            name: 'EDIT VEHICLE SUBSCRIPTIONS',
            icon: RefreshCw,
            action: () => selectedSubscription && setShowEditVehicleSubscriptionModal(true),
            disabled: !selectedSubscription
        },
        {
            name: 'EDIT TRANSACTIONS',
            icon: RefreshCw,
            action: () => selectedTransaction && setShowEditTransactionModal(true),
            disabled: !selectedTransaction
        }
    ];

    const handleNavItemClick = (itemName, action) => {
        setActiveNavItem('CASES');
        if (action) {
            action();
        }
        if (!isMd) {
            setSidebarOpen(false);
            setManuallyToggled(true);
        }
    };

    const handleMainNavClick = (itemName) => {
        setActiveNavItem(itemName);
        if (!isMd && itemName !== 'CASES') {
            setSidebarOpen(false);
            setManuallyToggled(true);
        } else if (!isMd && itemName === 'CASES' && caseSubItems.every(subItem => subItem.disabled)) {
            setSidebarOpen(false);
            setManuallyToggled(true);
        }
    };

    return (
        <div className={`bg-white shadow-md transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden md:w-64'}`}>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-800">GREAT ID CS PORTAL</h1>
            </div>
            <nav className="mt-8">
                <div className="px-4">
                    <ul className="mt-4 space-y-2">
                        {mainNavItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    onClick={() => handleMainNavClick(item.name)}
                                    className={`flex items-center w-full px-4 py-2 rounded-lg ${activeNavItem === item.name
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 mr-3 ${activeNavItem === item.name ? 'text-blue-600' : 'text-gray-500'
                                        }`} />
                                    <span>{item.name}</span>
                                </button>

                                {/* Show sub-items only when CASES is active */}
                                {item.name === 'CASES' && activeNavItem === 'CASES' && (
                                    <ul className="ml-8 mt-2 space-y-1">
                                        {caseSubItems.map((subItem) => (
                                            <li key={subItem.name}>
                                                <button
                                                    onClick={() => handleNavItemClick(subItem.name, subItem.action)}
                                                    className={`flex items-center w-full px-4 py-2 rounded-lg text-sm ${subItem.disabled
                                                        ? 'text-gray-400 cursor-not-allowed'
                                                        : activeNavItem === subItem.name
                                                            ? 'bg-blue-50 text-blue-600'
                                                            : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                    disabled={subItem.disabled}
                                                >
                                                    <subItem.icon className={`w-5 h-5 mr-3 ${subItem.disabled
                                                        ? 'text-gray-400'
                                                        : activeNavItem === subItem.name
                                                            ? 'text-blue-600'
                                                            : 'text-gray-500'
                                                        }`} />
                                                    <span>{subItem.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}